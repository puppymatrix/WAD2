<script setup>
import { getUser, getListing, updateUser,getAllUsernames } from "../firebase/api.js";
import ScrollTop from "primevue/scrolltop";
</script>

<template>
    <ScrollTop />
    <div class="container-fluid">
        <div class="row" id="top">
            <!-- LHS: sticky navbar -->
            <div class="col-sm-3 ms-sm-5">
                <div class="sideNav">
                    <img
                        id="profilePic"
                        src="../components/icons/programmer.png"
                        class="rounded-circle mb-3"
                        style="height: 150px; border: 1px solid #f2f2f2"
                        alt="Avatar"
                    />
                    <h5 class="mb-2" style="">
                        Welcome, <strong>{{ fName + " " + lName }}</strong>
                    </h5>
                    <p class="text-muted">
                        <span class="badge bg-warning">{{
                            userAccountType
                        }}</span>
                    </p>
                    <a href="#userInfo" class="btn">My Info</a>
                    <a href="#userListings" class="btn">My Listings</a>
                    <a href="#chopedListings" class="btn">My Chopes</a>
                </div>
            </div>
            <!-- spacer -->
            <!-- <div class="col-sm-1">
            
        </div> -->
            <!-- RHS actual info -->
            <div
                class="col ms-sm-5"
                style="
                    background: lightgray;
                    padding: 5%;
                    margin: 5%;
                    border-radius: 5px;
                "
            >
                <!--   userInfo div -->
                <div class="row" id="userInfo">
                    <div class="col">
                        <h1>Profile Information</h1>
                        <form @submit.prevent="submitForm">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="fName">First Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="fName"
                                            aria-describedby="emailHelp"
                                            placeholder="First Name"
                                            v-model="fName"
                                        />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="fName">Last Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="lName"
                                            aria-describedby="emailHelp"
                                            placeholder="Last Name"
                                            v-model="lName"
                                        />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="fName">Username</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="userName"
                                            aria-describedby="emailHelp"
                                            placeholder="User Name"
                                            v-model="userName"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mb-2">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="userEmail">Email</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="email"
                                            aria-describedby="email"
                                            placeholder="Email"
                                            v-bind:value="userEmail"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex justify-content-end">
                                    <Button
                                        style="float: right"
                                        type="submit"
                                        class="rounded"
                                        @click.enter="updateInfo"
                                        >Update</Button
                                    >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- userListings div -->
                <div class="row" id="userListings">
                    <h1>My Listings</h1>
                    <!-- this is a for loop for each listing item -->
                    <div class="col-md-6 col-sm-12 my-2" v-for="item in paginatedListingItems">
                        <router-link
                                :to="{
                                    name: 'listing',
                                    query: { Id: item.Id },
                                }"
                            >
                            <div class="card h-100">
                                    <img
                                        :src="item.ImageUrls[0]"
                                        alt=""
                                        class="card-img-top"
                                    />
                                    <div class="card-body border-top">
                                        <h5 class="card-title">
                                            Listing Name: <br/>
                                            <span class="listingName">{{ item.ListingName }}</span>
                                        </h5>
                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary"
                                        >
                                            Category:
                                            {{ item.Category }} 
                                            <br/>
                                            Lister: {{ item.owner }}
                                            <br/>
                                            Location: {{item.Location.name}}
                                        </h6>
                                    </div>
                                </div>
                            </router-link>
                    </div>
                    <Paginator
                        :rows="listingRows"
                        :totalRecords="listingListLength"
                        @page="updateListingPage"
                        :first="0"
                        class="my-2"
                    ></Paginator>
                </div>
                <!-- chopedListings div -->
                <div class="row" id="chopedListings">
                    <h1>My Chopes</h1>
                    <!-- listings -->
                    <div class="col-md-6 col-sm-12 my-2" v-for="item in paginatedChopeItems">
                        <router-link
                                :to="{
                                    name: 'listing',
                                    query: { Id: item.Id },
                                }"
                            >
                            <div class="card h-100">
                                    <img
                                        :src="item.ImageUrls[0]"
                                        alt=""
                                        class="card-img-top"
                                    />
                                    <div class="card-body border-top">
                                        <h5 class="card-title">
                                            Listing Name: <br/>
                                            <span class="listingName">{{ item.ListingName }}</span>
                                        </h5>
                                        <h6
                                            class="card-subtitle mb-2 text-body-secondary"
                                        >
                                            Category:
                                            {{ item.Category }} 
                                            <br/>
                                            Lister: {{ item.owner }}
                                            <br/>
                                            Location: {{item.Location.name}}
                                        </h6>
                                    </div>
                                </div>
                            </router-link>
                    </div>
                    <Paginator
                        :rows="listingRows"
                        :totalRecords="chopeListLength"
                        @page="updateChopePage"
                        :first="0"
                        class="my-2"
                    ></Paginator>
                </div>
                <!-- others div -->
            </div>
        </div>
        <!-- <a id="linkTop" href="#top"> -->
        <!-- <img src="arrow"> -->
        <!-- Back to Top
    </a> -->
    </div>
