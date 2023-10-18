<template>
    <div class="container-fluid">
        <div class="row">
            <!-- add in gif thingy -->
            <div class="col-6">
                <!-- TODO: CREATE GIF -->
                <!-- <img src="homepageGif.gif"> -->

            </div>
            <!-- link to search bar -->
            <div class="col-6">
                <input type="text" v-bind="formData.searchInput" placeholder="Enter a cuisine, restaurant or location">
                <button type="submit" class="btn" @keyup.enter="searchDatabase">Let's Go!</button>
            </div>
        </div>

        <div class="row"> 
            <div class="col">
                <!-- may change to featured food if unable to get location data -->
                <!-- <h2>Featured: Food Near You </h2>  -->
                <!-- food carousel -->
                <div class="carousel-container">
                <button class="prev-button" @click="moveCarousel(-1)">Previous</button>
                <div class="carousel">
                    <div v-for="(image, index) in images" :key="index" class="carousel-slide">
                    <img :src="image.url" :alt="image.title" />
                    <div class="image-info">
                        <h2>{{ image.title }}</h2>
                        <p>{{ image.description }}</p>
                        <a :href="image.link" target="_blank">Learn More</a>
                    </div>
                    </div>
                </div>
                <button class="next-button" @click="moveCarousel(1)">Next</button>
                </div>
            </div>
        </div>
        <!-- this shows sponsors (can either use grid and hyperlink or just 1 image) -->
        <div class="row">
            <div class="col">
                <h1>SPONSORS</h1>
            </div>
        </div>
        <!-- statistics -->
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.landing-page {
  text-align: center;
}

.carousel-container {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  flex: 1;
}

.carousel-slide {
  flex: 0 0 33.33%;
}

img {
  width: 100%;
  height: auto;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>


<script>
// Import necessary functions and modules from Vue
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase initialization from firebase.js

export default {
  data() {
    return {
      formData: {
        searchInput: '',
      },
      images: [], // Initialize as an empty array for the carousel
    };
  },
  methods: {
    searchDatabase(userInput) {
      // Your search function logic
    },
    populateFoodNearYou() {
      // Your function to fetch top listings
    },
  },
  setup() {
    const currentIndex = ref(0);

    const moveCarousel = (step) => {
      currentIndex.value += step;
      if (currentIndex.value < 0) {
        currentIndex.value = images.length - 3; // Show 3 images at a time
      } else if (currentIndex.value > images.length - 3) {
        currentIndex.value = 0;
      }
    };

    onMounted(async () => {
      // Fetch image data from Firebase Firestore
      const imagesCollection = collection(db, 'images'); // Replace 'images' with the name of your Firestore collection
      const querySnapshot = await getDocs(imagesCollection);
      this.images = querySnapshot.docs.map((doc) => doc.data());
    });

    return {
      currentIndex,
      moveCarousel,
    };
  },
};
</script>


<!-- THIS IS FOR FIREBASE.JS
    import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
 -->