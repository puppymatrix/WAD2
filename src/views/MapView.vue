<script setup>
    import { getAllListings, filterByDistance, filterByName, calculateDistance, getListing } from "../firebase/api"
    import { Loader } from '@googlemaps/js-api-loader'
    import { mapGetters } from 'vuex'

    import { Icon } from '@iconify/vue'

    import Searchbar from '../components/SearchBar.vue'
</script>

<template >
    <div class="container-fluid d-flex justify-content-center">
            <div class='col-3' id = 'buffer' v-if="visible == true && sideBarPosition == 'left'" ></div>
            <div class="col col-sm-9">
                    <!-- sidebar for more info  -->
                <Sidebar 
                    id ='sideBarComponent' 
                    v-model:visible="visible" 
                    :modal="sidebarOptions.modal" 
                    :dismissable="sidebarOptions.dismissable" 
                    :position="sideBarPosition" 
                    >
                        <h2 style="color: #212529">Listing Information</h2>

                        <div class="container-fluid">

                            <div class="card">
                                
                                <img id="carousel" :src="selected.info.details.ImageUrls[0]" alt="" v-if="selected.info.details.ImageUrls.length == 1" style="height: 300px">

                                <BCarousel id="carousel" controls indicators imgHeight="300px" v-else>
                                    <BCarouselSlide v-for="photos in selected.info.details.ImageUrls" :img-src="photos" />
                                </BCarousel>
                               
                                <div class="card-body">

                                    <h5 class="card-title">{{ selected.info.details.ListingName }}</h5>

                                    <li>Category: {{ selected.info.details.Category }}</li>
                                    <li>Expiry Date: {{ selected.info.details.ExpiryDate.toDate() }}</li>
                                    <li>Perishable: {{ selected.info.details.Perishable ? "Yes": "No" }}</li>
                                    <li>Price: {{ selected.info.details.Price }}</li>
                                    <li>Quantity Available: {{ selected.info.details.QtyAvailable }}</li>
                                    <div class="row">
                                        <router-link
                                                :to="{
                                                    name: 'listing',
                                                    query: { Id: selected.info.Id },
                                                }"
                                                style="padding: 0px"
                                            >
                                        <Button label="View more..." outlined style="border-radius:4px; width: 100%" class="my-2"></Button>
                                        </router-link>

                                        <Button :pt="{ button: 'bg-green-600 border-green-600'}"
                                        @click.prevent="loadDirections" class="d-flex justify-content-center" style="border-radius:4px">
                                            <Icon icon="material-symbols:directions" color="#ffffff"  width="19.5" height="19.5" class="me-1"/>
                                            Get Directions
                                        </Button>
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="card border-none" v-if="displayDirections">

                                <div class="card-title">
                                    <h2 class="mt-5 mb-0">Getting there</h2>
                                </div>
                                
                                <div class="card-body py-0">
                                    
                                    <div class="row ">
                                        <p class="card-title ps-0">Transport Mode:</p>
                                    </div>
                                    
                                    <div class="row ps-0">
                                        <div id="travelGrp" class="p-0">
                                            
                                            <select 
                                                id="transportMode"
                                                @change="loadDirections" 
                                                v-model="routeRequest.travelMode" 
                                                class = "btn btn-outline-success w-100 text-center text-white" 
                                                >
                                                <!-- inline object literal -->
                                                <option :value="mode" v-for="mode in travelModeOptions"
                                                >{{ mode }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="card-body p-0">
                                    <div id="sideBar" class="p-0"></div>
                                </div>
                            </div>
                            
                        </div>
                    </Sidebar>
                    
                <div class="row justify-content-center" >
                    <div id="map" style="height:600px" class="col-10">
                        <Skeleton
                            height="600px"
                        ></Skeleton></div>
                </div>
            
                <div class="row justify-content-center">
                    <div class="col-10 mt-3">
                        <div class="row justify-content-center align-items-center" style="background-color: #F6FBF6;">
                            <div class="col-2">
                                <h6 class = "text-right" style="color: #212529">Filter by: </h6>
                            </div>
                            <div class="col-6">
                                <Dropdown 
                                    v-model="filterBy" 
                                    :options="filterOptions" 
                                    optionLabel="label" 
                                    optionValue="value" 
                                    placeholder="Find food by:" 
                                    style="width: 100%"
                                >
                                    <template #option="slotProps">
                                        <div class="p-d-flex p-ai-center">
                                            <Icon :icon="slotProps.option.icon" width="20" height="20" class="p-mr-2" />
                                            {{ slotProps.option.label }}
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                        visible: {{ visible }} directions: {{ displayDirections }}
                        <div class="row justify-content-center align-items-center" style="background-color: #d7e5d7" v-if="filterBy == 'DISTANCE'">
                            <div id='filterBar' class="col-md-3 d-flex justify-content-center align-items-center">
                                <h6 class="m-3">Distance (in KM): </h6>
                                <span class="badge" style="background-color: #419544">{{ filterDistance }}</span>
                            </div>
                            <div class="col-md-5 my-2">
                                <div class="container">
                                    <Slider type="range" :min=1 :max=50 v-model="filterDistance" 
                                    :pt="{root: {class: 'bg-white'}}"/>
                                </div>
                            </div>
                            <div class="col-md-2 my-1 d-flex justify-content-center">
                                <Button @click.prevent="loadByDistance"
                                :pt="{ 
                                        root: { class: 'p-button-sm bg-green-600 border-green-400 rounded' } 
                                    }">
                                    <Icon icon="ic:sharp-my-location" width="20" height="20" />
                                    <span class="ms-2" id="searchTextButton">Go!</span>
                                </Button>
                            </div>
                        </div>
                        <div class="row mt-2" v-else>
                            <SearchBar @search="loadFoodByName" class="m-0 ps-0"/>
                        </div>
                    </div>
                </div>
            </div>
    </div> 
