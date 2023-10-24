<script setup></script>

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
            <h3>Company</h3>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="#aboutUs">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#stats">Our Success</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#partners">Key Partners</a>
                </li>
            </ul>
        </div>

        <!-- third column -->
        <div class="col-lg-2 text-white p-4 text-center text-lg-start">
            <h3>Account</h3>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="/logIn">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/signUp">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/userProfile">User Profile</a>
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
                        <button class="btn footerBtn" type="submit">
                            <img src="images/icons/send.png" alt="" >Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    <div class="row">
        <div class="col-12 text-center copyright">
            Copyright © 2020 FoodCatch Pte Ltd. <br>
            All rights reserved
        </div>
    </div>
</template>

<style>
    .footer {
        background-color: #0b2b26;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .footerBtn{
        background-color: #558C03;
        color: white;
    }

    .copyright{
        background-color: #1A2327; 
        color: white; 
        padding: 10px;
    }

    h3{
        color: #558C03;
        font-weight: bold;
    }
</style>