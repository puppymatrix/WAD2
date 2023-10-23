<template>
    <body class="p-3 text-dark">
        <!-- replace with your user id -->
        <button @click="getUser('juixCOJFG68RMjXrJVOQ')"> 
            Get User data. Check console.
        </button>
        <br />
        <br />
        <button @click="getUser('V2FPBCzywG766IO9UWQB','listings')"> 
            Get User Listing data. Check console.
        </button>
        <br />
        <br />
        <button @click="getUser('V2FPBCzywG766IO9UWQB','chopes')"> 
            Get User chopes data. Check console.
        </button>
        <br />
        <br />
        <button @click="getUsersWhoChopedCollectedListing('QekL49WhpOPKKFAYEIzl')"> 
            Get User chopes/collected data per listingId. Check console.
        </button>
        <br />
        <br />
        <button @click="chopeListing('3o3jzGHOqOEOQOMzYgAy','8NIqzIUSCNwGq3jsG4Qr')"> 
            Chope listing of userId: 3o3jzGHOqOEOQOMzYgAy and listingId: 8NIqzIUSCNwGq3jsG4Qr.
        </button>
        <br />
        <br />
        <button @click="collectListing('3o3jzGHOqOEOQOMzYgAy','8NIqzIUSCNwGq3jsG4Qr')"> 
            Collect listing of userId: 3o3jzGHOqOEOQOMzYgAy and listingId: 8NIqzIUSCNwGq3jsG4Qr.
        </button>
        <br />
        <br />
        <button @click="deleteExpiredChopes()"> 
            Delete expired chopes.
        </button>
        <br />
        <br />

        

        
    </body>
</template>

<script>
import * as api from "../firebase/api";

export default {
    data() {
        return {
            
        };
    },
    methods: {
        async getUser(userId,type) {
            const res = await api.getUser(userId,type);
            console.log(res);
        },
        async getUsersWhoChopedCollectedListing(listingId) {
            const res = await api.getUsersWhoChopedCollectedListing(listingId);
            console.log(res);
        },
        async chopeListing(userId,listingId) {
            await api.chopeListing(userId,listingId);
        },
        async collectListing(userId,listingId) {
            await api.collectListing(userId,listingId);
        },
        async deleteExpiredChopes() {
            await api.deleteExpiredChopes();
        },
    },
    mounted() {

    },
};
</script>
