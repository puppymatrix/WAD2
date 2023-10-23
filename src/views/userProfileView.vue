<script setup>
</script>

<template>
<div class="container-fluid">
    <div class="row" id="top">
        <!-- LHS: sticky navbar -->
        <div class="col-sm-3">
            <div class="sideNav">
                <!-- <img id="profilePic" src="../components/images/zenith.jpg" class="rounded-circle mb-3" style="height: 150px; border: 1px solid #f2f2f2;" alt="Avatar"/> -->
                <h5 class="mb-2" style="">Welcome, <strong>{{ fName +" "+ lName }}</strong></h5>
                <p class="text-muted"><span class="badge bg-warning">INDIVIDUAL</span></p>
                <a href="#userInfo" class="btn">My Info</a> 
                <a href="#userListings" class="btn">My Listings</a> 
                <a href="#chopedListings" class="btn">My Chopes</a> 
                
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
                                <input type="text" class="form-control" id="fName" aria-describedby="emailHelp" placeholder="First Name" v-bind:value="fName">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="fName">Last Name</label>
                                <input type="text" class="form-control" id="lName" aria-describedby="emailHelp" placeholder="First Name" v-bind:value="lName">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="fName">Username</label>
                                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp" placeholder="First Name" v-bind:value="userName">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="Enter Password" v-bind:value="userPw">
                                <label><input type="checkbox" id="toggle-password" v-bind="showPassword" @click="togglePassword()"/> 
                                <div id="pwStatus"> &nbsp{{ pwStatus }}</div></label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <div class="form-group">
                                <label for="userEmail">Email</label>
                                <input type="text" class="form-control" id="email" aria-describedby="email" placeholder="Email" v-bind:value="userEmail">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button style="float: right" type="submit" class="btn btn-success" @click.enter="updateInfo()">Update</button>
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
                    <div class="album py-2">
                            <div class="container-fluid px-0">
                                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2Fd852987f86aeae8b65926f9e7a260c28285ea744"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Vegetables</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-sm btn-outline-secondary">
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://chipguanheng.com/wp-content/uploads/Baileys-Original-Ice-Cream-Pints-Pack-of-2-Pints-x-500ml-scaled.jpg"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Ice cream</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center"
                                                >
                                                    <div class="btn-group">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-outline-secondary"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Banana</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-outline-secondary">
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                    </div>
                </div>
            </div>
            <!-- chopedListings div -->
            <div class="row" id="chopedListings">
                <div class="col">
                    <h1>My Chopes</h1>
                    <!-- listings -->
                    <div class="container-fluid">
                        <div class="album py-2">
                            <div class="container-fluid px-0">
                                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2Fd852987f86aeae8b65926f9e7a260c28285ea744"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Vegetables</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center"
                                                >
                                                    <div class="btn-group">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-outline-secondary"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://chipguanheng.com/wp-content/uploads/Baileys-Original-Ice-Cream-Pints-Pack-of-2-Pints-x-500ml-scaled.jpg"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Ice cream</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center"
                                                >
                                                    <div class="btn-group">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-outline-secondary"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img
                                                src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
                                                alt=""
                                                class="card-img-top"
                                            />
                                            <div class="card-body border-top border-2">
                                                <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                                <h5 class="card-title">Banana</h5>
                                                <p class="card-text d-flex align-items-center mb-3">
                                                    <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                                </p>
                                                <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                                    <IMdiuser class="me-1"/>Glenda123
                                                </h6>
                                                <div
                                                    class="d-flex justify-content-between align-items-center"
                                                >
                                                    <div class="btn-group">
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-outline-secondary"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- others div -->
            
        </div>
    </div> 
    <a id="linkTop" href="#top">
        <!-- <img src="arrow"> -->
        Back to Top
    </a>
</div> 

</template>

<style>

#pwStatus{
    display: inline
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

/* back to top button */
#linkTop{
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px;
    position: fixed;
    background-color: #A1BF73;
    color: black;
    padding: 1%;
    border-radius: 50%;
    
}

#linkTop:hover{
    background-color: green;
    color: white
}


</style>

<script>

export default {

    data(){
        return{
            fName:`Zenith`,
            lName:`Tay`,
            userPw:`password`,
            userName: `zenith123`,
            userPhoto: ``,
            userAccountType: `individual/business`,
            userEmail: `zenith@gmail.com`,
            userChoped:[],
            userListings: [],
            showPassword: false, //to toggle password view
            pwStatus: 'Show Password',
            
        }
        
    },
    methods: {
        updateInfo(){
            //update firebase 
        },
        togglePassword(){
            this.showPassword = !this.showPassword
            if(this.showPassword){ //show password
                document.getElementById('password').type = "text"
                this.pwStatus = "Hide Password"
            }else{ //mask password
                document.getElementById('password').type = "password"
                this.pwStatus = "Show Password"
            }
        }
    }
}




</script>