<script setup></script>

<template>
    <!--Footer-->

    <div class="row footer" id="" style="height: 400px">

        <!-- first column -->
        <div class="col-4">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <div class="container justify-content-center align-items-center">
                        <div class="row">
                            <img src="images/logo.png" alt="" class="p-4" style="width: 80%">
                        </div>
                        <div class="row text-white">
                            Copyright © 2020 FoodCatch Pte Ltd. <br>
                            All rights reserved
                        </div>
                        <div class="row" style="margin-top: 20%">
                            <div class="col-10 ps-0">
                                <img src="images/icons/instagram.png" alt="" class="img-fluid">
                                <img src="images/icons/basketball.png" alt="" class="img-fluid">
                                <img src="images/icons/twitter.png" alt="" class="img-fluid">
                                <img src="images/icons/youtube.png" alt="" class="img-fluid">
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>

        <!-- second column -->

        <div class="col-2 text-white">
            <h3>Company</h3>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="#">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Contact Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-disabled="true">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-disabled="true">Testimonials</a>
                </li>
            </ul>
        </div>

        <!-- third column -->
        <div class="col-2 text-white">
            <h3>Support</h3>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" aria-current="page" href="#">Help Center</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Terms of Service</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#">Legal</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-disabled="true">Privacy Policy</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" aria-disabled="true">Status</a>
                </li>
            </ul>
        </div>

        <!-- fourth column -->
        <div class="col-3 text-white">
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
        <div class="col-1"></div>
    </div>
</template>

<style>
    .footer {
        background-color: #263238;
        padding-top: 80px;
        padding-bottom: 100px;
    }

    .footerBtn{
        background-color: #558C03;
        color: white;
    }
</style>