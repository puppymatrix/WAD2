<template>
    <router-link
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
        class="position-absolute card-img  marquee-listing-image"
        :src="listingImage"
        height="180"
        width=""    
      />
      <h6 class="marquee-listing-name text-center">{{ listingName }}</h6>
    </div>

    </router-link>
  </template>
  
  <script>
  export default {
    name: "MarqueeCard",
    emits: ["switch", "switchOn"],
    props: ["listingName", "listingImage", "listingId"],
    data() {
      return {
        hover: false,
      };
    },
    mounted() {},
  };
  </script>
  
  <style scoped>
  h6 {
    font-weight: 400;
  }
  
  .marquee-listing-image {
    transition: all 0.4s;
    position: absolute;
    object-fit: cover;
    height: 200px;
    max-width: 300px;
    padding: 10px;
    text-wrap: wrap;
  }
  
  .marquee-listing-name {
    position: relative;
    color: white;
    font-size: x-large;
    text-decoration: none;
  }
  
  .unfade {
    filter: grayscale(0%);
  }
  
  .faded {
    filter: grayscale(80%);
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
  