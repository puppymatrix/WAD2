<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="row d-flex align-items-center" id="nav">
        <div class="col-1"></div>
        <div class="col-2 p-3 justify-content-center">
            <img src="../components/images/logo.png" alt="" class="img-fluid" id="logo">
        </div>
        <div class="col-6">
            <ul class="nav justify-content-center fs-4 p-4">

                <li class="nav-item">
                  <a class="nav-link text-dark" href="/home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-dark" href="/listing" >Listings</a>
                </li>
            </ul>
        </div>
        <div class="col-1"></div>

        <div class="col-1 justify-content-center p-0" v-if="isLoggedIn" >
            <!-- <img src="../components/images/user.png" alt="" class="img-fluid" @mouseover="displayDropDown"> -->
            <div class="dropdown">
                <img src="../components/images/user.png" alt="" class="img-fluid btn btn-large dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <ul class="dropdown-menu">
                    <li class = "d-flex">
                        <img src="../components/icons/myProfile.png" alt="" class="img-fluid col-2">
                        <!-- insert route to profile button -->
                        <button class="dropdown-item p-0" type="button">My Profile</button>  
                    </li>
                    <li class = "d-flex">
                        <img src="../components/icons/myListings.png" alt="" class="img-fluid col-2">
                        <!-- insert route to profile button -->
                        <button class="dropdown-item p-0" type="button">My Listings</button>
                    </li>
                    <li class = "d-flex">
                        <img src="../components/icons/myChopes.png" alt="" class="img-fluid col-2">
                        <!-- insert route to profile button -->
                        <button class="dropdown-item p-0" type="button">My Chope(s)</button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-2" v-else>
            <button type="button" class="btn btn-outline-success m-1" @click="navigate=>{$router.push('/logIn')}">Log In</button>
            <button type="button" class="btn btn-success m-1" @click="navigate=>{$router.push('/signUp')}">Sign Up</button>
        </div>

        <div class="col-1" v-if="checkPath($route.path)"></div>

    </div>

</template>

<script>
    import { isLoggedIn } from ''
    export default {
        data() {
            return {
                dropDown: false
            };
        },
        methods: {
            displayDropDown(){ //dropdown hover doesnt work 
                if (!this.dropDown){
                    this.dropDown = true
                } else {
                    this.dropDown = false
                }

                console.log(this.dropDown)
            },

            checkPath(path){ // change this logic to if the user if logged in 
                var notSignedInPath = ['/logIn', '/signUp', '/resetPassword']

                // console.log(this.$route.path)
            }
        },
    };
</script>

<style scoped>
#logo {
    height: 40px;
}

#nav{
    background-color: #ebeff3;
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
    color: white
}


div img {
    margin: 5px;
}


</style>
