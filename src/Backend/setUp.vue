<template>
    <div class="p-3">
        <div>
            <button @click="addMultipleListings('cookedFood', 48)">
                Add random listings for cookedFood category
            </button>
        </div>
        <br />

        <div>
            <button @click="deleteListings('cookedFood')">
                Delete random listings for cookedFood category
            </button>
        </div>
        <br />
        <button @click="addRandomUsers()">
            Add Random User Chope, Collected and Listing Data
        </button>
        <br />
        <br />
        <button @click="addListingOwners()">
            Add Random owners for listings
        </button>
        <br />
        <br />
        <button @click="addLocationName()">Add location name to listing</button>
        <br />
        <br />
        <button @click="updateOwnerListings()">Update Owner myListing</button>
    </div>
</template>

<script>
import * as setup from "../firebase/setup";
import { db } from "@/firebase";

import { setDoc, doc } from "firebase/firestore";

export default {
    data() {
        return {};
    },
    methods: {
        async addMultipleListings(category, numImages) {
            for (let i = 0; i < 40; i++) {
                await setup.addRandomListing(category, numImages);
                console.log(`Added ${i} listings`);
            }
        },
        deleteListings(category) {
            setup.deleteListings(category);
        },
        addRandomUsers() {
            setup.addRandomUsers();
        },
        addListingOwners() {
            setup.addListingOwners();
        },
        async updateOwnerListings() {
            await setup.updateOwnerListings();
            console.log("updated owner listings");
        },
        async addLocationName() {
            await setup.addLocationName();
        },
    },
};
</script>
