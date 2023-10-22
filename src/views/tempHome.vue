<script>
import uploadFile from '../Backend/uploadFile.vue';
import api_example from '../Backend/api_example.vue';

export default {
  components: {
    uploadFile,
    api_example,
  }
}
</script>

<template>
    <uploadFile />
    <hr>
    <api_example />
</template>