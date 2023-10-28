<script setup>
/* eslint-disable no-undef */
    import { onUnmounted, onMounted, ref } from 'vue'
    import { Loader } from '@googlemaps/js-api-loader'
    import { mapGetters } from "vuex";
</script>

<template>
    {{ routeRequest.travelMode }}

    <div class="row justify-content-center" >
        <div class="container col-8 m-3">
            <div id="map" style="height:600px" ></div>
            <!-- <select name="travelMode" id="" v-model="travelMode">
                <option value="BUS">Bus</option>
                <option value="DRIVING">Car</option>
            </select>             -->

            <div id="travelGrp" role="group" aria-label="Basic example">
                <button id='transit'  @click="toggle=>{this.routeRequest.travelMode='TRANSIT'; console.log(this.routeRequest.travelMode)}">Transit</button>
                <button id='driving' @click="toggle=>{this.routeRequest.travelMode='DRIVING'; console.log(this.routeRequest.travelMode)}">Drive</button>
            </div>
            <searchBar/>
        </div>

    </div>
   
</template>

<script>
export default {
    mounted(){
        this.initMap()
    },
    data(){
        return{
            key: 'AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE',
            // userLocation: { lat: 1.290270, lng: 103.851959 },
            mapOptions: {
                // center: { lat: 1.3565952, lng: 103.851959 },
                center: this.currentUserLocation,
                zoom: 12,
                gestureHandling: 'cooperative'
            },
            map: null,
            core: null,
            provideRouteAlternatives: true,
            loader: null,
            directionsService: null,
            directionsRenderer: null,
            routeRequest: {
                    origin: {},
                    destination: { lat: 1.350270, lng: 103.901959},
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
                    },
        }
    },
    computed: {
        ...mapGetters(['currentUserLocation'])
    },
    // props: {
    //     apiKey: {
    //         type: String,
    //         required: true,
    //     },
    //     userLocation: {
    //         type: Object,
    //         required: true,
    //     },
    //     foodItemsFiltered: {
    //         type: Array,
    //         required: true,
    //     },
    // },
    watch:{
        routeRequest:{
            handler(){
                this.initMap()
                this.createtravelButtons
            },
            deep: true
        }
    },
    methods: {
        async initMap(){
            this.routeRequest.origin = this.currentUserLocation // loads user location into the routeRequest object
            //load destination into the routeRequest object here 

            this.loader = new Loader({ 
                                    apiKey: this.key,
                                    version: "weekly",
                                })
            // Promise for a specific library

            const map = await this.loader.importLibrary('maps')

            const marker = await this.loader.importLibrary('marker')
            const routes = await this.loader.importLibrary('routes')

            this.core = await this.loader.importLibrary('core')

            this.map = new map.Map(document.getElementById("map"), this.mapOptions);
            this.createtravelButtons()

            this.directionsService = new routes.DirectionsService();
            this.directionsRenderer = new routes.DirectionsRenderer();

            if (this.routeRequest){
                // this.directionsRenderer.setMap(this.map);
                this.loadRoute()

            }

            console.log('map', map)

            //plot user location
            var marker1 = new marker.Marker({
                position: this.currentUserLocation,
                map: this.map,
                icon: this.userMarker
              
            });

            // this.createtravelButtons()

            console.log(this.routeRequest.travelMode)
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

        async reverseGeocode(coordinates){

            lat = coordinates.lat
            lng = coordinates.lng

            var result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.key}`)

            return result 
        },

        useGeolocation() {
            const coords = ref({ latitude: 0, longitude: 0 })
            const isSupported = 'navigator' in window && 'geolocation' in navigator

            let watcher = null
            onMounted(() => {
                if (isSupported)
                watcher = navigator.geolocation.watchPosition(
                    position => (coords.value = position.coords)
                )
            })
            onUnmounted(() => {
                if (watcher) navigator.geolocation.clearWatch(watcher)
            })

            return { coords, isSupported }
        },

        

        createtravelButtons() {
            const transitControl = document.getElementById("travelGrp"); 
            console.log('btns created', this.map)
            this.map.controls[this.core.ControlPosition.TOP_CENTER].push(transitControl);
        }
    }
}

</script>

<style>
#travelGrp{
    background-color: "#fff";
    /* box-shadow: 0 2px 6px rgba(0,0,0,0.3); */
    color: rgb(25,25,25);
    cursor: wait;
    font-family: Roboto, Arial,sans-serif;
    font-size: 16px;
    line-height: 38px;
    margin: 8px 0 22px;
    padding: 0 5px;
    text-align: center;
    border: none
}
</style>