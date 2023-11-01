<script setup>
    import { getListing, getListingsByCategory, getUsersWhoChopedCollectedListing } from "@/firebase/api.js";
    import { Icon } from "@iconify/vue";
</script>

<template>

    <body class="px-5 py-2">

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
                        <div class="col-8">
                            <h2 class="d-inline">Listing: <span id="name">{{ listingInfo.ListingName[0].toUpperCase() + listingInfo.ListingName.slice(1)  }}</span></h2>
                        </div>
                        <div
                    class="col d-flex align-items-center justify-content-start"
                >


               
                    <router-link :to="{
                                    name: 'mapView',
                                    query: { Id: id },
                                }"
                            >
                            <Button
                        style="background-color: #343a40;color:white;"
                        @click="checkQuery"
                        class="rounded"
                        raised
                        plain
                        text
                        ><Icon icon="material-symbols:directions" color="white" width="25"/>
                            &nbspDirections</Button
                    >
                    </router-link>
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
                                    class="btn btn-success text-bg-listing btn-lg"
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
                            <input type="checkbox" v-model="user.Id" @click="collectItem(user)" id="user.Id">
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
                            <input type="checkbox" v-model="user.Id" @click="notCollected(user)" checked>
                            <label for="user.Id" > {{user.details.username}} collected! </label><br>
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
                                    :src="listing.ImageUrls[0]"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top">
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary"
                                    >
                                        Category:
                                        {{ listing.Category }}
                                    </h6>
                                    <h5 class="card-title">
                                        Name:
                                        {{ listing.ListingName }}
                                    </h5>
                                    <p
                                        class="card-text d-flex align-items-center mb-3"
                                    >
                                        {{ listing.Location.name }}
                                    </p>
                                    <!-- need to getLister -->
                                    <p
                                        class="card-text d-flex align-items-center mb-3"
                                    >
                                        Price: {{ listing.Price }}
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
export default {
    data(){
        return {
            similarListing: [], 
            listingInfo: [], 
            expiryDate: "",
            location: "",
            listingCategory: "",
            id: "2lfjk87n8mVA8wD0ZDMQ",
            userChope: [],
            userCollect: [],
            userNotCollect: [],
        }
    },
    created(){
        // console.log(this.$route.query.Id);
        // this.id = this.$route.query.Id;
        this.getListingInfo();
        this.loadNearbyListings();
        this.loadChopes();
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
                    this.listingCategory = this.listingInfo.Category;
                }
            )
            this.loadNearbyListings();
        },
        loadNearbyListings(){
            console.log("load nearby listings", this.listingCategory)
            const data = getListingsByCategory(this.listingCategory)
            data.then(
                listings => {
                    this.similarListing = listings.slice(0,4);
                    console.log("similar listing", this.similarListing);
                }
            )
        },
        async loadChopes(){
            const data = getUsersWhoChopedCollectedListing(this.id)
            data.then(
                chopes => {
                    console.log(chopes)
                    this.userChope = chopes.usersWhoChoped;
                    this.userCollect = chopes.usersWhoCollected;
                    this.userNotCollect = this.userChope;
                    let count = 0;
                    for (let i = 0; i < this.userChope.length; i++) {
                        for (let y = 0; this.userCollect.length; y++){
                            console.log(this.userChope[i].Id)
                            console.log(this.userCollect[y].Id)
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
        collectItem(user){
            console.log(user);
            this.userCollect.push(user);
            let checkbox = document.getElementById("user.Id");
            if (checkbox.checked){
                console.log("checked")
                checkbox.disabled = true;
                console.log("help", checkbox.disabled)
            }
            console.log(this.userCollect);
            console.log(this.userNotCollect);
        },
        notCollected(user){
            console.log(user);
            this.userCollect.splice(this.userCollect.indexOf(user), 1);
            let checkbox = document.getElementById("user.Id");
            if (checkbox.checked){
                console.log("checked")
                checkbox.checked = false;
                checkbox.disabled = false;
                console.log("help", checkbox.disabled)
            }
            // console.log(this.userCollect);
            // console.log(this.userNotCollect);
        },
    },
    // watch: {
    //     listingCategory:{
    //         handler(){
    //             this.getListingInfo();
    //         }, 
    //         deep: true
    //     }
    // }
    
}

</script>



<style scoped>

#subheader{
    color: grey;
}

#name{
    font-size: 2rem;
    color: #558C03;
    font-weight: bold;
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
    font-size: 1rem;
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
    margin-top: 10px;
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


input[type=checkbox]:not(:checked) + label.strikethrough {
    text-decoration: none;
}

</style>
