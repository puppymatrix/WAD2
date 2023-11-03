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
    canUserChope,
} from "@/firebase/api.js";
import { Icon } from "@iconify/vue";
import { handleError } from "vue";
</script>

<template>
    <body class="px-5 py-2" v-if="listingInfo">
        <div class="container-fluid my-2 filterBar">
            <div class="row">
                <!-- carousel -->
                <div
                    class="col-lg-6 display-flex align-item-center justify-content-center m-0"
                    v-if="listingInfo.ImageUrls.length > 1"
                >
                    <BCarousel controls indicators imgHeight="600px">
                        <BCarouselSlide
                            v-for="photos in listingInfo.ImageUrls"
                            :img-src="photos"
                            style="width: 100%; height: 100%; object-fit: cover"
                        />
                    </BCarousel>
                </div>
                <div
                    class="col-lg-6 display-flex align-item-center justify-content-center"
                    v-else
                >
                    <img
                        :src="listingInfo.ImageUrls[0]"
                        alt=""
                        class="card-img"
                        style="width: 100%; height: 100%; object-fit: cover"
                    />
                </div>
                <div class="col-lg-6">
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
                            class="col-4 d-flex align-items-center justify-content-end px-3"
                        >
                            <router-link
                                :to="{
                                    name: 'mapView',
                                    query: { Id: listingId },
                                }"
                            >
                                <Button
                                    style="
                                        background-color: #343a40;
                                        color: white;
                                    "
                                    class="rounded"
                                    raised
                                    plain
                                    text
                                    ><Icon
                                        icon="material-symbols:directions"
                                        color="white"
                                        width="18"
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
                                    qty
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
                                                'Description'
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
                            <div class="d-grid row px-1">
                                <div class="col" v-if="choped">
                                    <button
                                    class="btn btn-success text-bg-listing btn-lg w-100"
                                    type="button"
                                    @click="chopeThisListing()"
                                    >
                                        Chope!
                                    </button>
                                </div>
                                <div class="col" v-else>
                                    <button
                                    class="btn btn-success text-bg-listing btn-lg w-100"
                                    type="button"
                                    disabled
                                    >
                                        Chope!
                                    </button>
                                    <p class="msg" v-if="this.qty == 0">All products are currently choped, check back again later!</p>
                                    <p  class="msg" v-else>You have already choped this listing!</p>
                                </div>
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
                    <div class="chopedHeader">
                        <h4 class="m-0 p-0">Users who choped</h4>
                    </div>
                    <div
                        v-for="user in usersWhoChoped"
                        :key="user.Id"
                        class="userInfo d-flex justify-content-between align-items-center p-3"
                    >
                        {{ user.details.firstName }}
                        {{ user.details.lastName }}
                        <Button
                            @click="moveToCollected(user)"
                            style="background-color: #558c03"
                            class="rounded"
                            >Collected?<Icon
                                icon="iconamoon:arrow-right-2-fill"
                                width="30"
                        /></Button>
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
                        style="height: 82px"
                    >
                        {{ user.details.firstName }}
                        {{ user.details.lastName }}
                        <Button
                            @click="moveToChoped(user)"
                            severity="danger"
                            class="rounded"
                            ><Icon icon="akar-icons:cross"
                        /></Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- More Listings -->
        <div class="container-fluid">
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
                                style="text-decoration: none"
                                :to="{
                                    name: 'listing',
                                    query: { Id: listing.info.Id },
                                }"
                            >
                                <div class="card h-100">
                                    <img
                                        :src="listing.info.details.ImageUrls[0]"
                                        alt=""
                                        class="card-img-top"
                                    />
                                    <div class="card-body border-top">
                                        <h5 class="card-title">
                                            Listing Name: <br />
                                            <span class="listingName">{{
                                                listing.info.details.ListingName
                                            }}</span>
                                        </h5>
                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary"
                                        >
                                            Category:
                                            {{ listing.info.details.Category }}
                                            <br />
                                            Lister: {{ listing.owner }}
                                        </h6>
                                        <p
                                            class="card-text moreInfo d-flex align-items-center mb-3"
                                        >
                                            Location:
                                            {{
                                                listing.info.details.Location
                                                    .name
                                            }}
                                            <br />
                                            Price:
                                            ${{ listing.info.details.Price }}                                    
                                        </p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <body class="px-5 py-2" v-else>
        <div class="container-fluid my-2 filterBar px-5">
            <div class="row">
                <!-- carousel -->
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <Skeleton height="35rem"></Skeleton>
                        </div>
                    </div>
                   
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <Skeleton height="3rem" class="mb-3"></Skeleton>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8">
                            <Skeleton height="3rem" class="mb-3"></Skeleton>
                        </div>
                        <div class="col"></div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <Skeleton height="10rem" class="mb-3"></Skeleton>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-7">
                            <Skeleton height="3rem" class="mb-3"></Skeleton>
                        </div>
                        <div class="col"></div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Skeleton height="3rem" class="mb-3"></Skeleton>
                        </div>
                        <div class="col"></div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <Skeleton height="3rem" class="mb-3"></Skeleton>
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
            listingInfo: null,
            qty: null,
            expiryDate: "",
            location: "",
            listingCategory: null,
            listingId: "",
            owner: "",
            usersWhoChoped: [],
            usersWhoCollected: [],
            userNotCollect: [],
            currentUserInfo: "",
            choped: true,
        };
    },
    async created() {
        window.scrollTo(0, 0);
        this.listingId = this.$route.query.Id;
        await this.getListingInfo();
        await this.loadNearbyListings();
        if (this.isAuthenticated) {
            this.getUserInfo();
            this.choped = await canUserChope(this.currentUser, this.listingId);
        }
        await this.loadChopes();
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
            // console.log(user);
            await collectListing(user.Id, this.listingId);
        },
        async moveToChoped(user) {
            this.usersWhoChoped.push(user);
            this.usersWhoCollected = this.usersWhoCollected.filter(
                (collectedUser) => collectedUser.Id !== user.Id
            );
            // console.log(user);
            await collectListing(user.Id, this.listingId);
        },
        getUserInfo() {
            this.currentUserInfo = this.currentUser;
        },
        async getListingInfo() {
            // console.log('id', this.id)
            const listing = await getListing(this.listingId);
            this.listingInfo = listing;
            this.qty = this.listingInfo.QtyAvailable;
            // console.log("listingInfo", this.listingInfo);

            this.expiryDate = this.listingInfo.ExpiryDate.toDate().toLocaleDateString();
            this.location = this.listingInfo.Location.name;
            this.listingCategory = this.listingInfo.Category;
            // console.log(this.listingCategory);
            this.owner = this.listingInfo.Owner;
        },

        async loadNearbyListings() {
            // console.log("load nearby listings", this.listingCategory);
            const listings = await getListingsByCategory(this.listingCategory);
            const users = await getAllUsernames();
            const randomIndex = Math.floor(Math.random() * (listings.length-4));
            const listingSlice = listings.slice(randomIndex, randomIndex + 4);
            for (const listing of listingSlice) {
                const owner = users[listing.details.Owner];

                this.similarListing.push({
                    info: listing,
                    owner: owner,
                });
            }
            // console.log("final similar listing", this.similarListing);
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
        async chopeThisListing() {
            if (this.isAuthenticated) {
                // console.log(this.listingId,this.currentUser);
                const status = await chopeListing(this.currentUser, this.listingId);
                if (status) {
                    this.$toast.add({
                    severity: "info",
                    summary: "Chope Successful",
                    detail: "You have successfully choped this listing!",
                    life: 3000,
                });
                this.choped = await canUserChope(this.currentUser, this.listingId);
                this.qty--;
                } else {
                    this.$toast.add({
                    severity: "error",
                    summary: "Chope Unsuccessful",
                    life: 3000,
                });
                }
                
            } else {
                this.$router.push("/addListing");
                // this.$toast.add({
                //     severity: "error",
                //     summary: "Not Logged In",
                //     detail: "Please log in to chope this listing",
                //     life: 3000,
                // });
            }
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

.listingName {
    color: #558c03;
    font-weight: bold;
    font-size: 22px;
}

.card-title {
    margin-bottom: 20px;
}

.card-subtitle {
    height: 55px;
}

.msg{
    margin-bottom: 0;
    color: red;
    margin-top: 5px;
    text-align: center;
}

.moreInfo {
    background-color: lightgray;
    padding: 10px;
    border-radius: 8px;
    height: 100px;
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
    background-color: #83a638;
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
