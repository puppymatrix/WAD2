<script setup>
import SearchBar from "../components/SearchBar.vue";
</script>

<template>
    <body>
        
        <!-- search bar -->
        <SearchBar />

        <!-- Map View button  -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10"></div>
                <div class="col-2 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-outline-success d-flex align-items-center justify-content-center"
                        @click="navigate=>{$router.push('/mapView')}"
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
            <h5 style="font-style: italic;">Search results for: </h5>
            <div class="filterBar row d-flex">
                <ul>
                    <li><p class="d-inline" style="margin: 2px 5px;">Sort By: </p></li>
                    <li>
                        <b-dropdown text="Price">
                        <b-dropdown-item href="#">Price: Low to High</b-dropdown-item>
                        <b-dropdown-item href="#">Price: High to Low</b-dropdown-item>
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown text="Category of Food">
                        <b-dropdown-item href="#">Vegetables</b-dropdown-item>
                        <b-dropdown-item href="#">Fruits</b-dropdown-item>
                        <b-dropdown-item href="#">Dessert</b-dropdown-item>
                        </b-dropdown>
                    </li>
                    <li>
                        <b-dropdown text="Location">
                        <b-dropdown-item href="#">Within 2km away</b-dropdown-item>
                        <b-dropdown-item href="#">Between 2k-5km</b-dropdown-item>
                        <b-dropdown-item href="#">Between 5km-10km</b-dropdown-item>
                        <b-dropdown-item href="#">More than 10km</b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
            </div>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row  g-3">
                        <div class="col-lg-3 col-md-4 col-sm-12">
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
                                                <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
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
                                            <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
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
                                            <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
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
                                            <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
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
                                            <a href="/listing">View</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-3 col-md-4">
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
                                            <a href="/listing">View</a>
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

        <!--Add Listing Button-->
        <div>
            <button
                type="button"
                class="btn addList d-flex align-items-center justify-content-center"
            ><a href="/addListing"><span style="color: white;">+</span></a></button>
        </div>

    </body>
</template>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
    color: white;
}

.filterBar{
    background-color: lightgrey;
    padding: 10px;
    margin: 5px 1px;
    border-radius: 5px;
}

.filterBar ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
}

.filterBar li{
    margin: 2px 5px;
    display: flex;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.addList{
    background-color: #83A538;
    position: fixed; 
    bottom: 0; 
    right: 0; 
    margin: 20px; 
    padding: auto; 
    height: 50px; 
    width: 50px; 
    border-radius: 50%; 
    font-size: 30px;
}
</style>