<template>
    <body>
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
        <button @click="addRandomUsers()">Add Random Users</button>
    </body>
</template>

<script>
import * as setup from "../firebase/setup";

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
    },
};
</script>
