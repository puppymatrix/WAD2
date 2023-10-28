
<template>
    <!-- search bar -->
    <div class="container-fluid my-3">
        <div class="input-group">
            <input 
                type="search" 
                class="form-control bg-secondary-subtle" 
                placeholder="Find the food you want!" 
                v-model="query"
                @keyup.enter="updateSearch(query)"
            />
            <button class="btn text-bg-listing d-flex align-items-center justify-content-center" type="button" >
                <img src="../components/icons/search.jpeg" class="img-fluid" style="width:20px; color: white;"
            @click="updateSearch(query)"
            />
            </button>
        </div>
    </div>


</template>

<script>
    export default {
        data(){
            return {
                query: ""
            }
        },
        // emits: {
        //     search(query) {
        //         return typeof query === 'string' && query.length > 0
        //     }
        // },
        methods:{
            updateSearch(query) {
            // Emit the custom event "search"
            console.log('emit')
            this.$emit('search', this.query);
            },
        },

    };
</script>

<style>
    .text-bg-listing {
    background-color: #55BC03;
    color: white;
}
</style>