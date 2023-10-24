<template>
    <div class="p-3">
        <h1>Form Submit Example with Google Places autocomplete</h1>
        <form @submit.prevent="submitForm">
            <label for="expiry_date">Expiry Date:</label>
            <input
                type="date"
                id="expiry_date"
                v-model="expiry_date"
                required
            />
            <br />
            <label for="location">Location:</label>
            <places_api @location-selected="updateLocation" />
            <!-- <input type="text" id="location" v-model="location" required /> -->
            <br />
            <label for="category">Category:</label>
            <input type="text" id="category" v-model="category" required />
            <br />
            <label for="perishable">Perishable:</label>
            <input type="checkbox" id="perishable" v-model="perishable" />
            <br />
            <label for="listing_name">Listing Name:</label>
            <input
                type="text"
                id="listing_name"
                v-model="listing_name"
                required
            />
            <br />
            <label for="qty_available">Quantity Available:</label>
            <input
                type="number"
                id="qty_available"
                min=0
                v-model="qty_available"
                required
            />
            <br />
            <label for="price">Price:</label>
            <input type="number" id="price" min=0 step=0.05 v-model="price" required />
            <br />
            <input type="file" @change="handleFileUpload" multiple />
            <button type="submit" :disabled="files.length > 3">Submit</button>
            <div v-if="uploadProgress !== null">{{ uploadProgress }}%</div>
        </form>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { storage, db } from "@/firebase";
import * as api from "../firebase/api";
import places_api from "../Backend/places_autocomplete.vue";

export default {
    data() {
        return {
            expiry_date: "",
            location: "",
            category: "",
            perishable: false,
            listing_name: "",
            qty_available: 0,
            price: 0,
            files: [],
            uploadProgress: null,
            address: "",
        };
    },
    methods: {
        handleFileUpload(event) {
            const num_uploaded = event.target.files.length;
            this.files = event.target.files;
            if (num_uploaded > 3) {
                alert("Please upload less than 3 images");
                return;
            }
        },
        async submitForm() {
            // Upload files to Firebase Storage
            const fileUrls = [];
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];

                const fileId = uuidv4();
                const fileRef = ref(storage, fileId);
                const uploadTask = uploadBytesResumable(fileRef, file);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        this.uploadProgress = Math.round(progress);
                    },
                    (error) => {
                        console.error(error);
                    },
                    async () => {
                        const downloadURL =
                            await getDownloadURL(fileRef);
                        fileUrls.push(downloadURL);

                        if (fileUrls.length === this.files.length) {
                            // All files have been uploaded, add listing to Firestore
                            await addDoc(collection(db, "listings"), {
                                ExpiryDate: Timestamp.fromDate(new Date(this.expiry_date)),
                                Location: this.location,
                                Category: this.category,
                                Perishable: this.perishable,
                                ListingName: this.listing_name,
                                QtyAvailable: this.qty_available,
                                Price: this.price,
                                ImageUrls: fileUrls,
                            });

                            alert("Listing added successfully!");
                            // this.$router.push("/");
                        }
                    }
                );
            }
        },
        updateLocation(location) {
            this.location = location;
        },
    },
    components: {
        places_api,
    },
};
</script>
