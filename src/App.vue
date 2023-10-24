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
import { auth as fb_auth } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        NavBar,
        Footer,
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, get the UID
                const uid = user.uid;
                this.$store.commit('setUser', uid); // Call the setUser mutation to update the state
                // console.log(uid);
                // Do something with the UID, such as store it in Vuex or pass it down to child components as a prop
            } else {
                // User is signed out
                this.$store.commit('setUser', null); // Call the setUser mutation to update the state
            }
        });
    },
};
</script>

<style scoped></style>
