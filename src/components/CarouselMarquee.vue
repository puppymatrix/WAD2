<script setup>
    import {getAllListings} from '../firebase/api.js';
    import { Vue3Marquee } from "vue3-marquee";
    import MarqueeCard from "./MarqueeCard.vue";
</script>


<!-- Pull the images from firestore and the name of the place -->
<template>
    <div class="marquee">
      <Vue3Marquee class="carousel" :pauseOnHover="true" :duration="200">
        <div class="" v-for="listing in allListings" :key="listing">
          <MarqueeCard
            class="marquee-card"
            v-on:switch="hideBtn"
            v-on:switchOn="showBtn"
            :listingName="listing.details.ListingName"
            :listingImage="listing.details.ImageUrls[0]"
            :listingId = "listing.Id"
            :listingPrice = "listing.details.Price"
          ></MarqueeCard>
        </div>
      </Vue3Marquee>
      <!-- <div class="marquee-footer">
        <div class="text-center marquee-anywhere mt-5">
          <router-link
            :to="
              `/universityInfo/` +
              universityNames[getRandomInt(universityNames.length)]
            "
          >
            <a class="marquee-btn marquee-btn-hide">Take me anywhere</a>
          </router-link>
        </div>
        <div class="text-center marquee-seeAllUni marquee-btn-hide">
          <router-link to="/UniversityPage" id="seeUni">
            See All Universities
          </router-link>
        </div>
      </div> -->
    </div>
  </template>
  
  <script>
//   import { Vue3Marquee } from "vue3-marquee";
//   import { ArrowRightOutlined } from "@ant-design/icons-vue";
//   import MarqueeCard from "./MarqueeCard.vue";
//   import { fireStore } from "@/service/Firebase/firebaseInit";
//   import { collection, getDocs } from "firebase/firestore";
  
  export default {
    name: "CardsPauseOnHover",
    components: {
      Vue3Marquee,
    //   ArrowRightOutlined,
      MarqueeCard,
    },
    data() {
      return {
        hover: false,
        allListings: [],
      };
    },
    mounted() {
      this.getListingObj();
    },
    methods: {
        async getListingObj() {
            const listings = await getAllListings();
            this.allListings = listings;
            // console.log(this.allListings);
        },
  
      hideBtn() {
        this.hover = true;
      },
      showBtn() {
        this.hover = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .marquee {
    height: 380px;
    padding: 10px;
  }
  
   
  /* .marquee-header {
    padding-top: 20px;
    padding-bottom: 0px;
    font-size: 1rem;
    color: white;
  } */

  .carousel{
    height: 100%;
  }

  .marquee-card:hover{
    cursor: pointer;
  }
  
  .marquee-card{
    height: 100%;
    width: 100%;
    margin: 10px;
  }

  /* .marquee-seeAllUni {
    margin-top: 15px;
    font-size: 1rem;
  }
  
  .marquee-footer {
    margin-top: 20px;
    padding-top: 0px;
    padding-bottom: 30px;
  } */
/*   
  #seeUni {
    color: white;
    text-decoration: none;
  } */
  
  /* #seeUni:hover {
    text-decoration: none;
    color: #40a9ff;
  } */
  
  /* .marquee-btn {
    transition: all 0.2s;
    background-color: black;
    border: 1px solid white;
    font-size: 23px;
    border-radius: 5px;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 7px;
    padding-bottom: 7px;
    color: white;
    font-weight: 500;
  }
  
  .marquee-btn:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
    color: white;
  } */
  </style>
  