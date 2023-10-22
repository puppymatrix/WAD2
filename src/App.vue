<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue"


// async function test() {
//     const docRef = doc(db, "cities", "SF");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }

// test();

</script>

<template>
    <header>
        <div class="wrapper">
            <NavBar />
        </div>
    </header>

    <RouterView />

    <Footer />
</template>

<style scoped></style>

<script>
   
</script>
