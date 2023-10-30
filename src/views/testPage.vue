<script>
import upload_file from "../Backend/upload_file.vue";
import api_example from "../Backend/api_example.vue";
import user_api from "../Backend/user_api.vue";
import setup from "../Backend/setUp.vue";
import { mapGetters } from "vuex";
import SearchBar from "../components/SearchBar.vue";

export default {
    components: {
        upload_file,
        api_example,
        user_api,
        setup,
        SearchBar
    },
    data() {
        return {
            query: "",
        };
    },
    computed: {
        // ...mapState(["userLoggedIn"]), // Map the userLoggedIn state from the store
        ...mapGetters(["isAuthenticated", "currentUser"]),
    },
};
</script>

<template>
    <!-- <SearchBar v-model="query" /> -->
    {{ query }}
    <!-- <setup /> -->
    <!-- <hr> -->
    <upload_file />
    <!-- <hr> -->
    <!-- <api_example /> -->
    <hr />
    <!-- <user_api /> -->
    <!-- <p> {{ currentUser }} </p>
    <p> {{ isAuthenticated }} </p> -->
</template>
