<script setup>
</script>

<template>
    <body>
        <h1 class="px-3">All Listings Page</h1>

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

        <!-- Map View button  -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10"></div>
                <div class="col-2 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-outline-success d-flex align-items-center justify-content-center"
                    >
                        <img
                            src="../components/icons/googleMaps.png"
                            alt=""
                            class="img-fluid me-1"
                            style="width: 20px"
                        />
                        Map View
                    </button>
                </div>
            </div>
        </div>


        <!-- listings -->
        <div class="container-fluid">
            <h5>All Available Listings</h5>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <div class="card shadow-sm">
                                <img
                                    src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2Fd852987f86aeae8b65926f9e7a260c28285ea744"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                    <h5 class="card-title">Vegetables</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                        <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <IMdiuser class="me-1"/>Glenda123
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group">
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <img
                                    src="https://chipguanheng.com/wp-content/uploads/Baileys-Original-Ice-Cream-Pints-Pack-of-2-Pints-x-500ml-scaled.jpg"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                    <h5 class="card-title">Ice cream</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                        <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <IMdiuser class="me-1"/>Glenda123
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group">
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card shadow-sm">
                                <img
                                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
                                    alt=""
                                    class="card-img-top"
                                />
                                <div class="card-body border-top border-2">
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Category</h6>
                                    <h5 class="card-title">Banana</h5>
                                    <p class="card-text d-flex align-items-center mb-3">
                                        <IStreamlinetravel-map-location-pin-navigation-map-maps-pin-gps-location class="me-1"/> SMU School of Economics
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-body-secondary d-flex align-items-center">
                                        <IMdiuser class="me-1"/>Glenda123
                                    </h6>
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <div class="btn-group">
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-secondary"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </body>
</template>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
    color: white;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}
</style>