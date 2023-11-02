<script setup>
import {
    getListing,
    getListingsByCategory,
    getUsersWhoChopedCollectedListing,
    getUser,
    chopeListing,
    getAllUsernames,
    calculateDistance,
    collectListing,
} from "@/firebase/api.js";
import { Icon } from "@iconify/vue";
</script>

<template>
    <body class="px-5 py-2">
        <div class="container-fluid my-2 filterBar">
            <div class="row">
                <!-- carousel -->
                <div
                    class="col-md-6 display-flex align-item-center justify-content-center m-0"
                    v-if="listingInfo.ImageUrls.length > 1"
                >
                    <BCarousel controls indicators>
                        <BCarouselSlide
                            v-for="photos in listingInfo.ImageUrls"
                            :img-src="photos"
                            style="width: 100%; height: 100%; object-fit: cover"
                        />
                    </BCarousel>
                </div>
                <div
                    class="col-md-6 display-flex align-item-center justify-content-center"
                    v-else
                >
                    <img
                        :src="listingInfo.ImageUrls[0]"
                        alt=""
                        class="card-img"
                        style="width: 100%; height: 100%; object-fit: cover"
                    />
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-8">
                            <h2 class="d-inline">
                                Listing:
                                <span id="name">{{
                                    listingInfo.ListingName[0].toUpperCase() +
                                    listingInfo.ListingName.slice(1)
                                }}</span>
                            </h2>
                        </div>
                        <div
                            class="col d-flex align-items-center justify-content-start"
                        >
                            <router-link
                                :to="{
                                    name: 'mapView',
                                    query: { Id: id },
                                }"
                            >
                                <Button
                                    style="
                                        background-color: #343a40;
                                        color: white;
                                    "
                                    @click="checkQuery"
                                    class="rounded"
                                    raised
                                    plain
                                    text
                                    ><Icon
                                        icon="material-symbols:directions"
                                        color="white"
                                        width="25"
                                    />
                                    &nbspDirections</Button
                                >
                            </router-link>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h4 id="subheader">
                                Price:
                                <span id="price">${{ listingInfo.Price }}</span>
                                | Quantity Available:
                                <span id="qty">{{
                                    listingInfo.QtyAvailable
                                }}</span>
                            </h4>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="card my-3" style="width: 100%">
                                <div class="card-body">
                                    <h5 class="card-title">Food Description</h5>
                                    <p
                                        class="card-text"
                                        v-if="
                                            listingInfo.hasOwnProperty(
                                                Description
                                            )
                                        "
                                    >
                                        {{ listingInfo.Description }}
                                    </p>
                                    <p class="card-text" v-else>
                                        Not Applicable
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Category of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1">{{
                                listingInfo.Category
                            }}</span>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Type of Food Listing:</h6>
                            <span
                                class="badge text-bg-listing ms-1"
                                v-if="listingInfo.Perishable"
                                >Perishable</span
                            >
                            <span class="badge text-bg-listing ms-1" v-else
                                >Non-Perishable</span
                            >
                        </div>
                    </div>

                    <div class="row pt-1 pb-2">
                        <div class="col">
                            <h6 class="d-inline">Listing Expiry Time:</h6>
                            <span class="badge text-bg-listing ms-1">{{
                                expiryDate
                            }}</span>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Location:</h6>
                            <span class="badge text-bg-listing ms-1">{{
                                location
                            }}</span>
                        </div>
                    </div>

                    <div class="row pt-2" v-if="!(owner == currentUserInfo)">
                        <div class="col">
                            <div class="d-grid">
                                <button
                                    class="btn btn-success text-bg-listing btn-lg"
                                    type="button"
                                    @click="chopeThisListing()"
                                >
                                    Chope!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chope Info -->
        <div class="container-fluid my-3" v-if="owner == currentUserInfo">
            <hr />
            <div class="row d-flex justify-content-center">
                <div class="chopedInfo col-md-5 bg-secondary rounded-3">
                    <div
                        class="chopedHeader"
                    >
                        <h4 class="m-0 p-0">Users who choped</h4>
                    </div>
                        <div
                        v-for="user in usersWhoChoped"
                        :key="user.Id"
                        class="userInfo d-flex justify-content-between align-items-center p-3"
                        >
                            {{ user.details.firstName }}
                            {{ user.details.lastName }}
                            <Button @click="moveToCollected(user)" style="background-color: #558C03" class="rounded">Collected?<Icon icon="iconamoon:arrow-right-2-fill" width="30" /></Button>

                        </div>
                </div>

                <div class="col-md-1"></div>
                <div class="chopedInfo col-md-5 bg-secondary rounded-3">
                    <div class="chopedHeader">
                        <h4 class="m-0 p-0">Users who collected</h4>
                    </div>

                    <div
                        v-for="user in usersWhoCollected"
                        :key="user.Id"
                        class="userInfo d-flex justify-content-between align-items-center p-3"
                        style="height: 82px;"
                        >
                            {{ user.details.firstName }}
                            {{ user.details.lastName }}
                            <Button @click="moveToChoped(user)" severity="danger" class="rounded"><Icon icon="akar-icons:cross" /></Button>

                        </div>
                </div>
            </div>
            <hr />
        </div>

        <!-- More Listings -->
        <div class="container-fluid" v-else>
            <hr />
            <h3>Similar food listings</h3>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row g-3">
                        <div
                            class="col-lg-3 col-md-4 col-sm-12"
                            v-for="listing in similarListing"
                        >
                            <router-link
                                :to="{
                                    name: 'listing',
                                    query: { Id: listing.Id },
                                }"
                            >
                                <div class="card h-100 shadow-sm">
                                    <img
                                        :src="listing.info.details.ImageUrls[0]"
                                        alt=""
                                        class="card-img-top"
                                    />
                                    <div class="card-body border-top">
                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary"
                                        >
                                            Category:
                                            {{ listing.info.details.Category }}
                                        </h6>
                                        <h5 class="card-title">
                                            Name:
                                            {{
                                                listing.info.details.ListingName
                                            }}
                                        </h5>
                                        <p
                                            class="card-text d-flex align-items-center mb-3"
                                        >
                                            {{
                                                listing.info.details.Location
                                                    .name
                                            }}
                                        </p>
                                        <!-- need to getLister -->
                                        <p
                                            class="card-text d-flex align-items-center mb-3"
                                        >
                                            Price:
                                            {{ listing.info.details.Price }}
                                            <br />
                                            Distance: {{ listing.distance }}
                                        </p>

                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary d-flex align-items-center"
                                        >
                                            <p class="me-1">
                                                {{ listing.owner }}
                                            </p>
                                        </h6>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            similarListing: [],
            listingInfo: [],
            expiryDate: "",
            location: "",
            listingCategory: "",
            listingId: null,
            owner: "",
            usersWhoChoped: [],
            usersWhoCollected: [],
            userNotCollect: [],
            currentUserInfo: "",
        };
    },
    created() {
        // console.log(this.$route.query.Id);
        this.listingId = this.$route.query.Id;
        this.getListingInfo();
        this.loadNearbyListings();
        this.loadChopes();
        this.chopeThisListing();
    },
    computed: {
        ...mapGetters([
            "isAuthenticated",
            "currentUser",
            "currentUserLocation",
        ]),
    },
    methods: {
        async moveToCollected(user) {
            this.usersWhoCollected.push(user);
            this.usersWhoChoped = this.usersWhoChoped.filter(
                (chopedUser) => chopedUser.Id !== user.Id
            );
            console.log(user);
            await collectListing(user.Id, this.listingId);
        },
        async moveToChoped(user) {
            this.usersWhoChoped.push(user);
            this.usersWhoCollected = this.usersWhoCollected.filter(
                (collectedUser) => collectedUser.Id !== user.Id
            );
            console.log(user);
            await collectListing(user.Id,this.listingId);
        },
        getUserInfo() {
            this.currentUserInfo = this.currentUser;
        },
        async getListingInfo() {
            const data = getListing(this.listingId);
            data.then((listing) => {
                console.log(listing);
                this.listingInfo = listing;
                console.log(this.listingInfo);

                this.expiryDate =
                    this.listingInfo.ExpiryDate.toDate().toLocaleDateString();
                this.location = this.listingInfo.Location.name;
                this.listingCategory = this.listingInfo.Category;
                this.owner = this.listingInfo.Owner;
            });
            this.loadNearbyListings();

            if (this.isAuthenticated) {
                this.getUserInfo();
                this.loadChopes();
            }
        },
        loadNearbyListings() {
            console.log("load nearby listings", this.listingCategory);
            const data = getListingsByCategory(this.listingCategory);
            data.then((listings) => {
                console.log("raw similar listings", listings);
                const users = getAllUsernames();
                console.log(users);

                for (const listing of listings.slice(0, 4)) {
                    let distanceToUser = Number.parseFloat(
                        calculateDistance(
                            this.currentUserLocation.lat,
                            this.currentUserLocation.lng,
                            listing.details.Location.latitude,
                            listing.details.Location.longitude
                        ).toFixed(3)
                    );
                    const owner = users[listing.details.Owner];

                    this.similarListing.push({
                        info: listing,
                        distance: distanceToUser,
                        owner: owner,
                    });
                }

                console.log("similar listing", this.similarListing);
            });
        },
        async loadChopes() {
            const data = await getUsersWhoChopedCollectedListing(
                this.listingId
            );

            this.usersWhoCollected = data.usersWhoCollected;
            this.usersWhoChoped = data.usersWhoChoped.filter((item) => {
                // Check if the item's Id is not in the smaller array
                return !this.usersWhoCollected.some(
                    (smallerItem) => smallerItem.Id === item.Id
                );
            });
        },
        chopeThisListing() {
            chopeListing(this.id, this.currentUser);
            console.log("chope success");
        },
    },
};
</script>