</template>

<script>
    export default {
        async created(){
            await this.initMap()
            await this.loadFood()
        },
        mounted(){
            if (this.$route.query.Id){
                this.loadSingleListing()
            }

            window.addEventListener('resize', () => {
                this.viewportWidth = window.innerWidth;
            });

            // document.addEventListener('click', function(event) {
            //     // Check if the click event's target is not the element you're watching
            //     console.log(event.target)
            //     if (event.target != document.getElementsByTagName('Sidebar')[0]) {
            //         if (event.target != document.getElementById('map')){
            //             this.displayDirections = false
            //         }
            //     } 
            // });
        },
        data(){
            return {
                viewportWidth: window.innerWidth,

                //primevue variables
                visible: false,
                sidebarOptions:{
                    modal: false,
                    dismissable: false
                },
                travelModeOptions: [
                                    'TRANSIT', 'DRIVING', 'WALKING'
                                ],
                displayDirections: false,
                filterBy: 'DISTANCE',
                filterOptions: [
                                {label: 'Distance', value: 'DISTANCE', icon: 'material-symbols:distance'}, 
                                {label: 'Name', value: 'NAME',icon: 'mdi:food'}
                            ],

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
                    zoom: 11,
                    provideRouteAlternatives: true,
                    gestureHandling: 'cooperative',
                    mapId: '7fb5f582643b9459',
                },
                // travelMode: 'TRANSIT',
                map: null,
                core: null,
                loader: null,
                zoom: 11,
                directionsService: null,
                directionsRenderer: null,
                routeRequest: {
                    origin: null,
                    destination: null,
                    travelMode: 'TRANSIT',
                    transitOptions: {  
                                    modes: ['BUS', 'TRAIN']
                    },
                    drivingOptions: {
                                    departureTime: new Date(Date.now()),
                                    trafficModel: 'optimistic'
                                    },
                    provideRouteAlternatives: false,
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
            ...mapGetters(['currentUserLocation']),
            sideBarPosition(){
                if (this.viewportWidth < 768){
                    return 'bottom'
                } else {
                    return 'left'
                }
            },
        },
        
        methods: {
            // map functions 
            async initMap(){

                this.routeRequest.origin = this.currentUserLocation // loads user location into the routeRequest object

                this.loader = new Loader({ 
                    apiKey: this.key,
                    version: "beta",
                })
                const map = await this.loader.importLibrary('maps')
                
                const unloadedMap = new map.Map(document.getElementById("map"), this.mapOptions);   
                
                

                const marker = await google.maps.importLibrary('marker')
                const routes = await google.maps.importLibrary('routes')

                this.directionsService = new routes.DirectionsService();
                this.directionsRenderer = new routes.DirectionsRenderer();

                const parser = new DOMParser()
                const pinSvg = parser.parseFromString(
                    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>',
                    'image/svg+xml'
                ).documentElement

                //add user location marker
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

                this.map = unloadedMap

                this.map.setZoom(this.zoom)

                this.map.addListener('zoom_changed', () => {
                    this.zoom = unloadedMap.getZoom()
                    console.log(this.zoom)
                })

                //add food markers
                if (this.foodItemsFiltered.length > 0){
                    for(let i=0;i<this.foodItemsFiltered.length; i++){

                        let item = this.foodItemsFiltered[i]

                        const latitude = item.info.details.Location.latitude
                        const longitude = item.info.details.Location.longitude

                        
                        let newMarker = new marker.Marker({
                            position: { lat: latitude, lng: longitude},
                            map: this.map,     
                        })

                        newMarker.addListener("click", () => {

                            this.selected = item    
                            this.visible = true

                            if (this.displayDirections){
                                this.displayDirections = false
                            }
                            
                            this.routeRequest.destination = { 
                                lat: item.info.details.Location.latitude, 
                                lng: item.info.details.Location.longitude
                            }
                        });
                        }
                    }
            },

            loadRoute(){

                if (this.directionsService != null){
                    this.directionsService.route(this.routeRequest, (result, status) => {
                        if (status == 'OK') {
                            var sideBar = document.getElementById("sideBar")
                            this.directionsRenderer.setMap(this.map);
                            this.directionsRenderer.setDirections(result);
                            sideBar.innerHTML = '';
                            this.directionsRenderer.setPanel(sideBar)
                        } else {
                            console.log(status)
                        }
                    })
                }
            },

            loadDirections(){
                if (this.selected != null){
                    this.visible = true
                    this.displayDirections = true
                }
                this.loadRoute()
            },
            
            async loadFood(){

                const data = getAllListings()
                data.then(
                    listing => {
                    
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

            loadFoodByName(foodName){
                this.searchQuery = foodName
                this.foodItemsFiltered = filterByName(this.foodItems, this.searchQuery)
            },

            loadByDistance(){
                this.foodItemsFiltered = filterByDistance(this.foodItems, this.filterDistance)
            },
            
            async loadSingleListing(){
                let item = await getListing(this.$route.query.Id)
                
                let listing = {
                    distance: Number.parseFloat(calculateDistance(this.currentUserLocation.lat, this.currentUserLocation.lng, item.Location.latitude, item.Location.longitude).toFixed(3)),
                    info: {
                            Id: this.$route.query.Id,
                            details: item
                        }
                    }

                this.selected = listing
                this.foodItemsFiltered.push(listing)

                this.routeRequest.destination = { 
                    lat: item.Location.latitude, 
                    lng: item.Location.longitude
                }

                this.loadDirections()
            },
            
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
           
        }
    }

        
</script>

<style>

.img {
    background-size: cover; 
    background-position:center; 
    max-height: 400px;
}

#filterBar {
  font-size: calc(1rem + 0.1vw);
  padding-right:2%
}

.Sidebar {
    width: 25%
}

@media (min-width: 768px) {
  #filterBar {
    font-size: 1.5rem;
  }

  .Sidebar {
    width: 100%;
    height: 200%
  }
}

@media (max-width: 768px) {
    #searchTextButton {
    display: none
  }
}

@media (max-width: 983px){
    .p-button.p-component {
        width: 100%;
        border: 1px solid #ced4da
    }

    #travelGrp {
        width: 100%
    }

    #carousel {
        max-height: 200px
    }
}

#transportMode {
    background-color: #4CAF50; 
    border-radius: 4px; 
    border: none
}








</style>
