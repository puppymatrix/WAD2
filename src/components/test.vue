<script setup>
    import searchBar from '../components/SearchBar.vue'
</script>

<template>
    <h1>test</h1>
    <div @search="updateText">
        {{ text }}
    </div>
</template>

<script>

    export default {
        components:{
            searchBar
        },
        data(){
            return {
                text: ''
            }
        },
        methods: {
            updateText(data){
                console.log('data', data)
                this.text = data
            }
        }
    }
</script>