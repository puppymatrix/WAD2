<script setup>
    import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
    import SearchBar from "../components/SearchBar.vue";
    import test from "../components/test.vue";
    import axios from 'axios'
    import {ref} from 'vue'
 
</script>

<template>
    <div class="row">
        <div class="col-1"></div>
        <div class="container m-3 col-10">
            <GoogleMap 
                api-key="AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE" 
                style="width: 100%; 
                height: 500px" 
                :center="coord" 
                :zoom="15" 
                >

                <Marker :options="{ position: coord }" />
                <!-- <Marker :options="{ position: center }" /> -->

                <!-- <InfoWindow :options="{ position: center, content: 'Hello World!' }" />
                <InfoWindow :options="{ position: { lat: 1.290270, lng: 103.851959 } }"> Content passed through slot </InfoWindow> -->
            </GoogleMap>           
            <br> 

            <div class="input-group">
                <input 
                    type="search" 
                    class="form-control bg-secondary-subtle" 
                    placeholder="Find the food you want!" 
                    v-model="searchQuery"
                    @keyup.enter="searchLocation"
                />
                <button class="btn text-bg-listing d-flex align-items-center justify-content-center" type="button" id="button-addon2" >
                <!-- <i class="search"></i> -->
                    <img src="../components/icons/search.jpeg" class="img-fluid" style="width:20px; color: white;"
                />
                </button>
            </div>

        {{ searchQuery }}
        <!-- {{ coord }} -->
        <!-- {{ getCoordinates(searchQuery) }} -->

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
        //map is the parent, searchbar is the child -> define props in map
        components: {
            // SearchBar
        },

    
        data(){
            return {
                searchQuery: '',
                userLocation: this,
                coord: { lat: 1.290270, lng: 103.851959 },
                key: 'AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE',
                // center: { lat: 1.290270, lng: 103.851959 } // center on singapore for now -> CHANGE TO user's current location (https://www.youtube.com/watch?v=KARBEHUyooM)
            }
        },
        computed:{
            coordinates(){
                // console.log(this.getCoordinates(this.searchQuery))
                this.getCoordinates()
            }
        },
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

                        console.log('coord', this.coord)

                    })
                .catch(
                    error => {
                        console.log(error)
                        console.log(error.response.data.error_message)

                })
            },
            searchLocation(){
                // console.log('data', data)
                // this.searchQuery = 
                // console.log('searchQuery', this.searchQuery)
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
                        this.userLocation = data.location
                    }

                )


            }

        }
    };
  </script>
  
 
<!-- key:  AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE-->
<!-- <script>
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";

    export default {
        name: "Map",
        data() {
        return{
            center: [37,7749, -122,4194]
        }},

        methods: {
        setupLeafletMap: function () {
            const mapDiv = L.map("mapContainer").setView(this.center, 13);
            L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
                attribution:
                'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "mapbox/streets-v11",
                accessToken:"AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE",
            }
            ).addTo(mapDiv);
        },
        //    so that i can add the listing details later on
        onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            layer.on('mouseover', () => { layer.openPopup(); });
                layer.on('mouseout', () => { layer.closePopup(); });
            }
        },
        },
        mounted() {
        this.setupLeafletMap();
        },
    };
</script> -->

<!-- <style scoped>
    #mapContainer {
    width: 80vw;
    height: 100vh;
    }
</style> -->

