<script setup>

    import { getAllListings, filterByDistance, filterByName, calculateDistance } from "../firebase/api"
    import { Loader } from '@googlemaps/js-api-loader'
    import { mapGetters } from 'vuex'

</script>

<template>
    <div class="row">
        <div class="col-1"></div>
        <div class="container m-3 col-10">

            <div id="map" style="height:600px"></div>

            <div class="row m-3">
                <div class="col-2">
                    <h5>Transport Mode:</h5>
                </div>

                <div class="col-6">
                <div id="travelGrp" role="group" aria-label="Basic example" style="display:inline">
                    <button id='transit'  @click="toggle=>{this.routeRequest.travelMode='TRANSIT'; }">Transit</button>
                    <button id='driving' @click="toggle=>{this.routeRequest.travelMode='DRIVING'; }">Drive</button>
                </div>
            </div>
            </div>
           

           
            
            <!-- search bar  -->
                <!-- pass props here  -->
            <searchBar />

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
  </template>

  <script>
    export default {
        mounted(){
            // getUserLocation(),
            this.initMap()
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

                // map variables
                mapOptions: {
                    // center: { lat: 1.3565952, lng: 103.851959 },
                    center: this.currentUserLocation,
                    zoom: 12,
                    provideRouteAlternatives: true,
                    gestureHandling: 'cooperative'
                },
                map: null,
                core: null,
                loader: null,
                directionsService: null,
                directionsRenderer: null,
                routeRequest: {
                                origin: {},
                                destination: { lat: 1.350270, lng: 103.901959 },
                                travelMode: 'TRANSIT',
                                transitOptions: {  
                                                modes: ['BUS', 'TRAIN']
                                },
                                drivingOptions: {
                                                departureTime: new Date(Date.now()),
                                                trafficModel: 'optimistic'
                                                },
                                provideRouteAlternatives: true,
                                // unitSystem: 'METRIC',
                            },
                userMarker: {
                            path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                            fillColor: "blue",
                            fillOpacity: 1,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                        }
            }
        },
        // props: {
        //         'apiKey': String,
        //         'foodItemsFilteredArr': Array, 
        //         'userLocationObj': Object,
        //         'listingArr': Array
        // },
        
        computed :{
            ...mapGetters(['currentUserLocation'])
        },
        methods: {
            // map functions 
            async initMap(){
                this.routeRequest.origin = this.currentUserLocation // loads user location into the routeRequest object
                //load destination into the routeRequest object here 

                this.loader = new Loader({ 
                                            apiKey: this.key,
                                            version: "weekly",
                                        })
                const map = await this.loader.importLibrary('maps')

                const marker = await this.loader.importLibrary('marker')
                const routes = await this.loader.importLibrary('routes')

                this.core = await this.loader.importLibrary('core')

                this.map = new map.Map(document.getElementById("map"), this.mapOptions);
                // this.createTravelButtons()

                this.directionsService = new routes.DirectionsService();
                this.directionsRenderer = new routes.DirectionsRenderer();

                if (this.routeRequest){
                    // this.directionsRenderer.setMap(this.map);
                    this.loadRoute()
                }

                //plot user location
                new marker.Marker({
                    position: this.currentUserLocation,
                    map: this.map,
                    icon: this.userMarker
                
                });

                //load filtered food items 

                // console.log('foodItemsFiltered', this.foodItemsFiltered)
                if (this.foodItemsFiltered.length > 0){
                    for(const item of this.foodItemsFiltered){

                        let contentString = `<div class="card">
                                                <img src='${ item.info.details.ImageUrls[0] }' class="card-img-top" alt="...">

                                                <div class="card-body">
                                                    <h5 class="card-title">${ item.info.details.ListingName }</h5>
                                                    <ul>
                                                        <li>Category: ${item.info.details.Category}</li>
                                                        <li>Expiry Date: ${ item.info.details.ExpiryDate.toDate() }</li>
                                                        <li>Perishable: ${ item.info.details.Perishable ? "Yes": "No" }</li>
                                                        <li>Price: ${ item.info.details.Price }</li>
                                                        <li>Quantity Available: ${ item.info.details.QtyAvailable }</li>
                                                    </ul>                                
                                                    <a href="#" class="btn btn-link">View more...</a>
                                                </div>
                                            </div>`

                        const latitude = item.info.details.Location.latitude
                        const longitude = item.info.details.Location.longitude

                        // add routing options here 

                        let newMarker = new marker.Marker({
                            position: { lat: latitude, lng: longitude},
                            map: this.map,                    
                        })

                        let info = new map.InfoWindow({
                            content: contentString,
                            anchor: newMarker,
                            options: {
                                maxWidth: 300,
                                minWidth: 100,
                                zIndex: 999
                                 }
                        });

                        newMarker.addListener("click", () => {
                            // console.log('heard')
                            info.open(
                                {
                                anchor: newMarker,
                                map,
                            }
                            );
                        });
                    }
                }
                
            },

            loadRoute(){

                if (this.directionsService != null){

                    var route = this.directionsService.route(this.routeRequest, (result, status) => {
                        if (status == 'OK') {
                        
                            this.directionsRenderer.setMap(this.map);
                            this.directionsRenderer.setDirections(result);

                        }
                    })
                }

            },

            createTravelButtons() {
            const transitControl = document.getElementById("travelGrp"); 
            // console.log('btns created', this.map)
            this.map.controls[this.core.ControlPosition.TOP_CENTER].push(transitControl);
            },

            //other functions 
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
                console.log('filtered', this.foodItemsFiltered)
            }
        },
        watch:{
        routeRequest:{
            handler(){
                this.initMap()
                // this.createTravelButtons()
            },
            deep: true
        },
        foodItemsFiltered:{
            handler(){
                this.initMap()
                // this.createTravelButtons()
            },
            deep: true
        },
        
    },
}
            
  </script>

<style>
    .text-bg-listing {
    background-color: #558C03;
    color: white;
}
</style>
