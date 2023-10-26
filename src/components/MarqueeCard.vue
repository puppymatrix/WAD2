<template>
    <!-- <router-link
      :to="`/universityInfo/` + universityName"
      @mouseover="(hover = true), $emit('switch')"
      @mouseout="(hover = false), $emit('switchOn')"
    > -->
      <img
        :class="{ unfade: hover, faded: !hover }"
        class="marquee-listing-image"
        :src="listingImage"
        width="235"
        height="350"
      />
      <h6 class="marquee-listing-name text-center">{{ listingName }}</h6>
    <!-- </router-link> -->
  </template>
  
  <script>
  export default {
    name: "MarqueeCard",
    emits: ["switch", "switchOn"],
    props: ["listingName", "listingImage"],
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
    height: 100%;
  }
  
  .marquee-listing-name {
    position: relative;
    color: white;
    font-size: x-large;
  }
  
  .unfade {
    filter: grayscale(0%);
  }
  
  .faded {
    filter: grayscale(80%);
  }
  </style>
  