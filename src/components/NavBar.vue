<script setup>
    import { getAuth, signOut } from "firebase/auth";
    import { mapGetters } from "vuex";
    import router from "../router/index"
import { doc } from "firebase/firestore";
</script>

<template>
    <Toast />
    <div class="row d-flex align-items-center" id="nav">
        <!-- logo and links -->
        <div class="col">
            <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
            <!-- brand image -->
            <a class="navbar-brand" href="#">
                <a href="/"><img src="../components/icons/foodcatch-logo.png" style="height: 40px;" alt="" class="img-fluid" id="logo"></a>
            </a>
            <!-- toggle button???? -->
            <button class="navbar-toggler btn custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon custom-toggler"></span>
            </button>

            <!-- navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-0">
                <li class="nav-item px-3">
                    <router-link to="/" @click="closeNav" class="nav-link" active-class="active-link">Home</router-link>
                </li>
                <li class="nav-item dropdown px-3">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Explore
                    </a>
                    <ul class="dropdown-menu">
                        <li><router-link to="/allListings" class="dropdown-item" active-class="active-link" @click="closeNav">All Listings</router-link></li>
                        <li><router-link to="/mapView" class="dropdown-item" active-class="active-link" @click="closeNav">Food Near Me</router-link></li>
                    </ul>
                </li>
                <li class="nav-item px-3">
                    <router-link to="/addListing" @click="closeNav" class="nav-link display-inline" active-class="active-link" >Add Listing</router-link>
                </li>
                <li><div style="background-color: #000; margin: 10px 0; border-top: 1px solid white"></div></li>            
                <li class="nav-item px-3" id="pinned">

                <!-- profile and logout buttons -->
                    <div class="justify-content-center p-0" @click="closeNav" v-if="isAuthenticated" >
                        <!-- <img src="../components/images/user.png" alt="" class="img-fluid" @mouseover="displayDropDown"> -->
                        <div class="d-flex me-3">
                            <button type="button" class="btn btn-standard m-1" @click="navigate=>{$router.push('/profile')}" v-if="$route.path!='/profile'">My Profile</button>
                            <button type="button" class="btn btn-secondary m-1" @click="logOut">Log Out</button>
                        </div>
                    </div>
                    <!-- login and signup buttons -->
                    <div class="me-0" @click="closeNav" v-else>
                        <button type="button" class="btn btn-outline-standard m-1" @click.prevent="navigate=>{$router.push('/logIn')}" v-if="$route.path != '/logIn'">Log In</button>
                        <button type="button" class="btn btn-standard m-1" @click.prevent="navigate=>{$router.push('/signUp')}"  v-if="$route.path != '/signUp'">Sign Up</button>
                    </div>
                </li>
            </ul>
            </div>
            </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        ...mapGetters(["isAuthenticated","currentUser","mapError"]),
    },
    methods: {
        closeNav(){
            const navBar = document.getElementsByClassName("navbar-toggler")[0];
            const coll = document.getElementsByClassName("navbar-collapse")[0];
            if(!navBar.classList.contains("collapsed")){
                navBar.classList.add("collapsed");
                navBar.setAttribute('aria-expanded', 'false')
                coll.classList.remove("show")
            }
        },
        logOut() {
            // console.log(this.currentUser);
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    // console.log("sign out successful");
                    router.push('/')
                    this.$toast.add({
                    severity: "info",
                    summary: "Sign Out Successful",
                    detail: "Thanks for visiting FoodCatch!",
                    life: 3000,
                    
                });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
    watch: {
        viewportWidth() {
            this.toggleNavBar
        },
        mapError() {
            if(this.mapError){
                this.$toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: "You must allow location services to use this feature.",
                    life: 3000,
                });
            }
            this.$store.commit("setMapError", false);
        }
    },
}
</script>

<style scoped>
.btn-outline-standard{
    border-color: #558603;
    color: #558603
}
.btn-standard{
    background-color: #558603;
    color: #ebf1e7;
    border-color: #558603;
}
.custom-toggler {
    border-color:#0b2b26 ;
    background-color:#558603;
}

@media (min-width: 992px) {
    #pinned{
        position: absolute;
        top: 20px;
        right: 5px;
    }
}

#rightSideBtns {
    position: absolute;
    right: 0px;
    top: 10px;
}

#logo {
    height: 40px;
}

#nav {
    background-color: #0b2b26;
    width: 100%;
    margin: 0;
}

/* .base {
    color: white;
    background-color: #43a046;
} */

/* .footer {
    background-color: #263238;
    padding-top: 80px;
    padding-bottom: 100px;
} */

/* .img_small {
    height: 50%;
} */

a > li {
    color: #ebf1e7;
}

div img {
    margin: 5px;
}

.nav-link {
    text-decoration: none;
    color: #ebf1e7;
    font-size: 20px;
    white-space: nowrap;
}

.navbar-nav .nav-link.show {
  color: #ebf1e7;
}

.nav-link:hover {
    color: #bee5b0;
}

.nav-item {
    padding-left: 2.5%;
    padding-right: 2.5%;
}

button:hover{
    border-color:  #ebf1e7;
}

/* .active-link {
    text-decoration: underline;
    text-underline-offset: 5px;
} */

.dropdown-item:active {
    background-color: #bee5b0;
    color: #212529;
}

.dropdown-item:hover {
    background-color: #bee5b0;
}
</style>
