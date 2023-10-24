<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="row d-flex align-items-center" id="nav">
        <!-- <div class="col-1"></div> -->
        <!-- logo -->
        <!-- <div class="col-2 p-3 justify-content-center">
    
        </div> -->
        <!-- logo and links -->
        <div class="col">
            <nav class="navbar navbar-expand-md">
            <div class="container-fluid">
            <!-- brand image -->
            <a class="navbar-brand" href="#">
                <a href="/"><img src="../components/icons/foodcatch-logo.png" style="height: 40px;" alt="" class="img-fluid" id="logo"></a>
            </a>
            <!-- toggle button???? -->
            <button class="navbar-toggler btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item px-3 ml-5">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item px-3">
                    <a class="nav-link" href="/allListings" >Explore</a>
                </li>
                <li class="nav-item px-3">
                    <a class="nav-link" href="/mapView" >Map</a>
                </li>
                <li class="nav-item px-3 ">
                <!-- profile and logout buttons -->
                    <div class="justify-content-center p-0" v-if="$store.state.userLoggedIn" >
                        <!-- <img src="../components/images/user.png" alt="" class="img-fluid" @mouseover="displayDropDown"> -->
                        <div class="d-flex me-3" >
                            <img src="../components/icons/images/user.png" alt="" class="img-fluid btn btn-large"  @click="navigate=>{this.$router.push('/profile')}">
                            <img src="../components/icons/logout.png" alt="" class="img-fluid btn btn-large" @click="logOut">
                            
                        </div>
                    </div>
                    <!-- login and signup buttons -->
                    <div class="me-0" v-else>
                        <button type="button" class="btn btn-outline-success m-1" @click.prevent="navigate=>{$router.push('/logIn')}" v-if="$route.path != '/logIn'">Log In</button>
                        <button type="button" class="btn btn-success m-1" @click.prevent="navigate=>{$router.push('/signUp')}"  v-if="$route.path != '/signUp'">Sign Up</button>
                    </div>

                    <div class="col-1" v-if="userLoggedIn"></div>           
                </li>
            </ul>

            </div>
            </div>
            </nav>
        </div>

        <!-- <div class="col-4" id="rightSideBtns"> -->
            <!-- profile and logout buttons -->
            <!-- <div class="justify-content-center p-0" v-if="$store.state.userLoggedIn" > -->
                <!-- <img src="../components/images/user.png" alt="" class="img-fluid" @mouseover="displayDropDown"> -->
                <!-- <div class="d-flex me-3" >
                    <img src="../components/icons/images/user.png" alt="" class="img-fluid btn btn-large"  @click="navigate=>{this.$router.push('/profile')}">
                    <img src="../components/icons/logout.png" alt="" class="img-fluid btn btn-large" @click="logOut">
                    
                </div>
            </div> -->
            <!-- login and signup buttons -->
            <!-- <div class="me-0" v-else>
                <button type="button" class="btn btn-outline-success m-1" @click.prevent="navigate=>{$router.push('/logIn')}" v-if="$route.path != '/logIn'">Log In</button>
                <button type="button" class="btn btn-success m-1" @click.prevent="navigate=>{$router.push('/signUp')}"  v-if="$route.path != '/signUp'">Sign Up</button>
            </div>

            <div class="col-1" v-if="userLoggedIn"></div>
        </div> -->


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
#rightSideBtns{
    position: absolute;
    right: 0px;
    top: 10px;

}

/* .navbar-toggler{
    position: absolute;
    left: 10px;
    top: 10px;
} */
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
    font-size: 25px
}

.nav-link:hover{
    color: #bee5b0
}

.nav-item{
    padding-left: 2.5%;
    padding-right: 2.5%
}

</style>
