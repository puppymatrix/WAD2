<script setup>
import {
    getAllListings,
    filterByName,
    getAllCategories,
    calculateDistance,
    getAllUsernames,
    getListingsByCategory,
} from "../firebase/api.js";
import { mapGetters } from "vuex";
import { Icon } from "@iconify/vue";
</script>

<template>
    <body>
        <div class="container-fluid py-3">
            <div class="row justify-content-center">
                <!-- search bar -->
                <div class="col-10 col-md-6  align-items-center justify-content-center py-1">
                    <SearchBar @search="searchFood"/>
                </div>
                <!-- map view -->
                <div class="col-2 col-md-6  align-items-center justify-content-center py-1 ">
                    <router-link to="/mapView" class="">
                        <Button
                            class="rounded"
                            style="
                                background-color: #f6fbf6;
                                color: rgba(33, 37, 41, 0.75);
                            "
                            raised
                            text
                            plain
                        >
                            <Icon icon="logos:google-maps" />
                            &nbsp Food near me
                        </Button>
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
            <div class="row filterBar">
                <div class="col-3">
                    <CascadeSelect
                        v-model="selectedFilter"
                        :options="filters"
                        optionLabel="cname"
                        optionGroupLabel="name"
                        :optionGroupChildren="['types']"
                        style="min-width: 14rem"
                        placeholder="Filter By"
                        id="multi-select"
                        @change="filterBySelected"
                    />
                </div>
                <div class="col-2" v-if="selectedFilter != null">
                    <Button
                        severity="secondary"
                        @click="checkQuery"
                        class="rounded"
                        raised
                        ><Icon icon="uil:times" width="20" />&nbspClear
                        Filter</Button
                    >
                </div>
            </div>

            <div v-if="loading" class="container-fluid py-3 px-0">
                <!-- <ProgressSpinner strokeWidth="4" /> -->
                <h5 role="status">Loading...</h5>
                <!-- <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar> -->

                <div class="row">
                    <div
                        class="col-lg-3 col-md-4 col-sm-12"
                        v-for="n in 4"
                        :key="n"
                    >
                        <Skeleton
                            height="30rem"
                            :id="'skeleton-' + n"
                        ></Skeleton>
                    </div>
                </div>
            </div>
            <div class="album py-2" v-if="loaded">
                <div class="container-fluid px-0">
                    <div class="row g-3" v-if="check">
                        <div
                            class="col-lg-3 col-md-4 col-sm-12"
                            v-for="item in paginatedItems"
                        >
                            <router-link
                                :to="{
                                    name: 'listing',
                                    query: { Id: item.info.Id },
                                }"
                            >
                                <div class="card h-100">
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
                                            {{
                                                item.info.details.Location.name
                                            }}
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
                                    </div>
                                    
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div
                        class="row g-3"
                        v-else-if="!check && foodItemsFiltered.length > 0"
                    >
                        <div
                            class="col-lg-3 col-md-4 col-sm-12"
                            v-for="item in paginatedItems"
                        >
                            <router-link
                                :to="{
                                    name: 'listing',
                                    query: { Id: item.info.Id },
                                }"
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
                                            {{
                                                item.info.details.Location.name
                                            }}
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
                                    </div>
                                    
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div
                        class="row g-3"
                        v-else-if="!check && foodItemsFiltered.length == 0"
                    >
                        <div class="col-12">
                            <Message severity="warn" :closable="false"
                                >No results found!</Message
                            >
                        </div>
                    </div>
                </div>
            </div>
            <Paginator v-if="!(!check && foodItemsFiltered.length == 0)"
                :rows="rows"
                :totalRecords="listLength"
                @page="updatePage"
                :first="0"
                class="my-2"
                :key="paginatorKey"
            ></Paginator>
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
import SearchBar from "../components/SearchBar.vue";
export default {
    components: {
        SearchBar,
    },
    created() {
        this.loadListings();
        this.loadCategories();
        console.log(this.loadFromLandingPage(this.$route.query.search)) //this returns undefined 
        console.log(this.$route.query.search)
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
            selectedFilter: null,
            filters: [
                {
                    name: "Price",
                    types: [
                        { cname: "High to Low", type: "Price" },
                        { cname: "Low to High", type: "Price" },
                    ],
                },
                {
                    name: "Categories",
                    types: [],
                },
                {
                    name: "Location",
                    types: [
                        { cname: "Within 2km away", type: "Distance" },
                        { cname: "Within 5km away", type: "Distance" },
                        { cname: "Within 10km away", type: "Distance" },
                        { cname: "Within 20km away", type: "Distance" },
                        { cname: "Any", type: "Distance" },
                    ],
                },
            ],
            page: 0,
            rows: 8,
            listLength: 0,
            paginatorKey: 0,
        };
    },

    computed: {
        ...mapGetters(["currentUserLocation"]),
        check() {
            if (!this.selectedFilter && !this.query) {
                return true;
            } else {
                return false;
            }
        },
        paginatedItems() {
            let list;
            if (this.check) {
                list = this.foodItems;
                this.listLength = this.foodItems.length;
                
            } else if (!this.check && this.foodItemsFiltered.length > 0) {
                list = this.foodItemsFiltered;
                this.listLength = this.foodItemsFiltered.length;
            } 
            const start = this.page * this.rows;
            const end = start + this.rows;
            return list.slice(start, end);
        },
    },
    methods: {
        updatePage(event) {
            this.page = event.page;
        },
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
            console.log("loaded all listings")
        },

        async loadCategories() {
            const data = await getAllCategories();
            const categories = data[0]["categories"];
            for (const category of categories) {
                this.filters[1].types.push({
                    cname: category,
                    type: "Category",
                });
            }
            // this.allCategories = categories;
        },

        loadFromLandingPage(searchVal){
             this.foodItemsFiltered = filterByName(this.foodItems, searchVal)
        },
        async searchFood(searchVal) {
            this.query = searchVal;
            if (searchVal == "") {
                this.foodItemsFiltered = this.foodItems;
            }
            if (this.selectedFilter) {
                await this.filterBySelected();
            }
            this.foodItemsFiltered = filterByName(this.foodItems, searchVal);
        },
        async filterBySelected() {
            this.foodItemsFiltered = [];
            this.page = 0;
            this.paginatorKey++;
            if (this.selectedFilter.type == "Price") {
                const filterPrice = this.selectedFilter.cname;
                this.foodItemsFiltered = this.filterByPrice(
                    filterPrice,
                    this.foodItems
                );
            } else if (this.selectedFilter.type == "Category") {
                const filterCategory = this.selectedFilter.cname;
                this.foodItemsFiltered = await this.filterByCategory(
                    filterCategory,
                    this.foodItems
                );
            } else if (this.selectedFilter.type == "Distance") {
                let filterDistance;
                const distanceString = this.selectedFilter.cname;
                if (distanceString == "Within 2km away") {
                    filterDistance = 2;
                } else if (distanceString == "Within 5km away") {
                    filterDistance = 5;
                } else if (distanceString == "Within 10km away") {
                    filterDistance = 10;
                } else if (distanceString == "Within 20km away") {
                    filterDistance = 20;
                } else if (distanceString == "Any") {
                    filterDistance = 99999;
                }
                this.foodItemsFiltered = this.filterByDistance(
                    filterDistance,
                    this.foodItems
                );
            }
            if (this.query) {
                this.foodItemsFiltered = filterByName(
                    this.foodItemsFiltered,
                    this.query
                );
            }
        },
        async filterByCategory(category, listings) {
            let res = [];
            res = await getListingsByCategory(category, listings);
            return res;
        },
        filterByPrice(filterPrice, listings) {
            let res = [];
            if (filterPrice == "High to Low") {
                res = [...listings].sort(
                    (a, b) => b.info.details.Price - a.info.details.Price
                );
            } else if (filterPrice == "Low to High") {
                res = [...listings].sort(
                    (a, b) => a.info.details.Price - b.info.details.Price
                );
            }
            return res;
        },
        filterByDistance(filterDistance, listings) {
            let res = [];
            for (const listing of listings) {
                if (
                    typeof listing.distance === "number" &&
                    listing.distance < filterDistance
                ) {
                    res.push(listing);
                }
            }
            return res;
        },
        checkQuery() {
            this.selectedFilter = null;
            this.page = 0;
            this.paginatorKey++;
            if (this.query !== "") {
                this.searchFood(this.query);
            }
        },
    },
};
</script>

<style scoped>
.card:hover{
    box-shadow: 5px 5px 5px lightgray;
    transform: scale(1.02);
    transition: all 0.3s ease-in-out;
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
    background-color: #f6fbf6;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
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

@media screen and (max-width: 992px) {
    #skeleton-4 {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    #skeleton-2,
    #skeleton-3,
    #skeleton-4 {
        display: none;
    }
}
</style>