<style scoped>
#subheader {
    color: grey;
}

#name {
    font-size: 2rem;
    color: #558c03;
    font-weight: bold;
}

#price {
    font-size: 1.5rem;
    color: #558c03;
    font-weight: bold;
}

#qty {
    font-size: 1.5rem;
    color: #558c03;
    font-weight: bold;
}
.text-bg-listing {
    background-color: #558c03;
    padding: 10px;
    color: white;
    font-size: 1rem;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.username {
    font-size: 1.5rem;
    font-weight: bold;
    color: #558c03;
}

.userInfo {
    padding: 10px;
}

.filterBar {
    background-color: #f6fbf6;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
}

.chopedInfo {
    height: auto;
    padding: 10px;
    margin-top: 10px;
}

.chopedHeader {
    background-color: #558c03;
    color: white;
    border-radius: 10px;
    padding: 5px;
    width: auto;
    text-align: center;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.userInfo {
    background-color: lightgrey;
    padding: 3px;
    border-radius: 5px;
    margin-top: 10px;
    justify-content: center;
    display: flex;
    font-size: 20px;
    height: auto;
}

input[type="checkbox"] {
    margin-right: 10px;
}

input[type="checkbox"]:checked + label.strikethrough {
    text-decoration: line-through;
}

input[type="checkbox"]:not(:checked) + label.strikethrough {
    text-decoration: none;
}
</style>
