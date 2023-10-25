<script setup>
import SearchBar from "../components/SearchBar.vue";
import { getAllListings, matchString, getAllCategories, calculateDistance } from "../firebase/api.js"

</script>

<template>
    <body>

        
        <!-- search bar -->
        <SearchBar @search="searchFood"/>
        <!-- <div ></div> -->
        
        <!-- Map View button  -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10 p-0">
                    <!-- search bar -->
                    <!-- <SearchBar /> -->
                </div>
                <div class="col-2 d-flex justify-content-center p-0">
                    <div id="mapBtn" class="my-auto">
                        <button
                        type="button"
                        class="btn btn-outline-success d-flex align-items-center justify-content-center"
                        @click="navigate=>{$router.push('/mapView')}"
                    >
                        <img
                            src="../components/icons/googleMaps.png"
                            alt=""
                            class="img-fluid me-1"
                            style="width: 20px;"
                        />
                        Map View
                    </button>
                    </div>

                </div>
            </div>
        </div>


        <!-- listings -->
        <div class="container-fluid" >
            <h5 style="font-style: italic;">Search results for: </h5>
            <div class="filterBar row d-flex">
                <!-- vfor categories -->
                <ul>
                    <li><p class="d-inline" style="margin: 2px 5px;">Sort By: </p></li>
                    <li>
                        <b-dropdown text="Price" v-model="filterDistance">
                        <b-dropdown-item href="#" value="ascending">Price: Low to High</b-dropdown-item>
                        <b-dropdown-item href="#" value="descending ">Price: High to Low</b-dropdown-item>
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown text="Category of Food" v-model="filterCategory">
                        <b-dropdown-item href="#" v-for="category in allCategories" :value = "category">{{ category }} </b-dropdown-item>
                       
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown text="Location" v-model="filterDistance">
                        <b-dropdown-item href="#" value="2">Within 2km away</b-dropdown-item>
                        <b-dropdown-item href="#" value="5">Between 2k-5km</b-dropdown-item>
                        <b-dropdown-item href="#" value="10">Between 5km-10km</b-dropdown-item>
                        <b-dropdown-item href="#" value="9999">More than 10km</b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
            </div>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row g-3" v-if="foodItemsFiltered.length==0" >
                        <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in foodItems">
                            <div class="card shadow-sm">
                                <img
                                    :src="item.info.details.ImageUrls[0]"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6 
                                        class="card-subtitle mb-2 text-body-secondary">Category: {{ item.info.details.Category }}</h6>
                                    <h5 class="card-title">Name: {{ item.info.details.ListingName }}</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                         SMU School of Economics
                                    </p>
                                    <!-- need to getLister -->
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="me-1">Glenda123</p>
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
                    <div class="row g-3" v-else>
                        <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in foodItemsFiltered">
                            <div class="card shadow-sm">
                                <img
                                    :src="item.info.details.ImageUrls[0]"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Category: {{ item.info.details.Category }}</h6>
                                    <h5 class="card-title">{{ item.info.details.ListingName }}</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                         SMU School of Economics
                                    </p>
                                    <!-- need to getLister -->
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="me-1">Glenda123</p>
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
            <button
                type="button"
                class="btn addList d-flex align-items-center justify-content-center"
            ><a href="/addListing"><span style="color: white;">+</span></a></button>
        </div>

    </body>
</template>

<script>
export default {
    mounted(){
        console.log('mounted')
        this.loadListings()
        this.loadCategories()
    },
    data(){
        return {
            query: "",
            foodItems: [],
            foodItemsFiltered: [],
            maxReturn: -1,
            filterPrice: 9999,
            filterDistance: 9999,
            filterCategory: 'all',
            allCategories:[]
        }
    },
    methods:{
        async loadListings(){
            const data = getAllListings(this.maxReturn)
            data.then(
                listing => {
                    // console.log(listing)

                    for (let i=0;i<listing.length;i++){
                            let distanceToUser = Number.parseFloat(calculateDistance(this.userLocation.lat, this.userLocation.lng, listing[i].details.Location.latitude, listing[i].details.Location.longitude).toFixed(3))

                            this.foodItems.push({
                                                info: listing[i],
                                                distance: distanceToUser
                                            })
                        }
                    console.log(this.foodItems, 'listings loaded')
                }
            )
        }, 

        async loadCategories(){
            const data = getAllCategories()
            data.then(
                categories => {
                    console.log(categories)
                    this.allCategories = categories[0].categories
                }
            )
           
        },
        searchFood(searchVal){
            console.log('searchVal', searchVal)
            // this.foodItemsFiltered = filterByName(this.foodItems, searchVal)
            for (i=0;i<this.foodItems.length;i++){
                let name = this.foodItems[i].info.details.ListingName
                let category = this.foodItems[i].info.details.Category
                let distance = this.foodItems[i].distance

                if (matchString(searchVal, name) & category == this.filterCategory & distance <= this.filterDistance){
                    this.foodItemsFiltered.push(this.foodItems[i])
                }
            }

            //sort by htl or lth
            if (this.filterPrice == 'ascending'){
                this.foodItemsFiltered.sort((a, b) => a.info.details.Price - b.info.detail.Price)
            } else  if (this.filterPrice == 'descending'){
                this.foodItemsFiltered.sort((a, b) => b.info.details.Price - a.info.detail.Price)
            }
        
            console.log('filtered')
        },


    }
    
}

</script>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
    color: white;
}

.filterBar{
    background-color: lightgrey;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
}

.filterBar ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
}

.filterBar li{
    margin: 2px 5px;
    display: flex;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.addList{
    background-color: #83A538;
    position: fixed; 
    bottom: 0; 
    right: 0; 
    margin: 20px; 
    padding: auto; 
    height: 50px; 
    width: 50px; 
    border-radius: 50%; 
    font-size: 30px;
}
</style>