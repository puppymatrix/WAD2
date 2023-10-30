<script setup>
import SearchBar from "../components/SearchBar.vue";
import {
    getAllListings,
    filterByName,
    getAllCategories,
    calculateDistance,
    getAllUsernames,
} from "../firebase/api.js";
import { mapGetters } from "vuex";
import { Icon } from "@iconify/vue";
</script>

<template>
    <body>
        <!-- Map View button  -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10 p-0">
                    <!-- search bar -->
                    <SearchBar @search="searchFood" />
                </div>

                <div
                    class="col-2 d-flex justify-content-center align-items-center p-0"
                >
                    <router-link to="/mapView" class="">
                        <button
                            class="btn btn-outline-success d-flex align-items-center justify-content-center"
                        >
                            <Icon icon="logos:google-maps" />
                            &nbsp Map View
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- listings -->
        <!-- <h3>
            {{ filterPrice }}
            {{ filterCategory }}
            {{ filterDistance }}
        </h3> -->

        <div class="container-fluid">
            <h5 style="font-style: italic">Search results for:</h5>
            <div class="filterBar row d-flex">
                <!-- vfor categories -->
                <ul>
                    <li>
                        <p class="d-inline" style="margin: 2px 5px">Sort By:</p>
                    </li>
                    <li>
                        <b-dropdown text="Price" v-model="filterPrice">
                            <b-dropdown-item
                                href="#"
                                @click="this.filterPrice = 'ascending'"
                                >Low to High</b-dropdown-item
                            >
                            <b-dropdown-item
                                href="#"
                                @click="this.filterPrice = 'descending'"
                                >High to Low</b-dropdown-item
                            >
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown
                            text="Category of Food"
                            v-model="filterCategory"
                        >
                            <!-- <b-dropdown text="Category of Food" v-model="filterCategory"></b-dropdown> -->
                            <b-dropdown-item
                                v-for="category in allCategories"
                                :value="category"
                                @click="this.filterCategory = category"
                                >{{ category }}</b-dropdown-item
                            >
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown text="Location" v-model="filterDistance">
                            <b-dropdown-item
                                href="#"
                                @click="this.filterDistance = '2'"
                                >Within 2km away</b-dropdown-item
                            >
                            <b-dropdown-item
                                href="#"
                                @click="this.filterDistance = '5'"
                                >Within 5km away</b-dropdown-item
                            >
                            <b-dropdown-item
                                href="#"
                                @click="this.filterDistance = '10'"
                                >Within 10km away</b-dropdown-item
                            >
                            <b-dropdown-item
                                href="#"
                                @click="this.filterDistance = '20'"
                                >Within 20km away</b-dropdown-item
                            >
                            <b-dropdown-item
                                href="#"
                                @click="this.filterDistance = '99999'"
                                >All</b-dropdown-item
                            >
                        </b-dropdown>
                    </li>
                </ul>
            </div>

            <div v-if="loading" class="container-fluid py-3 px-0">
                <!-- <ProgressSpinner strokeWidth="4" /> -->
                <h5 role="status">Loading...</h5>
                <!-- <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar> -->
                
                <div class="row">
                    <div
                        class="col-lg-3 col-md-3 col-sm-12"
                        v-for="n in 4"
                        :key="n"
                    >
                        <Skeleton height="30rem" :id="'skeleton-' + n"></Skeleton>
                    </div>
                </div>
            </div>
            <div class="album py-2" v-if="loaded">
                <div class="container-fluid px-0">
                    <div class="row g-3" v-if="foodItemsFiltered.length == 0">
                        <div
                            class="col-lg-3 col-md-4 col-sm-12"
                            v-for="item in foodItems"
                        >
                            <div class="card h-100 shadow-sm">
                                <img
                                    :src="item.info.details.ImageUrls[0]"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top">
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary"
                                    >
                                        Category:
                                        {{ item.info.details.Category }}
                                    </h6>
                                    <h5 class="card-title">
                                        Name:
                                        {{ item.info.details.ListingName }}
                                    </h5>
                                    <p
                                        class="card-text d-flex align-items-center mb-3"
                                    >
                                        {{ item.info.details.Location.name }}
                                    </p>
                                    <!-- need to getLister -->
                                    <p
                                        class="card-text d-flex align-items-center mb-3"
                                    >
                                        Price: {{ item.info.details.Price }}
                                        <br />
                                        Distance: {{ item.distance }}
                                    </p>

                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary d-flex align-items-center"
                                    >
                                        <p class="me-1">
                                            {{ item.owner }}
                                        </p>
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group"></div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-secondary"
                                    >
                                        <a href="/listing">View</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row g-3" v-else>
                        <div
                            class="col-lg-3 col-md-4 col-sm-12"
                            v-for="item in foodItemsFiltered"
                        >
                            <div class="card shadow-sm">
                                <img
                                    :src="item.info.details.ImageUrls[0]"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary"
                                    >
                                        Category:
                                        {{ item.info.details.Category }}
                                    </h6>
                                    <h5 class="card-title">
                                        {{ item.info.details.ListingName }}
                                    </h5>
                                    <p
                                        class="card-text d-flex align-items-center mb-3"
                                    >
                                        {{ item.info.details.Location.name }}
                                    </p>
                                    <!-- need to getLister -->
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary d-flex align-items-center"
                                    >
                                        <p
                                            class="card-text d-flex align-items-center mb-3"
                                        >
                                            Price:
                                            {{ item.info.details.Price }} <br />
                                            Distance: {{ item.distance }}
                                        </p>
                                    </h6>
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary d-flex align-items-center"
                                    >
                                        <p class="me-1">
                                            {{ item.owner }}
                                        </p>
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group">
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary"
                                            >
                                                <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Add Listing Button-->
        <div>
            <router-link to="/addListing">
                <!-- <button
                    class="btn addList d-flex align-items-center justify-content-center"
                > -->
                <Button class="addList raised">
                    <span style="color: white">+</span>
                </Button>
                    
                <!-- </button> -->
            </router-link>
        </div>
    </body>
