<script setup>
import { Icon } from "@iconify/vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();
</script>

<template>
    <main>
        <Toast />
        <form class="m-5" @submit.prevent="submitForm">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <FileUpload
                            @upload="onTemplatedUpload($event)"
                            :multiple="true"
                            accept="image/*"
                            :maxFileSize="1000000"
                            @select="onSelectedFiles"
                        >
                            <template
                                #header="{
                                    chooseCallback,
                                    clearCallback,
                                    files,
                                }"
                            >
                                <div
                                    class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                                >
                                    <div class="flex gap-2">
                                        <Button
                                            @click="chooseCallback()"
                                            rounded
                                            raised
                                            ><Icon
                                                icon="ant-design:picture-filled"
                                                width="15"
                                                height="15"
                                            />&nbspClick to select
                                            images</Button
                                        >
                                        <Button
                                            @click="clearCallback()"
                                            rounded
                                            severity="danger"
                                            :disabled="
                                                !files || files.length === 0
                                            "
                                            ><Icon
                                                icon="iconoir:cancel"
                                                width="20"
                                                height="20"
                                        /></Button>
                                    </div>
                                </div>
                            </template>
                            <template #content="{ files, removeFileCallback }">
                                <div v-if="files.length > 0">
                                    <div
                                        class="flex flex-wrap p-0 sm:p-5 gap-3"
                                    >
                                        <div
                                            v-for="(file, index) of files"
                                            :key="
                                                file.name +
                                                file.type +
                                                file.size
                                            "
                                            class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                        >
                                            <div>
                                                <img
                                                    role="presentation"
                                                    :alt="file.name"
                                                    :src="file.objectURL"
                                                    width="100"
                                                    height="50"
                                                    class="shadow-2 mt-3"
                                                />
                                            </div>
                                            <span class="font-semibold">{{
                                                file.name
                                            }}</span>
                                            <div>
                                                {{ formatSize(file.size) }}
                                            </div>
                                            <Badge
                                                value="Selected"
                                                
                                            />
                                            <Button
                                                @click="
                                                    onRemoveTemplatingFile(
                                                        file,
                                                        removeFileCallback,
                                                        index
                                                    )
                                                "
                                                rounded
                                                severity="danger"
                                                class="mb-3"
                                                ><Icon icon="iconoir:cancel"
                                            /></Button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div
                                    class="flex align-items-center justify-content-center flex-column"
                                >
                                    <Icon
                                        icon="humbleicons:upload"
                                        class="border-2 border-circle p-5 text-8xl text-400 border-400"
                                        width="120"
                                        height="120"
                                    />
                                    <p class="mt-4 mb-0">
                                        Drag and drop images to here to upload.
                                    </p>
                                    <p class="mt-2 mb-0">
                                        Please upload 1-3 images.
                                    </p>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col">
                        <p class="mb-1">Name of Listing:</p>
                        <input
                            type="text"
                            id="listing_name"
                            v-model="listing_name"
                            
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
                        <VueDatePicker
                            v-model="expiry_date"
                            :min-date="new Date()"
                            :enable-time-picker="false"
                            :format="format"
                            class="me-2 mb-3"
                            placeholder="Select Date"
                            
                        ></VueDatePicker>
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
        <Dialog
            v-model:visible="visible"
            modal
            header="Notification"
            :style="{ width: '50vw' }"
            :draggable="false"
            :closable="false"
        >
            <p>Listing successfully added. Click button to go back.</p>
            <template #footer>
                <Button @click="goBack"
                    ><Icon icon="ic:round-home" />&nbsp Back to Home</Button
                >
            </template>
        </Dialog>
    </main>
</template>

<style scoped>
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
.col-md-6 {
    padding: 0px 8px;
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    components: {
        places_api,
        VueDatePicker,
    },
    data() {
        return {
            expiry_date: "",
            location: "",
            category: "",
            perishable: true,
            listing_name: "",
            qty_available: 0,
            price: 0,
            description: "",
            categories: [],
            files: [],
            minDate: new Date(),
            visible: false,
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
        format() {
            if (this.expiry_date === "") {
                return "";
            }
            const day = this.expiry_date.getDate();
            const month = this.expiry_date.getMonth() + 1;
            const year = this.expiry_date.getFullYear();

            return `${day}/${month}/${year}`;
        },
    },
    methods: {
        goBack() {
            this.visible = false;
            this.$router.push("/");
        },
        validateInputs() {
            let check = true;
            if (!this.expiry_date) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please enter an expiry date!",
                    life: 3000,
                });
                check = false;
            }
            if (this.location.hasOwnProperty("latitude") === false) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please select a valid location!",
                    life: 3000,
                });
                check = false;
            }
            if (!this.category) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please enter a category!",
                    life: 3000,
                });
                check = false;
            }
            if (!this.listing_name) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please enter a listing name!",
                    life: 3000,
                });
                check = false;
            }
            if (this.qty_available <= 0) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please enter a valid quantity!",
                    life: 3000,
                });
                check = false;
            }
            if (!this.description) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please enter a description!",
                    life: 3000,
                });
                check = false;
            }
            if (this.files.length === 0) {
                // alert("Please upload at least 1 image");
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please upload at least 1 image!",
                    life: 3000,
                });
                check = false;
            }

            return check;
        },
        async submitForm() {
            // Upload files to Firebase Storage
            const fileUrls = [];
            if (!this.validateInputs()) {
                return;
            }
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
                                Category: this.category.toLowerCase(),
                                Perishable: this.perishable,
                                ListingName: this.listing_name,
                                QtyAvailable: this.qty_available,
                                Price: this.price,
                                ImageUrls: fileUrls,
                                Owner: this.currentUser,
                                Description: this.description,
                            });

                            // this.$router.push("/");
                        }
                    }
                );
            }
            // alert("Listing added successfully!");
            this.visible = true;
        },
        updateLocation(location) {
            this.location = location;
        },
        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
        },
        onClearTemplatingUpload(clear) {
            clear();
        },
        onSelectedFiles(event) {
            this.files = event.files;
            // console.log(this.files);
            this.files.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
            const num_uploaded = event.files.length;
            if (num_uploaded > 3) {
                this.$toast.add({
                    severity: "error",
                    summary: "Error Message",
                    detail: "Please upload less than 3 images!",
                    life: 3000,
                });
                return;
            }
        },
        formatSize(bytes) {
            const k = 1024;
            const dm = 3;
            const sizes = this.$primevue.config.locale.fileSizeTypes;

            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat(
                (bytes / Math.pow(k, i)).toFixed(dm)
            );

            return `${formattedSize} ${sizes[i]}`;
        },
    },
    async created() {
        const data = await api.getAllCategories();
        const categories = data[0]["categories"];
        this.categories = categories;
        this.category = categories[0];
    },
};
</script>
