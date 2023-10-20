<script setup>
</script>

<template>
<div class="container-fluid">
    <div class="row">
        <!-- LHS: sticky navbar -->
        <div class="col-sm-3">
            <div class="sideNav">
                <img id="profilePic" src="../components/images/zenith.jpg" class="rounded-circle mb-3" style="height: 150px; border: 1px solid #f2f2f2;" alt="Avatar"/>
                <h5 class="mb-2" style=""><strong>{{ name }}</strong></h5>
                <p class="text-muted">Individual <span class="badge bg-warning">INDIVIDUAL</span></p>
                <a href="#userInfo" class="btn">My Info</a> 
                <a href="#userListings" class="btn">My Listings</a> 
                <a href="#chopedListings" class="btn">My Chopes</a> 
                <a href="#others" class="btn">Others</a> 
            </div>
        </div>
        <!-- spacer -->
        <!-- <div class="col-sm-1">
            
        </div> -->
        <!-- RHS actual info -->
        <div class="col" style="background: lightgray; padding: 5%; margin: 5%; border-radius: 5px;">
            <!--   userInfo div -->
            <div class="row" id="userInfo">
                <div class="col">
                   <h1>Profile Information</h1>
                   <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="fName">First Name</label>
                                <input type="text" class="form-control" id="fName" aria-describedby="emailHelp" placeholder="First Name" value="{{ fName }}">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="fName">Last Name</label>
                                <input type="text" class="form-control" id="lName" aria-describedby="emailHelp" placeholder="First Name" value="{{ lName }}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="fName">Userame</label>
                                <input type="text" class="form-control" id="lName" aria-describedby="emailHelp" placeholder="First Name" value="{{ lName }}">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="Enter Password" value="{{ userPw }}">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <div class="form-group">
                                <label for="userEmail">Email</label>
                                <input type="text" class="form-control" id="email" aria-describedby="email" placeholder="Email" value="{{ userEmail }}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button style="float: right" type="submit" class="btn btn-primary" @click.enter="updateInfo()">Update</button>
                        </div>
                        
                    </div>
 
                   </form>
                </div>
            </div>
            <!-- userListings div -->
            <div class="row" id="userListings">
                <div class="col">
                    <h1>My Listings</h1>
                    <p> insert myListing caorusel</p>
                </div>
            </div>
            <!-- chopedListings div -->
            <div class="row" id="chopedListings">
                <div class="col">
                    <h1>My Chopes</h1>
                </div>
            </div>
            <!-- others div -->
            <div class="row" id="others">
              <div class="col">
                <h1>Other stuff</h1>
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
    /* position: fixed; */
    background-color: #A1BF73;
    padding: 5%;
    /* margin-top: 5%; */
    border-radius: 5%;
    /* margin-left: 5%; */
    margin-left: 5%;
    margin-top: 20%;
    text-align: center;
    display: block;
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
            fName:``,
            lName:``,
            userPw:``,
            userName: ``,
            userPhoto: ``,
            userAccountType: ``,
            userEmail: ``,
            userChoped:``,
            userListings: [],
        }
        
    },
    methods: {
        updateInfo(){
            //update firebase 
        }
    }
}



</script>