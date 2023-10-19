<script setup></script>

<template>
    <!-- search bar -->
    <div class="container-fluid my-3">
        <form class="d-flex" role="search">
            <div class="input-group">
                <input
                    type="search"
                    class="form-control bg-secondary-subtle"
                    placeholder="Find the food you want!"
                />
                <button
                    class="btn text-bg-listing d-flex align-items-center justify-content-center"
                    type="button"
                    id="button-addon2"
                >
                <!-- <i class="search"></i> -->
                <img src="../components/icons/search.jpeg" class="img-fluid" style="width:20px; color: white;"
                />
                </button>
            </div>
        </form>
    </div>

</template>

<style>
    .text-bg-listing {
    background-color: #55BC03;
    color: white;
}
</style>