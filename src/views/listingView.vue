<script setup>
    import SearchBar from "../components/SearchBar.vue";
    import { getAllListings, filterByName } from "@/firebase/api.js"
    import { collection, getDocs, query } from "firebase/firestore";

</script>

<template>
    <body class="p-5">
        
        <!-- search bar -->
        <SearchBar />
        <div @search="searchFood"></div>

        {{ query }}

        <!-- Button-->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-10"></div>
                <div class="col-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-success d-flex align-items-center justify-content-center" @click="navigate=>{this.$router.push('/mapView')}">
                    <img src="../components/icons/googleMaps.png" alt="" class="img-fluid me-1" style="width: 20px"/>
                    Map View
                    </button>
                </div>
            </div>
        </div>

        <div class="container-fluid my-3">
            <div class="row">
                <!-- carousel -->
                <div class="col-md-6">
                    <BCarousel controls indicators imgHeight="450px">
                        <BCarouselSlide
                            img-src="https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg"
                        />
                        <BCarouselSlide
                            img-src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
                        />
                        <BCarouselSlide
                            img-src="https://images.everydayhealth.com/images/apples-101-about-1440x810.jpg"
                        />
                    </BCarousel>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col">
                            <h2>Name of Listing</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h4 id="subheader">Price: <span id="price">$5</span> | Quantity Available: <span id="qty">10</span></h4>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="card my-3" style="width: 100%">
                                <div class="card-body">
                                    <h5 class="card-title">Food Description</h5>
                                    <p class="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Category of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >Vegetable</span
                            >
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Type of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >Perishable</span
                            >
                        </div>
                    </div>

                    <div class="row pt-1 pb-2">
                        <div class="col">
                            <h6 class="d-inline">Listing Expiry Time:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >11/10/23</span
                            >
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Location:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >Ang Mo Kio Avenue 3</span
                            >
                        </div>
                    </div>

                    <div class="row pt-2">
                        <div class="col">
                            <div class="d-grid">
                                <button
                                    class="btn btn-success text-bg-listing"
                                    type="button"
                                >
                                    Chope!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid mb-3">
            <div class="p-2 bg-body-secondary rounded-3">
                <div class="container-fluid py-2">
                    <div class="row">
                        <div class="col">
                            <img
                                src="../components/icons/images/user.png"
                                class="img-fluid"
                                alt="..."
                                style="width: 30px"
                            />
                            <span class="username align-middle ms-2">Justin123</span>
                        </div>

                        <div class="col">
                            <span class="align-middle ms-2">Category: </span>
                            <span class="badge userInfo text-bg-secondary">Business</span>
                        </div>

                        <div class="col">
                            <span class="align-middle ms-2"
                                >Number of Listings:
                            </span>
                            <span class="badge userInfo text-bg-secondary">10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <h5>Similar food listings</h5>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row g-3">
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm">
                                <img
                                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
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
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm">
                                <img
                                    src="https://chipguanheng.com/wp-content/uploads/Baileys-Original-Ice-Cream-Pints-Pack-of-2-Pints-x-500ml-scaled.jpg"
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
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm">
                                <img
                                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
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
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm">
                                <img
                                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
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
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="card shadow-sm">
                                <img
                                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg"
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
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>



<style scoped>

#subheader{
    color: grey;
}

#price{
    font-size: 1.5rem;
    color: #558C03;
    font-weight: bold;
}

#qty{
    font-size: 1.5rem;
    color: #558C03;
    font-weight: bold;
}
.text-bg-listing {
    background-color: #558C03;
    padding: 10px;
    color: white;
}

.card-img-top {
    width: 100%;
    height: 25vw;
    object-fit: cover;
}

.username{
    font-size: 1.5rem;
    font-weight: bold;
    color: #558C03;
}

.userInfo{
    padding: 10px;
}

</style>
