<script>
import upload_file from "../Backend/upload_file.vue";
import api_example from "../Backend/api_example.vue";
import user_api from "../Backend/user_api.vue";
import setup from "../Backend/setUp.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        upload_file,
        api_example,
        user_api,
        setup,
    },
    data() {
        return {};
    },
    computed: {
        // ...mapState(["userLoggedIn"]), // Map the userLoggedIn state from the store
        ...mapGetters(["isAuthenticated", "currentUser"]),
    },
};
</script>

<template>
    <!-- <setup />
    <hr>
    <upload_file />
    <hr>
    <api_example /> -->
    <hr />
    <user_api />
    <!-- <p> {{ currentUser }} </p> -->
</template>
