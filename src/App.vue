<template>
    <div>
        <header>
            <div class="wrapper">
                <NavBar />
            </div>
        </header>

        <RouterView />

        <Footer />
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { getUser, getUserLocation } from "./firebase/api.js";
import axios from "axios";

export default {
    components: {
        NavBar,
        Footer,
    },
    data(){
        return {
            userLocation: ""
        }
    },
    created() {
        this.getUserLocation()
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, get the UID
                const uid = user.uid;
                this.$store.commit('setUser', uid); // Call the setUser mutation to update the state
                // console.log(uid);
                
                // if (this.userLocation != "")
                this.$store.commit('setLocation', this.userLocation); // Call the setUser mutation to update the state

            } else {
                // User is signed out
                this.$store.commit('setUser', null); // Call the setUser mutation to update the state
                
            }
        });
    },

    methods: {
        async getUserLocation(){
        const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE`

        var loc = await axios.post(url)
            .then(
                response => {
                    const data = response.data
                    // Call the setUser mutation to update the state
                    // console.log('resp', data.location)
                    this.userLocation = data.location
                } )
        
            .catch(
                error => {
                    console.log(error)
                    console.log(error.response.data.error_message)
                }
            )
      
        }
    }
};
</script>

<style scoped></style>
