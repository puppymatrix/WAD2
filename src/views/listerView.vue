<script setup>
    import SearchBar from "../components/SearchBar.vue";
    import { getAllListings, getUsersWhoChopedCollectedListing, getListingsByCategory, getListing} from "../firebase/api.js"
</script>

<template>
    <body class="p-5">
        
        <!-- search bar -->
        <SearchBar />

        <!-- Button-->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10"></div>
                <div class="col-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-success d-flex align-items-center justify-content-center" @click="navigate=>{this.$router.push('/mapView')}">
                    <img src="../components/icons/googleMaps.png" alt="" class="img-fluid me-1" style="width: 20px"/>
                    Map View
                    </button>
                </div>
            </div>
        </div>

        <div class="container-fluid my-3">
            <div class="row">
                <!-- carousel -->
                <div class="col-md-6">
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
        <div class="container-fluid my-3">
            <div class="row d-flex justify-content-center">
                <div class="chopedInfo col-md-5 bg-secondary rounded-3">
                    <div class="chopedHeader">
                        <h4>Users who choped</h4>
                    </div>

                    <form>
                        <div class="userInfo" v-for="user in userNotCollect" :key="user.Id">
                            <input type="checkbox" v-model="user.Id" @click="collectItem(user)" ref="checkboxInput">
                            <label for="user.Id" class="strikethrough"> {{user.details.username}} choped! </label><br>
                        </div>
                    </form>

                </div>

                <div class="col-md-1"></div>
                <div class="chopedInfo col-md-5 bg-secondary rounded-3">
                    <div class="chopedHeader">
                        <h4>Users who collected</h4>
                    </div>

                    <div>
                        <div class="userInfo" v-for="user in userCollect" :key="user.Id">
                            <input type="checkbox" v-model="user.Id" @click="notCollected(user)" checked disabled>
                            <label for="user.Id" > {{user.details.username}} collected! </label><br>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <hr>

        <div class="container-fluid">
            <h5>Similar food listings</h5>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row g-3">
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm" v-for="listing in similarListing" :key="listing.Id">
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
        this.loadChopes()
        this.getListingInfo()
        this.loadNearListings()
    },
    data(){
        return {
            foodItems: [],
            listingId: "BmWtUbQcxfSbWaxHW8Zf",
            userChope: [],
            userCollect: [], 
            userNotCollect: [], 
            similarListing: [], 
            listingInfo: [], 
            expiryDate: "",
            location: "",
            isChecked: false
        }
    },
    methods:{
        
        async loadChopes(){
            const data = getUsersWhoChopedCollectedListing(this.listingId)
            data.then(
                chopes => {
                    console.log(chopes)
                    this.userChope = chopes.usersWhoChoped;
                    this.userCollect = chopes.usersWhoCollected;
                    this.userNotCollect = this.userChope;
                    let count = 0;
                    for (let i = 0; i < this.userChope.length; i++) {
                        for (let y = 0; this.userCollect.length; y++){
                            // console.log(this.userChope[i].Id)
                            // console.log(this.userCollect[y].Id)
                            if (this.userChope[i].Id === this.userCollect[y].Id){
                                this.userNotCollect.splice(i-count, 1);
                                count ++;
                            }
                        }
                    }
                    console.log(count);
                    console.log(this.userNotCollect)
                    console.log(this.userCollect)
                }
            )
        },

        async getListingInfo(){
            const data = getListing(this.listingId)
            data.then(
                listing => {
                    this.listingInfo = listing;
                    console.log(this.listingInfo)

                    this.expiryDate = this.listingInfo.ExpiryDate.toDate().toLocaleDateString();
                    this.location = this.listingInfo.Location.name;
                }
            )
        },

        async loadNearListings(){
            console.log(this.listingInfo.Category)
            const data = getListingsByCategory(this.listingInfo.Category)
            data.then(
                listings => {
                    console.log(listings)
                    this.similarListing = listings;
                    
                }
            )
        }, 

        collectItem(user){
            console.log("collect item")
            this.userCollect.push(user)

            // if (this.isChecked){
            //     this.$refs.checkboxInput.disabled = true;
            // }
        }, 

        notCollected(user){
            console.log("not collected")
            this.userCollect.splice(userCollect.indexOf(user), 1)
        }


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

.chopedInfo{
    height: auto;
    padding: 10px;
    margin-top: 10px;
}


.chopedHeader{
    background-color: #83A638;
    color: white;
    border-radius: 10px;
    padding: 5px;
    width: auto;
    text-align: center;
}

.userInfo{
    background-color: lightgrey;
    padding: 3px;
    border-radius: 5px;
    margin: 10px;
    justify-content: center;
    display: flex;
    font-size: 20px;
    height: auto;
}

input[type=checkbox]{
    margin-right: 10px;
}

input[type=checkbox]:checked + label.strikethrough {
    text-decoration: line-through;
}
    

</style>
