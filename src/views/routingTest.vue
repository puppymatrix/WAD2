<script setup>
/* eslint-disable no-undef */
    import { onUnmounted, onMounted, ref } from 'vue'
    import { Loader } from '@googlemaps/js-api-loader'
    import { mapGetters } from "vuex";
</script>

<template>
    <div class="row justify-content-center" >
        <div class="container col-8 m-3">
            <div id="map" style="height:600px" ></div>
            <!-- <select name="travelMode" id="" v-model="travelMode">
                <option value="BUS">Bus</option>
                <option value="DRIVING">Car</option>
            </select>             -->

            <div id="transit">
                <button id='transit' class='btn btn-secondary' @click="toggle=>{this.routeRequest.travelMode='TRANSIT'; console.log(this.routeRequest.travelMode)}">Transit</button>
                <button id='driving' class='btn btn-secondary' @click="toggle=>{this.routeRequest.travelMode='DRIVING'; console.log(this.routeRequest.travelMode)}">Drive</button>
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
            provideRouteAlternatives: true,
            loader:null,
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
                    }
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
            handler: function(){
                this.initMap()
                this.loadRoute()
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
            this.directionsService = new routes.DirectionsService();
            this.directionsRenderer = new routes.DirectionsRenderer();

            this.map = new map.Map(document.getElementById("map"), this.mapOptions);
            this.directionsRenderer.setMap(this.map);

            const svgMarker = {
                    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "blue",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 2,
                    // anchor: new core.Point(40, 20),
                };

            console.log('map', map)

            var marker1 = new marker.Marker({
                // position: { lat: 1.290270, lng: 103.851959 },
                position: this.currentUserLocation,
                map: this.map,
                icon: svgMarker
              
            });

            // console.log(directionsService.route())
           this.loadRoute()
            this.createtravelButtons()
            console.log(this.routeRequest.travelMode)
        },

        async loadRoute(){

            if (this.directionsService != null){

                var route = await this.directionsService.route(this.routeRequest, (result, status) => {
                    if (status == 'OK') {
                        console.log('result', result)
                        if (!this.directionsRenderer.getDirections()){
                            this.directionsRenderer.setMap(null);
                            
                        }
                        console.log(this.map)
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
            const transitControl = document.createElement("div");
            const core = this.loader.importLibrary('core')

            console.log('btn', this.loader)
            

            this.map.controls[this.map.ControlPosition.TOP_RIGHT].push(transitControl);
        }
    }
}

</script>