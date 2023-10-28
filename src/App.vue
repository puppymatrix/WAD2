<script setup>
import { Icon } from "@iconify/vue";
</script>

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
    <Dialog
        v-model:visible="visible"
        modal
        header="Header"
        :style="{ width: '40vw' }"
        :position="'top'"
        :closable="true"
    >
        <template #container="slotProps">
            <Button
                @click="this.$store.commit('setVisible', false)"
                plain
                text
                class="absolute top-0 right-0 m-4"
                ><Icon icon="akar-icons:cross"
            /></Button>
            <div class="surface-card border-round shadow-2 p-4">
                <div
                    class="text-900 font-medium mb-2 text-xl flex justify-content-center"
                >
                    Login required
                </div>
                <div class="flex justify-content-center">
                    <Button @click="gotoLogin"
                        ><Icon icon="line-md:login" />&nbsp Click to
                        login</Button
                    >
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { getUser, getUserLocation } from "./firebase/api.js";
import axios from "axios";
import { mapState } from 'vuex';

export default {
    components: {
        NavBar,
        Footer,
    },
    computed: {
    ...mapState(['visible']),
    },
    data() {
        return {
            userLocation: "",
        };
    },
    created() {
        this.getUserLocation();
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, get the UID
                const uid = user.uid;
                this.$store.commit("setUser", uid); // Call the setUser mutation to update the state
                // console.log(uid);

                // if (this.userLocation != "")
                this.$store.commit("setLocation", this.userLocation); // Call the setUser mutation to update the state
            } else {
                // User is signed out
                this.$store.commit("setUser", null); // Call the setUser mutation to update the state
            }
        });
    },

    methods: {
        async getUserLocation() {
            const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA3mmqNXwwQ_RrLB9mKbzTba1q-SK5tkFE`;

            var loc = await axios
                .post(url)
                .then((response) => {
                    const data = response.data;
                    // Call the setUser mutation to update the state
                    // console.log('resp', data.location)
                    this.userLocation = data.location;
                })

                .catch((error) => {
                    console.log(error);
                    console.log(error.response.data.error_message);
                });
        },
        gotoLogin() {
            this.$router.push("/logIn");
            this.$store.commit("setVisible", false);
        },
    },
};
</script>

<style scoped></style>
