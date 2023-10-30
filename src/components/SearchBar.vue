<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <!-- search bar -->
    <div class="container-fluid my-3">
        <div class="input-group">
            <input
                type="search"
                class="form-control bg-secondary-subtle"
                placeholder="Find the food you want!"
                @keyup.enter="updateSearch(query)"
                v-model="query"
            />
            <Button @click="updateSearch(query)" class="rounded-end">
                <Icon icon="ic:outline-search" color="white" width="20" />
            </Button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['search'],
    data() {
        return {
            query: "",
        };
    },
    methods: {
        updateSearch() {
            // Emit the custom event "updateSearch" with the current search location
            // console.log('query', this.modelValue);
            this.$emit("search", this.query);
        },
    },
};
</script>
