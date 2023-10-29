<script setup>

    import { getAllListings, filterByDistance, filterByName, calculateDistance } from "../firebase/api"
    import { Loader } from '@googlemaps/js-api-loader'
    import { mapGetters } from 'vuex'
    import  SearchBar  from '../components/SearchBar.vue'
    import { faPerson } from '@fortawesome/free-solid-svg-icons'
    import  Sidebar from 'primevue/sidebar';
    import Slider from 'primevue/slider';
    import SelectButton from 'primevue/selectbutton';

</script>

<template>
    <div class="row">
        <div class="col-1"></div>
        <div class="container m-3 col-10">

            <div class="row justify-content-center">

            <!-- <div class="card flex justify-content-center"> -->
                <Sidebar v-model:visible="visible" :modal="false">
                    <h2>Listing Information</h2>

                    <div class="container-fluid">

                        <div class="card">
                            <div id="carouselExample" class="carousel slide">
                                <div class="carousel-inner"
                                    v-for="(url, index) in selected.info.details.ImageUrls" :key="index" 
                                    :class="index == 0 ? 'carousel-item active' : 'carousel-item'" style="">                
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
                                <h5 class="card-title">{{ selected.info.details.ListingName }}</h5>
                                    <li>Category: {{ selected.info.details.Category }}</li>
                                    <li>Expiry Date: {{ selected.info.details.ExpiryDate.toDate() }}</li>
                                    <li>Perishable: {{ selected.info.details.Perishable ? "Yes": "No" }}</li>
                                    <li>Price: {{ selected.info.details.Price }}</li>
                                    <li>Quantity Available: {{ selected.info.details.QtyAvailable }}</li>
                                <a href="#" class="btn btn-link">View more...</a>
                            </div>
                        </div>
                    </div>
                </Sidebar>

                <div id="map" style="height:400px" class="col-10"></div>
            </div>
           
            <div class="row ">
                <div class="container col-8">
                    <div class="row">
                            <div class="col-3 d-flex align-items-center">
                                <h5>Transport Mode:</h5>
                            </div>

                            <div class="col-6">
                                <div id="travelGrp">
                                    <SelectButton v-model="this.routeRequest.travelMode" :options="travelModeOptions" 
                                    aria-labelledby="basic" 
                                    :pt="{
                                    button: ({ context }) => ({
                                        class: context.active ? 'bg-green-600 border-green-400' : undefined
                                    })
    }"
                                    />
                                    
                                </div>
                </div>

                <SearchBar @search="loadFoodByNameAndDistance" class="m-0"/>

            </div>
            <!-- search bar  -->

            <div class="row justify-content-left align-items-center" >
                <div class="col-3">
                    <h6>Distance (in KM): {{ filterDistance }}</h6>
                </div>
                
                <div class="col-5 d-flex ">
                    <Slider type="range" home=1 end=100 v-model="filterDistance" id="myRange" class="w-28rem"/>
                </div>

                <div class="col-3">
                    <button @click="loadByDistance" class = "btn btn-secondary">Food Nearby</button>
                </div>
            </div>

            <div class="row">
                <div class="col-2">
                </div>
                <div class="col-10"></div>
            </div>
                </div>
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
                //primevue varibales
                visible: false,
                modal: false,
                travelModeOptions: ['TRANSIT', 'DRIVING'],

                //food loading variables
                filterDistance: 10,
                searchQuery: '',
                foodItems: [],
                foodItemsFiltered: [],
                key: 'AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE',
                selected: null,

                // map variables
                mapOptions: {
                    center: { lat: 1.3565952, lng: 103.851959 },
                    zoom: 12,
                    provideRouteAlternatives: true,
                    gestureHandling: 'cooperative',
                    mapId: '7fb5f582643b9459'
                },
                map: null,
                core: null,
                loader: null,
                directionsService: null,
                directionsRenderer: null,
                routeRequest: {
                    origin: null,
                    destination: null,
                    travelMode: 'DRIVING',
                    transitOptions: {  
                                    modes: ['BUS', 'TRAIN']
                    },
                    drivingOptions: {
                                    departureTime: new Date(Date.now()),
                                    trafficModel: 'optimistic'
                                    },
                    provideRouteAlternatives: true,
                },
               

            }
        },
        props: {
                'apiKey': String,
                'foodItemsFilteredArr': Array, 
                'userLocationObj': Object,
                'listingArr': Array
        },
        
        computed :{
            ...mapGetters(['currentUserLocation'])
        },
        methods: {
            // map functions 
            async initMap(){
                this.routeRequest.origin = this.currentUserLocation // loads user location into the routeRequest object

                this.loader = new Loader({ 
                    apiKey: this.key,
                    version: "weekly",
                    libraries: ["places", , "marker", "maps", "routes"]
                })
                const map = await this.loader.importLibrary('maps')


                const unloadedMap = new map.Map(document.getElementById("map"), this.mapOptions);    
                       
                const marker = await this.loader.importLibrary('marker')

                // const animation = await this.loader.importLibrary('marker')

                // const anim = await animation.Animation.DROP
                
                if (this.routeRequest.destination){
                    console.log('adr')
                    const routes = await this.loader.importLibrary('routes')

                    this.directionsService = new routes.DirectionsService();
                    this.directionsRenderer = new routes.DirectionsRenderer();
                    this.loadRoute()
                }
               
                const parser = new DOMParser()
                const pinSvg = parser.parseFromString(
                    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>',
                    'image/svg+xml'
                ).documentElement

                console.log(faPerson)
                const icon = document.createElement('div')
                icon.innerHTML = '<svg  />'
                const faPin = new marker.PinElement({
                    scale: 1.25,
                    glyph: pinSvg,
                    background: "#0033FF",
                    borderColor: "#0033FF",
                })
                var advMarker = new marker.AdvancedMarkerElement({
                    map: unloadedMap,
                    position: this.currentUserLocation,
                    content: faPin.element,
                    title: 'user location',


                })
                this.map=unloadedMap
                console.log('advMarker', advMarker)

                //load filtered food items 
                console.log('foodItemsFiltered', this.foodItemsFiltered)
                if (this.foodItemsFiltered.length > 0){
                    for(const item of this.foodItemsFiltered){

                        console.log('item', item)
                        const latitude = item.info.details.Location.latitude
                        const longitude = item.info.details.Location.longitude

                        // add routing options here 

                        let newMarker = new marker.Marker({
                            position: { lat: latitude, lng: longitude},
                            map: this.map,                    
                        })

                        newMarker.addListener("click", () => {
                            console.log(this.routeRequest.origin, this.routeRequest.destination)
                            this.selected = item    
                            this.visible = true
                            this.routeRequest.destination = { 
                                lat: item.info.details.Location.latitude, 
                                lng: item.info.details.Location.longitude
                            }
                        });
                    }
                }
                
            },

            loadRoute(){

                console.log('origin:', this.routeRequest.origin, 'destination:', this.routeRequest.destination)
                if (this.directionsService != null){

                    var route = this.directionsService.route(this.routeRequest, (result, status) => {
                        if (status == 'OK') {
                            console.log('result', result)
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
                        console.log('all food loaded', listing)
                    
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

            loadFoodByNameAndDistance(foodName){
                console.log('received', `search query: ${this.searchQuery}`)
                this.searchQuery = foodName
                this.foodItemsFiltered = filterByDistance(filterByName(this.foodItems, this.searchQuery), this.filterDistance)
                console.log('filtered by name and distance', this.foodItemsFiltered)
            },

            loadByDistance(){
                this.foodItemsFiltered = filterByDistance(this.foodItems, this.filterDistance)
                console.log('filtered by distance', this.foodItemsFiltered)
            }
        },
        watch:{
            routeRequest:{
                handler(){
                    this.initMap()
                },
                deep: true
            },
            foodItemsFiltered:{
                handler(){
                    this.initMap()
                }
            },
            mapOptions:{
                handler(){
                    this.initMap()
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
.img {
    background-size: cover; 
    background-position:center; 
    max-height: 400px;
}

</style>