</template>

<script>
export default {
    created() {
        this.loadListings();
        this.loadCategories();
    },
    data() {
        return {
            query: "",
            foodItems: [],
            foodItemsFiltered: [],
            maxReturn: -1,
            filterPrice: "ascending",
            filterDistance: 99999,
            filterCategory: "all",
            allCategories: [],
            loading: true,
            loaded: false,
            numSkeletons: 4,
        };
    },

    computed: {
        ...mapGetters(["currentUserLocation"]),
    },
    methods: {
        async loadListings() {
            const listings = await getAllListings();
            const users = await getAllUsernames();
            // console.log(listings);

            for (const listing of listings) {
                let distanceToUser = Number.parseFloat(
                    calculateDistance(
                        this.currentUserLocation.lat,
                        this.currentUserLocation.lng,
                        listing.details.Location.latitude,
                        listing.details.Location.longitude
                    ).toFixed(3)
                );
                const owner = users[listing.details.Owner];

                this.foodItems.push({
                    info: listing,
                    distance: distanceToUser,
                    owner: owner,
                });
            }
            this.loading = false;
            this.loaded = true;
        },

        async loadCategories() {
            const data = await getAllCategories();
            const categories = data[0]["categories"];
            this.allCategories = categories;
        },
        searchFood(searchVal) {
            // incomplete do something about all
            console.log("searchVal", searchVal);
            this.foodItemsFiltered = filterByName(this.foodItems, searchVal);

            for (let i = 0; i < this.foodItemsFiltered; i++) {
                if (
                    !(
                        this.foodItemsFiltered[i].distance <=
                            this.filterDistance &&
                        this.foodItemsFiltered[i].info.details.Category ==
                            this.filterCategory.toLowerCase()
                    )
                ) {
                    this.foodItemsFiltered.slice(i, i + 1);
                }
            }

            if (this.filterPrice == "ascending") {
                this.foodItemsFiltered.sort(
                    (a, b) => a.info.details.Price - b.info.details.Price
                );
            } else if (this.filterPrice == "descending") {
                this.foodItemsFiltered.sort(
                    (a, b) => b.info.details.Price - a.info.details.Price
                );
            }
            console.log("filtered", this.foodItemsFiltered);
        },
    },
};
</script>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
    color: white;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

a {
    text-decoration: none;
}
.filterBar {
    background-color: lightgrey;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
}

.filterBar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
}

.filterBar li {
    margin: 2px 5px;
    display: flex;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.addList {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 20px;
    height: 50px;
    width: 50px;
    font-size: 30px;
    border-radius: 50%;
}
</style>
