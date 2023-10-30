<script setup>
import { getUser,
getListing } from "../firebase/api.js"

</script>

<template>
<div class="container-fluid">
    <div class="row" id="top">
        <!-- LHS: sticky navbar -->
        <div class="col-sm-3 ms-sm-5 ">
            <div class="sideNav">
                <!-- <img id="profilePic" src="../components/images/zenith.jpg" class="rounded-circle mb-3" style="height: 150px; border: 1px solid #f2f2f2;" alt="Avatar"/> -->
                <h5 class="mb-2" style="">Welcome, <strong>{{ fName +" "+ lName }}</strong></h5>
                <p class="text-muted"><span class="badge bg-warning">{{userAccountType}}</span></p>
                <a href="#userInfo" class="btn">My Info</a> 
                <a href="#userListings" class="btn">My Listings</a> 
                <a href="#chopedListings" class="btn">My Chopes</a> 
                
            </div>
        </div>
        <!-- spacer -->
        <!-- <div class="col-sm-1">
            
        </div> -->
        <!-- RHS actual info -->
        <div class="col ms-sm-5" style="background: lightgray; padding: 5%; margin: 5%; border-radius: 5px;">
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
                            <!-- <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="Enter Password" v-bind:value="userPw">
                                <label><input type="checkbox" id="toggle-password" v-bind="showPassword" @click="togglePassword()"/> 
                                <div id="pwStatus"> &nbsp{{ pwStatus }}</div></label>
                            </div> -->
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <div class="form-group">
                                <label for="userEmail">Email</label>
                                <input type="text" class="form-control" id="email" aria-describedby="email" placeholder="Email" v-bind:value="userEmail" disabled>
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
                    <h1>My Listings</h1>
                    <!-- this is a for loop for each listing item -->
                    <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in myListings">
                        <div class="card shadow-sm">
                                <img :src="item.ImageUrls[0]" alt="" class="card-img-top"/>
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">
                                        Category: {{ item.Category }}
                                    </h6>
                                    <h5 class="card-title">
                                        {{ item.ListingName }}
                                    </h5>
                                    <p class="card-text d-flex align-items-center mb-3"> 
                                        {{ item.Location.name }}
                                    </p>
                                    <!-- need to getLister -->
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="card-text d-flex align-items-center mb-3">
                                            Price:
                                            {{ item.Price }} <br />
                                            <!-- Distance: {{ item.distance }} -->
                                        </p>
                                    </h6>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="me-1">
                                            {{ item.owner }}
                                        </p>
                                    </h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                                <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
            <!-- chopedListings div -->
            <div class="row" id="chopedListings">
                
                    <h1>My Chopes</h1>
                    <!-- listings -->
                    <div class="col-lg-3 col-md-4 col-sm-12" v-for="item in myChopes">
                        <div class="card shadow-sm">
                                <img :src="item.ImageUrls[0]" alt="" class="card-img-top"/>
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">
                                        Category: {{ item.Category }}
                                    </h6>
                                    <h5 class="card-title">
                                        {{ item.ListingName }}
                                    </h5>
                                    <p class="card-text d-flex align-items-center mb-3"> 
                                        {{ item.Location.name }}
                                    </p>
                                    <!-- need to getLister -->
                                    <h6
                                        class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="card-text d-flex align-items-center mb-3">
                                            Price:
                                            {{ item.Price }} <br />
                                            <!-- Distance: {{ item.distance }} -->
                                        </p>
                                    </h6>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <p class="me-1">
                                            {{ item.owner }}
                                        </p>
                                    </h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                                <a href="/listing">View</a>
                                            </button>
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
    /* margin-left: 5%; */
    margin-top: 22%;
    text-align: center;
    /* display: block; */
    
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
import { mapGetters } from "vuex";

export default {
    mounted(){
        console.log("mounted")
        // console.log(this.currentUser)
        this.getUserInfo()
        
    },
    data(){
        return{
            fName:``,
            lName:``,
            userPw:``,
            userName: ``,
            userAccountType: ``,
            userEmail: ``,
            userChoped:[],
            userListings: [],
            showPassword: false, //to toggle password view
            pwStatus: 'Show Password',
            myListingIDs:[],
            myListings:[],
            myChopeIDs:[],
            myChopes:[],
            myChopeObjs:[]
            
        }
    },

    computed: {
        ...mapGetters(["isAuthenticated","currentUser"]),
    },
    methods: {
        async getUserInfo(){
            console.log(this.currentUser)
            const userData = await getUser(this.currentUser)
            console.log(userData)
            this.fName = userData.firstName
            this.lName = userData.lastName
            this.userName = userData.username
            this.userAccountType = userData.accountType
            this.userEmail = userData.email
            this.userPw = userData.password 
            this.userListings = userData.myListings //array of listing IDs
            this.userChoped = userData.chopes //this is an object 

            //this part processes the data for listings posted by the user
            this.myListingIDs = userData.myListings
            for(let listingID of this.myListingIDs){
                const listingData = await getListing(listingID)
                this.myListings.push(listingData)
            }

            //this part processes the data for listings choped by the user
            this.myChopeObjs = userData.chopes //this is array of objects
            for( let num in this.myChopeObjs){
                this.myChopeIDs.push(this.myChopeObjs[num].listingId) //adds all listing IDs into list 
            }
            
            for(let chopeID of this.myChopeIDs){
                const chopeData = await getListing(chopeID)
                this.myChopes.push(chopeData)
            }

            


        },
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