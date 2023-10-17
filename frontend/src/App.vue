<script setup>
import { RouterLink, RouterView } from "vue-router";
import { db } from "@/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import NavBarSignedIn from "./components/NavBarSignedIn.vue";

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
            <NavBarSignedIn />
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>