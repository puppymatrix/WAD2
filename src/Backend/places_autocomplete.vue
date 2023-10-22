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
import { ref, defineEmits } from "vue";
import GoogleAddressAutocomplete from "vue3-google-address-autocomplete";

const address = ref("");
const emit = defineEmits(["location-selected"]);

function callbackFunction(place) {
    const latitidue = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const location = { latitidue, longitude };

    
    // Emit an event with the location object
    emit("location-selected", location);
}
</script>
