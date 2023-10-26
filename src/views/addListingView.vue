<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <main>
        <form class="m-5" @submit.prevent="submitForm">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <!-- <p class="mb-1">Upload Images: </p>
            <div class="mb-3">
                <input class="form-control" type="file" @change="handleFileUpload" multiple />
                <div v-if="uploadProgress !== null">{{ uploadProgress }}%</div>
            <div v-if="files.length > 0">Selected files: {{ fileNames }}</div> -->
                        <p class="mb-1">Drag and drop images here or click to select files</p>
                        <BFormFile
                            @change="handleFileUpload"
                            accept="image/*"
                            multiple
                            class="custom-file-input"
                            required
                            :state="Boolean(files.length > 0)"
                        />
                        <div v-if="files.length > 0">
                            Selected files: {{ fileNames }}
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col">
                        <p class="mb-1">Name of Listing:</p>
                        <input
                            type="text"
                            id="listing_name"
                            v-model="listing_name"
                            required
                            class="d-inline form-control me-2 mb-3 w-100"
                            placeholder="Type Name of Listing"
                        />
                    </div>

                    <div class="col">
                        <p class="mb-1">Location:</p>
                        <places_api
                            @location-selected="updateLocation"
                            class="d-inline form-control me-2 mb-3 w-100"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <p class="mb-1">Description of Listing:</p>
                        <textarea
                            class="form-control me-2 mb-3"
                            v-model="description"
                            placeholder="Type Description of Listing"
                        ></textarea>
                    </div>
                </div>

                <div class="row"></div>

                <div class="row">
                    <div class="col-md-6">
                        <span class="mb-1"
                            >Type of Listing
                            <Icon
                                icon="mdi:information-slab-circle-outline"
                                class="infoIcon mb-1"
                            />
                            <p id="moreInfo">
                                Perishable items have 12h & Non-Perishable items
                                have 48h "Chope Window"
                            </p>
                        </span>
                        <b-form-select
                            v-model="perishable"
                            class="mb-3"
                            style="width: 100%"
                        >
                            <b-form-select-option value="true"
                                >Perishable</b-form-select-option
                            >
                            <b-form-select-option value="false"
                                >Non-Perishable</b-form-select-option
                            >
                        </b-form-select>
                    </div>

                    <div class="col-md-6">
                        <p class="mb-1">Category of Food:</p>
                        <b-form-select
                            v-model="category"
                            class="mb-3"
                            style="width: 100%"
                        >
                            <b-form-select-option
                                v-for="category in categories"
                                :value="category"
                                >{{ category }}</b-form-select-option
                            >
                        </b-form-select>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <p class="mb-1">Expiry Date:</p>
                        <input
                            class="d-inline form-control me-2 mb-3 w-100"
                            type="date"
                            id="expiry_date"
                            v-model="expiry_date"
                            required
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-1">Price:</p>
                        <input
                            class="d-inline form-control me-2 mb-3 w-100"
                            type="number"
                            id="price"
                            min="0"
                            step="0.05"
                            v-model="price"
                            required
                            placeholder="Input Price"
                        />
                    </div>

                    <div class="col-md-6">
                        <p class="mb-1">Quantity Available:</p>
                        <input
                            class="d-inline form-control me-2 mb-3 w-100"
                            type="number"
                            id="qty_available"
                            min="0"
                            v-model="qty_available"
                            required
                            placeholder="Input Quantity"
                        />
                    </div>
                </div>

                <div class="row d-flex">
                    <div class="col-10"></div>
                    <div class="col justify-end">
                        <button
                            class="btn w-100 btn-success"
                            type="submit"
                            :disabled="files.length > 3"
                        >
                            Post Listing
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<style>
#upload {
    margin-left: 10px;
}

#moreInfo {
    font-size: 12px;
    display: none;
}

.infoIcon:hover + #moreInfo {
    display: inline;
    color: green;
}
</style>

<script>
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { storage, db } from "@/firebase";
import * as api from "../firebase/api";
import places_api from "../Backend/places_autocomplete.vue";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            expiry_date: "",
            location: "",
            category: "",
            perishable: true,
            listing_name: "",
            qty_available: 0,
            price: 0,
            files: {},
            uploadProgress: null,
            address: "",
            description: "",
            categories: [],
        };
    },
    computed: {
        // ...mapState(["userLoggedIn"]), // Map the userLoggedIn state from the store
        ...mapGetters(["isAuthenticated", "currentUser"]),

        fileNames() {
            // console.log(this.files);
            if (this.files.length === 0) {
                return "";
            }
            return Array.from(this.files)
                .map((file) => file.name)
                .join(", ");
        },
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
                        const downloadURL = await getDownloadURL(fileRef);
                        fileUrls.push(downloadURL);

                        if (fileUrls.length === this.files.length) {
                            // All files have been uploaded, add listing to Firestore
                            await addDoc(collection(db, "listings"), {
                                ExpiryDate: Timestamp.fromDate(
                                    new Date(this.expiry_date)
                                ),
                                Location: this.location,
                                Category: this.category,
                                Perishable: this.perishable,
                                ListingName: this.listing_name,
                                QtyAvailable: this.qty_available,
                                Price: this.price,
                                ImageUrls: fileUrls,
                                Owner: this.currentUser,
                                Description: this.description,
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
    async created() {
        const data = await api.getAllCategories();
        const categories = data[0]["categories"];
        this.categories = categories;
        this.category = categories[0];
    },
    components: {
        places_api,
    },
};
</script>
