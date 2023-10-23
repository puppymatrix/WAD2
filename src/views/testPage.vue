<script>
import uploadFile from '../Backend/uploadFile.vue';
import api_example from '../Backend/api_example.vue';
import user_api from '../Backend/user_api.vue';
import setup from '../Backend/setUp.vue';

export default {
  components: {
    uploadFile,
    api_example,
    user_api,
    setup
  }
}
</script>

<template>
    <!-- <uploadFile />
    <hr>
    <api_example />
    <hr> -->
    <user_api />

</template>