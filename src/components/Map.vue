<script setup>
  import { defineComponent } from "vue";
  import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
</script>

<template>
  <GoogleMap 
    :api-key="apiKey" 
    style="width: 100%; 
    height: 500px"
    :center="userLocation" 
    :zoom="12"
    >
    <Marker 
      :options="{position: userLocation, 
                  icon: 'src/components/icons/marker2.png',
                }">   
    </Marker>

    <Marker 
      v-for="listing in foodItemsFiltered"
      :options="{ 
                  position: {
                              lat: listing.info.details.Location.latitude, 
                              lng: listing.info.details.Location.longitude,
                            },
                  scale: 1,
                }">

        <InfoWindow :options="{
                                minWidth: 100,
                                maxWidth: 300           
                                }" >
            <div class="card">
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner"
                        v-for="(url, index) in listing.info.details.ImageUrls" :key="index" 
                        :class="index == 0 ? 'carousel-item active' : 'carousel-item'">                
                            <img :src=url class="d-block w-100" alt="..."> 
                    </div>
                        
                    
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>

                </div>

                <div class="card-body">
                    <h5 class="card-title">{{ listing.info.details.ListingName }}</h5>
                    <ul>
                        <li>Category: {{ listing.info.details.Category }}</li>
                        <li>Expiry Date: {{ listing.info.details.ExpiryDate.toDate() }}</li>
                        <li>Perishable: {{ listing.info.details.Perishable ? "Yes": "No" }}</li>
                        <li>Price: {{ listing.info.details.Price }}</li>
                        <li>Quantity Available: {{ listing.info.details.QtyAvailable }}</li>
                    </ul>                                
                    <a href="#" class="btn btn-link">View more...</a>
                </div>
            </div>
        </InfoWindow>
    </Marker>
  </GoogleMap>  
</template>

<script>

// const { marker } = await await google.maps.importLibrary("marker")

export default defineComponent({
  components: { GoogleMap, Marker, InfoWindow },

  props: {
    apiKey: {
      type: String,
      required: true,
    },
    userLocation: {
      type: Object,
      required: true,
    },
    foodItemsFiltered: {
      type: Array,
      required: true,
    },
    
  },
  
});
</script>