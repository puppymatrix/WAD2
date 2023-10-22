<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="row d-flex align-items-center" id="nav">
        <div class="col-1"></div>
        <div class="col-2 p-3 justify-content-center">
            <a href="/"><img src="../components/icons/images/logo.png" alt="" class="img-fluid" id="logo"></a>
            
        </div>
        <div class="col-6">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/allListings" >Explore</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/mapView" >Map</a>
                </li>
            </ul>
        </div>
        <div class="col-1">
            <!-- <button @click="read">r</button> -->
        </div>

        <div class="col-1 justify-content-center p-0" v-if="$store.state.userLoggedIn" >
            <!-- <img src="../components/images/user.png" alt="" class="img-fluid" @mouseover="displayDropDown"> -->
            <div class="d-flex me-3" >
                <img src="../components/icons/images/user.png" alt="" class="img-fluid btn btn-large"  @click="navigate=>{this.$router.push('/profile')}">
                <img src="../components/icons/logout.png" alt="" class="img-fluid btn btn-large" @click="logOut">
                
            </div>
        </div>

        <div class="col-2" v-else>
            <button type="button" class="btn btn-outline-success m-1" @click.prevent="navigate=>{$router.push('/logIn')}" v-if="$route.path != '/logIn'">Log In</button>
            <button type="button" class="btn btn-success m-1" @click.prevent="navigate=>{$router.push('/signUp')}"  v-if="$route.path != '/signUp'">Sign Up</button>
        </div>

        <div class="col-1" v-if="userLoggedIn"></div>

    </div>

</template>

<script>
    import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
    import { auth } from '../firebase/index.js'
    import { mapState } from "vuex";
    
    export default {
        data() {
            return {
            };
        },
        computed: {
                ...mapState(["userLoggedIn"]), // Map the userLoggedIn state from the store
            },
        methods: {
           logOut(){
            
            this.$store.commit('setUserLoggedIn', false)
            signOut(auth)
           }, 
        },
    };
</script>

<style scoped>
#logo {
    height: 40px;
}

#nav{
    background-color: #0b2b26;
    
}

.base{
    color: white;
    background-color:#43A046
}

.footer {
    background-color: #263238;
    padding-top: 80px;
    padding-bottom: 100px;
}

.img_small {
    height: 50%;
}

a>li{
    color: white;
}


div img {
    margin: 5px;
}

.nav-link{
    text-decoration: none;
    color: #ebf1e7;
    font-size: 1.5vw
}

.nav-link:hover{
    color: #bee5b0
}

.nav-item{
    padding-left: 2.5%;
    padding-right: 2.5%
}

</style>