</template>

<style>
#pwStatus {
    display: inline;
}
.sideNav {
    /* position: fixed; */
    background-color: #a1bf73;
    padding: 5%;
    /* margin-top: 5%; */
    border-radius: 5%;

    /* margin-left: 5%; */
    /* margin-left: 5%; */
    margin-top: 22%;
    text-align: center;
    /* display: block; */
}
.sideNav a {
    display: block;
    font-weight: bold;
}
.sideNav a:hover {
    color: #f2f2f2;
}

/* back to top button */
#linkTop {
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 30px;
    position: fixed;
    background-color: #a1bf73;
    color: black;
    padding: 1%;
    border-radius: 50%;
}

#linkTop:hover {
    background-color: green;
    color: white;
}

.listingName{
    color: #558C03;
    font-weight: bold;
    font-size: 22px;
}

.card-title{
    height: 45px;
    margin-bottom: 20px;
}

.card-subtitle{
    height: 45px;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
    mounted() {
        // console.log("mounted")
        // console.log(this.currentUser)
        this.getUserInfo();
    },
    data() {
        return {
            fName: ``,
            lName: ``,
            userPw: ``,
            userName: ``,
            userAccountType: ``,
            userEmail: ``,
            userChoped: [],
            userListings: [],
            showPassword: false, //to toggle password view
            pwStatus: "Show Password",
            myListingIDs: [],
            myListings: [],
            myChopeIDs: [],
            myChopes: [],
            myChopeObjs: [],
            listingPage: 0,
            listingRows: 2,
            listingListLength: 0,
            chopePage: 0,
            chopeListLength: 0,
        };
    },

    computed: {
        ...mapGetters(["isAuthenticated", "currentUser"]),
        paginatedListingItems() {
            const start = this.listingPage * this.listingRows;
            const end = start + this.listingRows;
            return this.myListings.slice(start, end);
        },
        paginatedChopeItems() {
            const start = this.chopePage * this.listingRows;
            const end = start + this.listingRows;
            return this.myChopes.slice(start, end);
        },
    },
    methods: {
        updateListingPage(event) {
            this.listingPage = event.page;
        },
        updateChopePage(event) {
            this.chopePage = event.page;
        },
        async getUserInfo() {
            console.log(this.currentUser);
            const userData = await getUser(this.currentUser);
            console.log(userData);
            this.fName = userData.firstName;
            this.lName = userData.lastName;
            this.userName = userData.username;
            this.userAccountType = userData.accountType;
            this.userEmail = userData.email;
            this.userPw = userData.password;
            this.userListings = userData.myListings; //array of listing IDs
            this.userChoped = userData.chopes; //this is an object
            const users = await getAllUsernames();

            //this part processes the data for listings posted by the user
            this.myListingIDs = userData.myListings;
            for (let listingID of this.myListingIDs) {
                const listingData = await getListing(listingID);
                const owner = users[listingData.Owner];
                listingData["Id"] = listingID;
                listingData["owner"] = owner;
                this.myListings.push(listingData);
            }
            this.listingListLength = this.myListings.length;
            console.log(this.myListings)
            

            //this part processes the data for listings choped by the user
            this.myChopeObjs = userData.chopes; //this is array of objects
            for (let num in this.myChopeObjs) {
                this.myChopeIDs.push(this.myChopeObjs[num].listingId); //adds all listing IDs into list
            }

            for (let chopeID of this.myChopeIDs) {
                const chopeData = await getListing(chopeID);
                const owner = users[chopeData.Owner];
                chopeData["Id"] = chopeID;
                chopeData["owner"] = owner;
                this.myChopes.push(chopeData);
            }
            this.chopeListLength = this.myChopes.length;
        },
        updateInfo() {
            //update firebase
            updateUser(
                this.currentUser,
                this.fName,
                this.lName,
                this.userName,
                "individual"
            );
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
            if (this.showPassword) {
                //show password
                document.getElementById("password").type = "text";
                this.pwStatus = "Hide Password";
            } else {
                //mask password
                document.getElementById("password").type = "password";
                this.pwStatus = "Show Password";
            }
        },
    },
};
</script>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
    color: white;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

a {
    text-decoration: none;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}



</style>
