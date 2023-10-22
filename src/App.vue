<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
    <header>
        <div class="wrapper">
            <NavBar />
        </div>
    </header>

    <RouterView />

    <div class="wrapper">
        <Footer />
    </div>
    
</template>

<style scoped></style>

<script>
   
</script>
