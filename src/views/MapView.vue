<script setup>
    import { getAllListings, filterByDistance, filterByName, calculateDistance, getListing, getAllUsernames } from "../firebase/api"
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
                <Sidebar id ='sideBarComponent' v-model:visible="visible" :modal="false" :position="sideBarPosition" :dismissable="false" :blockScroll="true">
                        <h2 style="color: #212529">Listing Information</h2>

                        <div class="container-fluid">

                            <div class="card h-100">
                                    <img
                                        :src="selected.info.details.ImageUrls[0]"
                                        alt=""
                                        class="card-img-top"
                                    />
                                    <div class="card-body border-top">
                                        <h5 class="card-title overflow-text">
                                            <span style="color:#212529">Listing Name:</span> <br/>
                                            <span class="listingName pb-2">{{ selected.info.details.ListingName }}</span>
                                        </h5>
                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary overflow-text"
                                        >
                                            Category:
                                            {{ selected.info.details.Category }} 
                                            <br/>
                                            Lister: {{ selected.Owner }}
                                        </h6>
                                        <p
                                            class="card-text d-flex align-items-center mb-3"
                                        > Location: 
                                            {{selected.info.details.Location.name}}
                                            <br/>
                                            Price: ${{ selected.info.details.Price }}
                                            <br />
                                            Quantity Available: {{ selected.info.details.QtyAvailable }}
                                            <br/>
                                            Distance: {{ selected.distance.toFixed(2) }}km
                                        </p>
                                        <router-link
                                                :to="{
                                                    name: 'listing',
                                                    query: { Id: selected.info.Id },
                                                }"
                                                style="padding: 0px"
                                            >
                                        <Button label="View more..." outlined style="border-radius:4px; width: 100%" class="my-2"></Button>
                                        </router-link>

                                        <Button
                                        @click="loadDirections" class="d-flex justify-content-center w-100" style="border-radius:4px">
                                            <Icon icon="material-symbols:directions" color="#ffffff"  width="19.5" height="19.5" class="me-1"/>
                                            Get Directions
                                        </Button>
                                        
                                    </div>
                                </div>

                            <div class="card border-none mt-5" v-if="displayDirections">
                                <hr class="mt-0 mb-3"/>
                                <div>
                                    <h2 class="mb-0" ref="gettingThere">Getting there</h2>
                                </div>
                                
                                <div class="card-body py-0">
                                    
                                        <div class="row ">
                                            <p class="card-title ps-0 mb-0">Transport Mode:</p>
                                        </div>
                                       
                                        <div class="row ps-0">
                                            <div id="travelGrp" class="p-0">
                                              
                                                <select 
                                                    id="transportMode"
                                                    @change="loadDirections" 
                                                    v-model="routeRequest.travelMode" 
                                                    class="form-select form-select-sm"
                                                    >
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
                                    <Button @click="loadByDistance"
                                    id="goButton"
                                    :pt="{ 
                                            root: { class: 'p-button-sm bg-green-600 border-green-400 rounded' } 
                                        }">
                                        <Icon id="searchTextButton" icon="ic:sharp-my-location" width="20" height="20" />
                                        <span class="ms-2" >Go!</span>
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
        async mounted(){
            this.users = await getAllUsernames();    
            this.listingId = this.$route.query.Id;
            if (this.listingId){
                this.loadSingleListing()
            }

            window.addEventListener('resize', () => {
                this.viewportWidth = window.innerWidth;
            });

            document.addEventListener('click', function(event) {
                // Check if the click event's target is not the element you're watching
                if (event.target !== document.getElementsByClassName('Sidebar')[0]) {
                    this.displayDirections = false
                } 
            });
        },
        data(){
            return {
                viewportWidth: window.innerWidth,
                sideBarPosition: 'left',

                //primevue variables
                visible: false,
                modal: false,
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
                markers: [],
                listingId: null,
                users: null,
                
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
        },
        methods: {
            // map functions 
            async initMap(){

                // loads user location into the routeRequest object
                this.routeRequest.origin = this.currentUserLocation 

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

                if (this.routeRequest.destination != null){
                    this.map.setCenter(this.routeRequest.destination)
                }

                this.map.setZoom(this.zoom)

                this.map.addListener('zoom_changed', () => {
                    this.zoom = this.map.getZoom()
                })

                if (this.foodItemsFiltered.length > 0){
                    for(let i=0;i<this.foodItemsFiltered.length; i++){

                        let item = this.foodItemsFiltered[i]

                        const latitude = item.info.details.Location.latitude
                        const longitude = item.info.details.Location.longitude
                        item.Owner = this.users[item.info.details.Owner]

                        let newMarker;

                        if (this.listingId){
                                newMarker = new marker.Marker({
                                position: { lat: latitude, lng: longitude},
                                map: this.map,   
                                animation: google.maps.Animation.BOUNCE 
                            })

                        } else {
                            // console.log('selected', this.selected)
                            if (this.selected != null && this.markers[i].id == this.selected.info.Id){
                                // console.log(this.markers[i].id, this.selected.info.Id)
                                newMarker = new marker.Marker({
                                position: { lat: latitude, lng: longitude},
                                map: this.map,   
                                animation: google.maps.Animation.BOUNCE 
                            })
                            } else {
                                    newMarker = new marker.Marker({
                                    position: { lat: latitude, lng: longitude},
                                    map: this.map, 
                                })  
                            }
                        }
                        

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
                        this.markers.push({id: item.info.Id, marker: newMarker})
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
                this.loadRoute();
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.gettingThere.scrollIntoView({ behavior: 'smooth',  block: 'start' });
                    }, 350);
                });
            },
            
            //loading food functions
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
                this.clearMarkers();
                this.listingId = null;
                this.selected = null;
                this.searchQuery = foodName
                this.foodItemsFiltered = filterByName(this.foodItems, this.searchQuery)
                window.scrollTo(0, 0);
            },

            loadByDistance(){
                this.clearMarkers();
                this.listingId = null;
                this.selected = null;
                this.foodItemsFiltered = filterByDistance(this.foodItems, this.filterDistance);
                window.scrollTo(0, 0);
            },

            clearMarkers() {
                for (let i = 0; i < this.markers.length; i++) {
                    this.markers[i].marker.setMap(null);
                }
                this.markers = [];
            },
            
            async loadSingleListing(){

                let item = await getListing(this.listingId)
                const owner = this.users[item.Owner];

                
                let listing = {
                    distance: Number.parseFloat(calculateDistance(this.currentUserLocation.lat, this.currentUserLocation.lng, item.Location.latitude, item.Location.longitude).toFixed(3)),
                    info: {
                            Id: this.listingId,
                            details: item
                    },
                    Owner: owner,
                }

                this.selected = listing
                this.foodItemsFiltered.push(listing)

                this.routeRequest.destination = { 
                    lat: item.Location.latitude, 
                    lng: item.Location.longitude
                }

                this.loadDirections()
            },

            removeBounce(){
                for (let mk of this.markers){
                    if (mk.marker.getAnimation() != null){
                        window.setTimeout(() => {
                            mk.marker.setAnimation(null)
                        }, 50)
                    }
                }
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
            viewportWidth:{
                handler(){
                    if (this.viewportWidth < 768){
                        this.sideBarPosition = 'bottom'
                    } else {
                        this.sideBarPosition = 'left'
                    }
                }
            },
            visible:{
                handler(){
                   this.removeBounce()
                }
            }
        }
    }
</script>

<style scoped>
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

  #goButton {
    width: 15%;
  }

}

@media (max-width: 576px) {

    #searchTextButton {
        display: none;
    }

    #goButton {
    width: 15%;
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
    background-color: #EEEEEE; 
    border-radius: 4px; 
    border: none;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.card-title{
    padding: 8px 0;
    margin-bottom: 10px;
}

.card-subtitle{
    margin-bottom: 5px;
    padding-bottom: 5px;
}

.card-text{
    background-color: #F5F5F5;
    padding: 10px;
    height: 55%;
    border-radius: 8px;
}

.overflow-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:#558C03;
}

</style>
