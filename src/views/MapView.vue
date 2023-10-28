<script setup>

    import { getAllListings, filterByDistance, filterByName, calculateDistance } from "../firebase/api"
    import { mapGetters } from 'vuex'

    import routingTest from './routingTest.vue'
</script>

<template>
    <div class="row">
        <div class="col-1"></div>
        <div class="container m-3 col-10">

            <Map
                :apiKey="key"
                :foodItemsFiltered="foodItemsFiltered"
                :userLocation="currentUserLocation"
                >
            </Map>
            <!-- <routingTest
                :apiKey="key"
                :foodItemsFiltered="foodItemsFiltered"
                :userLocation="currentUserLocation"
            >

            </routingTest> -->
            <!-- <GoogleMap 
                api-key="AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE" 
                style="width: 100%; 
                height: 500px"
                :center="userLocation" 
                :zoom="12"
                >
                <Marker :options="{ 
                                    position: userLocation, 
                                    icon: icon,

                                }">
                </Marker>

                <Marker :options="{ position: {
                                                lat: listing.info.Location.latitude, 
                                                lng: listing.info.Location.longitude,
                                                
                                            },
                                    scale: 1.5,
                                   
                                    }" 
                    v-for="listing in foodItemsFiltered">

                    <InfoWindow :options="{
                                            minWidth: 100,
                                            maxWidth: 300           
                                            }" >
                        <div class="card">
                            <div id="carouselExample" class="carousel slide">
                                <div class="carousel-inner"
                                    v-for="(url, index) in listing.info.ImageUrls" :key="index" 
                                    :class="index == 0 ? 'carousel-item active' : 'carousel-item'">                
                                        <img :src=url class="d-block w-100" alt="..."> 
                                </div>
                                    
                                
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>

                            </div>

                            <div class="card-body">
                                <h5 class="card-title">{{ listing.info.ListingName }}</h5>
                                <ul>
                                    <li>Category: {{ listing.info.Category }}</li>
                                    <li>Expiry Date: {{ listing.info.ExpiryDate.toDate() }}</li>
                                    <li>Perishable: {{ listing.info.Perishable ? "Yes": "no" }}</li>
                                    <li>Price: {{ listing.info.Price }}</li>
                                    <li>Quantity Available: {{ listing.info.QtyAvailable }}</li>
                                </ul>                                
                                <a href="#" class="btn btn-link">View more...</a>
                            </div>
                        </div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>            -->
            <br> 

            <!-- search bar  -->
            <div class="input-group">
                <input 
                    type="search" 
                    class="form-control bg-secondary-subtle" 
                    placeholder="Find the food you want!" 
                    v-model="searchQuery"
                    @keyup.enter="loadFoodByNameAndDistance"
                />
                <button class="btn text-bg-listing d-flex align-items-center justify-content-center" type="button" id="button-addon2" >
                <!-- <i class="search"></i> -->
                    <img src="../components/icons/search.jpeg" class="img-fluid" style="width:20px; color: white;"
                />
                </button>
            </div>


            <div class="row slidecontainer">
                <h5>Distance (in KM): {{ filterDistance }}</h5>
                <input type="range" min="1" max="100" v-model="filterDistance" class="slider" id="myRange">
            </div>

            <div class="row">
                <div class="col-2">
                    <button @click="loadByDistance" class = "btn btn-secondary">Food Nearby</button>
                </div>
                <div class="col-10"></div>
            </div>

        </div>    
        <div class="col-1" >
            
        </div>
    </div>

    <!-- {{  currentUserLocation }} -->
  </template>

  
  
  <script>

    
    export default {
        mounted(){
            // getUserLocation(),
            this.loadFood()
        },
        
        data(){
            return {
                filterDistance: 10,
                searchQuery: '',
                // userLocation: {},
                foodItems: [],
                foodItemsFiltered: [],
                coord: { lat: 1.290270, lng: 103.851959 },
                key: 'AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE',
            }
        },
        props: {
                'apiKey': String,
                'foodItemsFilteredArr': Array, 
                'userLocationObj': Object,
                'listingArr': Array
        },
        
        methods: {
            getCoordinates() {
                // this function gets the coordinates
                const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.key}&address=${this.searchQuery}`;

                console.log(url)

                axios.get(url)
                .then(
                    response => {
                        // console.log(response)

                        const data = response.data.results[0];
                        var latitude = parseFloat(data.geometry.location.lat)
                        var longitude = parseFloat(data.geometry.location.lng)

                        this.coord = {lat: latitude, lng: longitude}
                    })
                .catch(
                    error => {
                        console.log(error)
                        console.log(error.response.data.error_message)

                })
            },
            searchLocation(){
                this.getCoordinates()
            },
            getUserLocation(){
                const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.key}`
                axios.post(url)
                .then(
                    response => {
                        const data = response.data

                        this.userLocation = data.location
                    }   
                )

                .catch(
                    error => {
                        console.log(error)
                    }
                )
            },
            async loadFood(){

                const data = getAllListings()
                data.then(
                    listing => {
                        console.log(listing)
                        console.log('userLocation', this.currentUserLocation)
                        // this.foodItems.push({
                        //     listingId: doc.id,
                        //     info: doc.data(),
                        //     distance: distanceToUser // straight line distance from user location to food location
                        // })
                        for (let i=0;i<listing.length;i++){
                            let distanceToUser = Number.parseFloat(calculateDistance(this.currentUserLocation.lat, this.currentUserLocation.lng, listing[i].details.Location.latitude, listing[i].details.Location.longitude).toFixed(3))

                            this.foodItems.push({
                                                info: listing[i],
                                                distance: distanceToUser
                                            })
                        }
                    }
                )    
            },

            loadFoodByNameAndDistance(){
            console.log('foodItems', this.foodItems)
            this.foodItemsFiltered = filterByDistance(filterByName(this.foodItems, this.searchQuery), this.filterDistance)
            console.log(this.foodItemsFiltered)
            },

            loadByDistance(){
            this.foodItemsFiltered = filterByDistance(this.foodItems, this.filterDistance)
            console.log(this.foodItemsFiltered)
            }
        },
        computed :{
            ...mapGetters(['currentUserLocation'])
        },
        methods: {
            
            // searchLocation(){
            //     this.// getCoordinates()
            //     this.getUserLocation('AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE')
            // },
            
    };

  </script>

<style>
    .text-bg-listing {
    background-color: #558C03;
    color: white;
}
</style>
