<script setup>
import { mapGetters } from "vuex";

</script>
<template>
    <!--Footer-->

    <div class="row footer">

        <!-- first column -->

        <div class="col-lg-4">
            <div class="row d-flex justify-content-center align-items-center">
                <img src=".\icons\foodcatch-logo.png" alt="" class="p-3" style="width: 250px;">
                <p style="color: white; font-style: italic; text-align: center">Say no to food waste today!</p>
            </div>
        </div>
        <!-- second column -->

        <div class="col-lg-2 text-white p-4 text-center text-lg-start">
            <h3>Socials</h3>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="https://www.instagram.com/">Instagram</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="https://www.facebook.com/">Facebook</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="https://sg.linkedin.com/">LinkedIn</a>
                </li>
            </ul>
        </div>

        <!-- third column -->
        <div class="col-lg-2 text-white p-4 text-center text-lg-start">
            <h3>Website</h3>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link " aria-current="page" @click="checkLogIn">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="checkSignUp">Sign Up</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="cannotProfile">User Profile</a>
                </li>
            </ul>
        </div>

        <!-- fourth column -->
        <div class="col-lg-3 text-white p-4 text-center text-lg-start">
            <h3>Stay up to Date</h3>
            <form class="form-inline">
                <div class="input-group"> <!-- Use Bootstrap input group to group input and button> -->
                    <input class="form-control" type="search" placeholder="Your Email Address" aria-label="Search">
                    <div class="input-group-append"> <!-- Append the button to the input group -->
                        <Button class="footerBtn rounded-end" @click="display">
                            <img src=".\icons\send.png" alt="" >&nbsp Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    


    <div class="row lastRow">
        <div class="col-12 text-center copyright">
            Copyright © 2023 FoodCatch Pte Ltd. <br>
            All rights reserved
        </div>
    </div>
</template>

<style>
    .nav-link{
        text-decoration: none;
        color: #ebf1e7;

    }
    .nav-link:hover{
        color: #bee5b0;
        cursor: pointer;

    }
    .footer {
        background-color: #0b2b26;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
        margin: 0;
    }

    .lastRow{
        width: 100%;
        background-color: #1A2327;
        margin: 0;
    }

    .footerBtn{
        background-color: #558C03;
        color: white;
    }
    .footerBtn:hover{
        background-color: #558C03;
        color: #ebf1e7;
        border-color: #ebf1e7;
    }
    .copyright{ 
        color: white; 
        padding: 10px;
    }

    h3{
        color: #558C03;
        font-weight: bold;
    }

    
</style>

<script>
export default {
    
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isAuthenticated","currentUser"]),
    },
    methods: {
        checkLogIn(){
            if(!this.isAuthenticated){
                this.$router.push('/logIn')
                window.scrollTo(0, 0);
        }else{
            this.$toast.add({
                severity: "info",
                summary:"You are already logged in",
                life: 3000
            })
        }}, 
        checkSignUp(){
            if(!this.isAuthenticated){
                this.$router.push('/signUp')
                window.scrollTo(0, 0);
            }else{
                this.$toast.add({
                    severity: "info",
                summary:"You are already logged in",
                life: 3000
                })
            }
        },
        cannotProfile(){
            if(this.isAuthenticated){
                this.$router.push('/profile')
                window.scrollTo(0, 0);
            }else{
                this.$toast.add({
                    severity: "info",
                summary:"You need to be logged in",
                detail: "Sign up for an account if you don't have one",
                life: 3000
                })
            }
        },
    
        display() {
            this.$toast.add({
                    severity: "info",
                    summary: "Joined mailing list successfully",
                    detail: "Look out for exciting updates!",
                    life: 3000,
                    
            });
        }
    },
}
</script>