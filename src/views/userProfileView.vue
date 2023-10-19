<script setup>
</script>

<template>
<div class="container-fluid">
    <div class="row">
        <!-- LHS: sticky navbar -->
        <div class="col-sm-2">
            <div class="sideNav">
                <a href="#userInfo" class="btn">My Info</a> 
                <a href="#userListings" class="btn">My Listings</a> 
                <a href="#chopedListings" class="btn">My Chopes</a> 
                <a href="#others" class="btn">Others</a> 
            </div>
        </div>
        <!-- spacer -->
        <div class="col-1">

        </div>
        <!-- RHS actual info -->
        <div class="col">
            <div class="row mt-5">
            <!-- welcome message and profile pic -->
                <div class="col d-flex m-3" >
                    <!-- replace with user photo -->
                    <img id="profilePic" src="../components/images/user.png"/>
                    <h1>Welcome {{name}}!</h1>
                </div>
            <!--   userInfo div -->
            <div class="row" id="userInfo">
                user info goes here, need to take from database later
            </div>
            <!-- userListings div -->
            <div class="row" id="userListings">

            </div>
            <!-- chopedListings div -->
            <div class="row" id="chopedListings">

            </div>
            <!-- others div -->
            <div class="row" id="others"></div>
        </div>
        </div>
        
    </div> 
</div>
</template>

<style>
#profilePic{
    /* somehow need to fix width */
}
.sideNav{
    position: fixed;
    background-color: #558C03;
    padding: 5%;
    margin-top: 5%;
}
.sideNav a{
    display: block;
}
.sideNav a:hover {
  color: #f2f2f2;
}
</style>

<script>

export default {

    data(){
        return{
            name: `User's name`,
            userPhoto: `relativeUrl`
        }
        
    }
}
</script>