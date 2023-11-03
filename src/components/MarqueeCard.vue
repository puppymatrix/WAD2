<template>
    <router-link style="text-decoration: none"
    :to="{
          name: 'listing',
          query: { Id: listingId},
        }"
      @mouseover="(hover = true), $emit('switch')"
      @mouseout="(hover = false), $emit('switchOn')"
    >
      
      <div class="card">
        <img
          :class="{ unfade: hover, faded: !hover }"
          class="card-img-top marquee-listing-image position-absolute "
          :src="listingImage"
          height="180"
          width=""    
        />
        <div class="card-body border-top">
          <h6 class="card-title text-center marquee-listing-name">
            {{ listingName }}
          </h6>
        </div>
      </div>

      <!-- <div >
        sux
      </div> -->

    </router-link>
  </template>
  
  <script>
  export default {
    name: "MarqueeCard",
    emits: ["switch", "switchOn"],
    props: ["listingName", "listingImage", "listingId", "listingPrice", "loading"],
    data() {
      return {
        hover: false,
      };
    },
    mounted() {
      
    },
  };
  </script>
  
  <style scoped>
  h6 {
    font-weight: 400;
  }
  
  .card:hover {
    transform: scale(1.1);
  }
  .marquee-listing-image {
    transition: all 0.4s;
    position: absolute;
    object-fit: cover;
    height: 270px;
    max-width: 300px;
    padding: 10px;
    text-wrap: wrap;
  }
  
  .marquee-listing-name {
    position: relative;
    color: black;
    font-size: large;
    text-decoration: none;
    font-weight: bold;
    vertical-align: middle;
  }

  .card-body {
    background-color: #f5f5f5;
    z-index: 1;
    width: 80%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
  }


  .card {
    height: 100%;
    width: 200px;
    border: 0px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: transparent;
    position: relative;
  }
  </style>
  