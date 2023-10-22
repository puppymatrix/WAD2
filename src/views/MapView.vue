<script setup>
    import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
    // import SearchBar from "../components/SearchBar.vue";
    import axios from 'axios'
    import { collection, getDocs, query } from "firebase/firestore";

    import { db } from '../firebase/index.js'
    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
</script>

<template>
    <div class="row">
        <div class="col-1"></div>
        <div class="container m-3 col-10">
            <!-- map centered in singapore for now -->
            <GoogleMap 
                api-key="AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE" 
                style="width: 100%; 
                height: 500px"
                :center="userLocation" 
                :zoom="12" 
                >
                <!-- user location marker, restyle this   -->
                <Marker :options="{ position: userLocation, icon: image }">
                    <!-- //nest information inside  -->
                </Marker>

                other markers
                <Marker :options="{ position: {lat: listing.info.Location.latitude, lng: listing.info.Location.longitude} }" v-for="listing in foodItemsFiltered"/>

                <!-- <InfoWindow :options="{ position: center, content: 'Hello World!' }" />
                <InfoWindow :options="{ position: { lat: 1.290270, lng: 103.851959 } }"> Content passed through slot </InfoWindow> -->
            </GoogleMap>           
            <br> 

            <!-- search bar  -->
            <div class="input-group">
                <input 
                    type="search" 
                    class="form-control bg-secondary-subtle" 
                    placeholder="Find the food you want!" 
                    v-model="searchQuery"
                    @keyup.enter="loadFood()"
                />
                <button class="btn text-bg-listing d-flex align-items-center justify-content-center" type="button" id="button-addon2" >
                <!-- <i class="search"></i> -->
                    <img src="../components/icons/search.jpeg" class="img-fluid" style="width:20px; color: white;"
                />
                </button>
            </div>
<!-- 
            <div class="row">
                Distance (in KM): <input type="number" class="" v-model="filterDistance">
            </div> -->

            <div class="row slidecontainer">
            Distance (in KM): {{ filterDistance }}
                <input type="range" min="1" max="100" v-model="filterDistance" class="slider" id="myRange">
            </div>

        </div>    
        <div class="col-1" >
            
        </div>
    </div>
  </template>

  <!-- 
    docs: https://www.npmjs.com/package/vue3-google-map
    need: 
    - geolocation API  
   -->
  
  <script>
    import { defineComponent } from "vue";
    
    export default {
        mounted(){
            this.getUserLocation(),
            this.getAllFood()
        },
        data(){
            return {
                filterDistance: 0,
                searchQuery: '',
                userLocation: '',
                foodItems: [],
                foodItemsFiltered: [],
                coord: { lat: 1.290270, lng: 103.851959 },
                key: 'AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE',
                // center: { lat: 1.290270, lng: 103.851959 } // center on singapore for now -> CHANGE TO user's current location (https://www.youtube.com/watch?v=KARBEHUyooM)
            }
        },
        // computed:{
        //     coordinates(){
        //         return this.getCoordinates()
        //     },
        //     userLocation(){
        //         return this.getUserLocation()
        //     }

        // },
        methods: {
            getCoordinates() {
                const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.key}&address=${this.searchQuery}`;

                console.log(url)

                axios.get(url)
                .then(
                    response => {
                        console.log(response)

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
                this.getUserLocation()
            },
            getUserLocation(){
                const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${this.key}`
                axios.post(url)
                .then(
                    response => {
                        console.log('location', response)
                        const data = response.data
                        // this.userLocation = data.location

                        console.log('userLocation', data.location)
                        this.userLocation = data.location
                        // console.log('update', this.userLocation)
                    }   
                )

                .catch(
                    error => {
                        console.log(error)
                    }
                )
            },
            async getAllFood(){

                const q = query(collection(db, "listings"));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data().Location);

                let distanceToUser = Number.parseFloat(this.calculateDistance(this.userLocation.lat, this.userLocation.lng, doc.data().Location.latitude, doc.data().Location.longitude).toFixed(3))
                this.foodItems.push({
                    listingId: doc.id,
                    info: doc.data(),
                    distance: distanceToUser // straight line distance from user location to food location
                })
                });

                // console.log(this.foodItems[0])
            },
            calculateDistance(userLat, userLong, foodLat, foodLong) {
                const earthRadius = 6371; // Radius of the Earth in kilometers

                // Convert latitude and longitude from degrees to radians
                const radLat1 = (Math.PI * userLat) / 180;
                const radLon1 = (Math.PI * userLong) / 180;
                const radLat2 = (Math.PI * foodLat) / 180;
                const radLon2 = (Math.PI * foodLong) / 180;

                // Haversine formula
                const dLat = radLat2 - radLat1;
                const dLon = radLon2 - radLon1;
                const a =
                    Math.sin(dLat / 2) ** 2 +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
                const c = 2 * Math.asin(Math.sqrt(a));

                // Calculate the distance
                const distance = earthRadius * c; // Result in kilometers

                return distance;
            },
            filterByDistance(foodArr){
                var result = []


                for(var i=0;i<foodArr.length;i++) {
                    var food = foodArr[i]
                    if (food.distance <= this.filterDistance){
                        console.log('wothin range')
                        result.push(food)
                    }
                }

                console.log(result)
                return result
            },
            filterByName(foodArr){
                var result = []
                var query = this.searchQuery.toLowerCase()

                for(var i=0;i<foodArr.length;i++) {
                    let itemName = foodArr[i].info.ListingName
                    let itemNameArr = itemName.split(" ")

                    for(let word of itemNameArr){
                        word = word.toLowerCase()
                    }

                    // console.log()
                    console.log('arr', itemNameArr, 'query', query)

                    if (itemNameArr.includes(query)){
                        console.log('true')
                        result.push(foodArr[i])
                    }
                }

                console.log(result)
                return result
            },

            loadFood(){
                console.log('foodItems', this.foodItems)
                this.foodItemsFiltered = this.filterByDistance(this.filterByName(this.foodItems))
                console.log(this.foodItemsFiltered)
            }
        }
            
    };
  </script>
  
 
<!-- 
    outstanding: connect to firestore and query food items 
        - get location of food and plot onto the map 
        - 
 -->