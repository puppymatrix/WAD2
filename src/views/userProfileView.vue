<script setup>
</script>

<template>
<div class="container-fluid">
    <div class="row">
        <!-- LHS: sticky navbar -->
        <div class="col-sm-2">
            <div class="sideNav">
                <img id="profilePic" src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-circle mb-3" style="width: 150px;" alt="Avatar"/>
                <h5 class="mb-2"><strong>{{ name }}</strong></h5>
                <p class="text-muted">Web designer <span class="badge bg-primary">PRO</span></p>
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
            <div class="row">
            <!-- welcome message and profile pic -->
                <div class="col d-flex m-3" >
                    <!-- replace with user photo -->
                    
                    <!-- <img id="profilePic" src="../components/images/user.png"/>
                    <h1>Welcome {{name}}!</h1> -->
                </div>
            <!--   userInfo div -->
            <div class="row" id="userInfo">
                <div class="col">
                   
                </div>
            </div>
            <!-- userListings div -->
            <div class="row" id="userListings">
                <div class="col">
                    
                </div>
            </div>
            <!-- chopedListings div -->
            <div class="row" id="chopedListings">
                <div class="col">

                </div>
            </div>
            <!-- others div -->
            <div class="row" id="others">
              <div class="col">

              </div>
            </div>
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
    border-radius: 5%;
    margin-left: 5%;
    text-align: center;
}
.sideNav a{
    display: block;
    font-weight: bold;
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