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

        <RouterView :key="$route.fullPath"/>

        <Footer />
    </div>
    <Dialog
        v-model:visible="visible"
        modal
        header="Header"
        :style="{ width: '40vw' }"
        :position="'top'"
        :closable="true"
        id="dialog"
    >
        <template #container="slotProps">
            <Button
                @click="close"
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
                        ><Icon icon="line-md:login" />&nbsp Click to login
                    </Button>
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
import { mapState } from "vuex";

export default {
    components: {
        NavBar,
        Footer,
    },
    computed: {
        ...mapState(["visible"]),
    },
    data() {
        return {
            userLocation: "",
        };
    },
    created() {
        const success = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const userLocation = { lat, lng };
            this.$store.commit("setLocation", userLocation);
            this.userLocation = userLocation;
            // Do something with the position
        };

        const error = (err) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(success, error);

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, get the UID
                const uid = user.uid;
                this.$store.commit("setUser", uid); // Call the setUser mutation to update the state
            } else {
                // User is signed out
                this.$store.commit("setUser", null); // Call the setUser mutation to update the state
            }
        });
    },

    methods: {

        gotoLogin() {
            this.$router.push("/logIn");
            this.$store.commit("setVisible", false);
        },
        close() {
            this.$store.commit('setVisible', false);
        }
    },
};
</script>