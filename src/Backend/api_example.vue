<template>
    <body class="p-3 text-dark">
        <div>
            <h1>API Example</h1>
            Input max number of listings you want returned: <input
            type="number"
            v-model="maxReturned"
            placeholder="Max listings to return"
            /> 
            <br />
            <button @click="getAllListing(maxReturned)">Get All Listings</button>
            <div
                v-if="listings.length"
                v-for="listing in listings"
                :key="listing.Id"
            >
                <h2>{{ listing.details.ListingName }}</h2>
                <p>{{ listing.Id }}</p>
                <p>{{ listing.details.Category }}</p>
                <p>{{ listing.details.Price }}</p>
                <p>{{ listing.details.Location }}</p>
                <p>{{ listing.details.QtyAvailable }}</p>
                <div class="container">
                    <img
                        v-for="image in listing.details.ImageUrls"
                        :src="image"
                        style="width: 100px"
                    />
                </div>
            </div>
            <div v-else>
                <p>No listings available</p>
            </div>
        </div>
        <hr />
        <button @click="getListing('15GHzOTVd24wHEqp9t0F')">
            Get Listing. Check console for listing.
        </button>
        <br />
        <br />
        <h3>Filter by category</h3>
        Select option to filter. Check console.
        <select
            v-model="selectedCategory"
            @change="getListingsByCategory(selectedCategory)"
        >
            <option v-for="category in categories" :key="category">
                {{ category }}
            </option>
        </select>
        <br />
        <br />
        <h3>Filter by price</h3>
        Tick for high to low. No tick for low to high.<input
            type="checkbox"
            v-model="highToLow"
        />
        <br />
        <input
            type="number"
            v-model="maxReturned"
            placeholder="Max listings to return"
        />
        <button @click="getListingsByPrice(maxReturned, highToLow)">Go!</button>
        <br />
        <br />
        <h3>Get listings within specified distance from user location</h3>
        <input
            type="number"
            v-model="maxDistance"
            placeholder="What distance you want to search (in km)"
            required
            class="w-50"
        />
        <button @click="getNearbyListings(userLocation, maxDistance)">Go!</button>
   
        <button @click="log=>{console.log(userLocation)}">location</button>
   </body>
</template>

<script>
import * as api from "../firebase/api";
// import Vue from "vue";

export default {
    data() {
        return {
            listings: [],
            categories: ["fruits", "cannedFood", "cookedFood", "test"],
            selectedCategory: "test",
            highToLow: false,
            maxReturned: 5,
            maxDistance: null,
            userLocation: null,
        };
    },
    methods: {
        async getAllListing(limit) {
            this.listings = await api.getAllListings(limit);
        },
        async getListing(listingId) {
            const res = await api.getListing(listingId);
            console.log(res);
        },
        async getListingsByCategory(category) {
            try {
                const res = await api.getListingsByCategory(category);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        async getListingsByPrice(maxReturned, highToLow) {
            try {
                const res = await api.getListingsByPrice(
                    maxReturned,
                    highToLow
                );
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        async getNearbyListings(userLocation, maxDistance) {
            try {
                const res = await api.getNearbyListings(
                    userLocation,
                    maxDistance
                );
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
    },
    mounted() {
        // so that the first option displayed is actually displayed
        this.getListingsByCategory(this.selectedCategory);
    },
    created() {
        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.userLocation = { latitude, longitude };
            console.log('locate', this.userLocation);
            // Do something with the position
        };

        const error = (err) => {
            console.log(error);
        };

        // This will open permission popup
        navigator.geolocation.getCurrentPosition(success, error);
    },
};
</script>
