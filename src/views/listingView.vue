<script setup>
    import SearchBar from "../components/SearchBar.vue";
    import { getListing, getListingsByCategory } from "@/firebase/api.js"
    import { Icon } from "@iconify/vue";

</script>

<template>

    <body class="px-5 py-2">
        <!-- search bar -->

        <SearchBar @search="searchFood"/>

        <div class="container-fluid">
            <div class="row">
                <div class="col-10 p-0">
                    <!-- search bar -->
                    <SearchBar @search="searchFood" />
                </div>

                <div
                    class="col-2 d-flex align-items-center justify-content-center"
                >


               
                    <router-link :to="{
                                    name: 'mapView',
                                    query: { Id: id },
                                }"
                            >
                        <Button
                            class="rounded"
                            style="background-color: #f6fbf6;color:rgba(33, 37, 41, 0.75)"
                            raised
                            text
                            plain
                        >
                        <Icon icon="material-symbols:directions" color="black" width="25"/>
                            &nbspDirections
                        </Button>
                    </router-link>
                </div>
            </div>
        </div>


        <div class="container-fluid my-2 filterBar">
            <div class="row">
                <!-- carousel -->
                <div class="col-md-6 display-flex align-item-center justify-content-center">
                    <BCarousel controls indicators imgHeight="450px">
                        <BCarouselSlide v-for="photos in listingInfo.ImageUrls" :img-src="photos" />
                    </BCarousel>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col">
                            <h2>Listing: {{ listingInfo.ListingName }}</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h4 id="subheader">Price: <span id="price">${{ listingInfo.Price }}</span> | Quantity Available: <span id="qty">{{ listingInfo.QtyAvailable}}</span></h4>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="card my-3" style="width: 100%">
                                <div class="card-body">
                                    <h5 class="card-title">Food Description</h5>
                                    <p class="card-text" v-if="listingInfo.hasOwnProperty(Description)">{{ listingInfo.Description }}</p>
                                    <p class="card-text" v-else> Not Applicable </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Category of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >{{listingInfo.Category }}</span
                            >
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Type of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1" v-if="listingInfo.Perishable">Perishable</span>
                            <span class="badge text-bg-listing ms-1" v-else>Non-Perishable</span>
                        </div>
                    </div>

                    <div class="row pt-1 pb-2">
                        <div class="col">
                            <h6 class="d-inline">Listing Expiry Time:</h6>
                            <span class="badge text-bg-listing ms-1">{{ expiryDate }}</span>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Location:</h6>
                            <span class="badge text-bg-listing ms-1">{{ location }}</span
                            >
                        </div>
                    </div>

                    <div class="row pt-2">
                        <div class="col">
                            <div class="d-grid">
                                <button
                                    class="btn btn-success text-bg-listing"
                                    type="button"
                                >
                                    Chope!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>
        <!-- More Listings -->
        <div class="container-fluid">
            <h3>Similar food listings</h3>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row g-3">
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm" v-for="listing in similarListing">
                                <img v-for="photo in listing.details.ImageUrls" :src="photo" alt="" class="card-img-top" />
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Category: {{ listing.details.Category }}</h6>
                                    <h5 class="card-title">{{listing.details.ListingName}}</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                        <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> {{ listing.details.Location.name }}
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <IMdiuser class="me-1"/>{{listing.details.username}}
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group">
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary"
                                            >
                                                View
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
    </body>
</template>

<script>
export default {
    mounted(){
        console.log('mounted')
        this.id = this.$route.query.Id
        this.getListingInfo()
        this.loadNearListings()
    },
    data(){
        return {
            foodItems: [],
            similarListing: [], 
            listingInfo: [], 
            expiryDate: "",
            location: "",
            id: null
        }
    },
    methods:{
        async getListingInfo(){
            const data = getListing(this.id)
            data.then(
                listing => {
                    console.log(listing);
                    this.listingInfo = listing;
                    console.log(this.listingInfo)

                    this.expiryDate = this.listingInfo.ExpiryDate.toDate().toLocaleDateString();
                    this.location = this.listingInfo.Location.name;
                }
            )
        },

        async loadNearListings(){
            const data = getListingsByCategory(this.listingInfo.Category)
            data.then(
                listings => {
                    console.log(listings)
                    this.similarListing = listings;
                    // not working as well 
                }
            )
        }, 


    }
    
}

</script>



<style scoped>

#subheader{
    color: grey;
}

#price{
    font-size: 1.5rem;
    color: #558C03;
    font-weight: bold;
}

#qty{
    font-size: 1.5rem;
    color: #558C03;
    font-weight: bold;
}
.text-bg-listing {
    background-color: #558C03;
    padding: 10px;
    color: white;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.username{
    font-size: 1.5rem;
    font-weight: bold;
    color: #558C03;
}

.userInfo{
    padding: 10px;
}

.filterBar {
    background-color: #f6fbf6;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
}

</style>
