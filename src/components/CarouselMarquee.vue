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
    </div>
  </template>
  
  <script>
  
  export default {
    name: "CardsPauseOnHover",
    components: {
      Vue3Marquee,
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
  
  .carousel{
    height: 100%!important;
  }

  .marquee-card:hover{
    cursor: pointer;
  }
  
  .marquee-card{
    height: 100%;
    width: 100%;
    margin: 10px;
  }


  </style>
  