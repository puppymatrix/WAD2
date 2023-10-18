<script setup>
import { RouterLink, RouterView } from "vue-router";
import { db } from "@/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import NavBar from "@/components/NavBar.vue";

async function test() {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

test();
</script>

<template>
    <header>
        <div class="wrapper">
            <NavBar />
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
