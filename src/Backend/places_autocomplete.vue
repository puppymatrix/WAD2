<template>
    <GoogleAddressAutocomplete
        apiKey="AIzaSyBkpoc9rtXVYWw-lsJXrKwJOnMVFzURjtU"
        v-model="address"
        @callback="callbackFunction"
        class="w-25"
        placeholder="Type your pickup location here"
    />
</template>

<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "vue3-google-address-autocomplete";

const address = ref("");
const emit = defineEmits(["location-selected"]);

function callbackFunction(place) {
    // console.log(place)
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const name = place.name;
    const location = { latitude, longitude, name };
    
    // Emit an event with the location object
    emit("location-selected", location);
}
</script>
