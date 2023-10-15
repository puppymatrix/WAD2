<script setup></script>

<template>
    <body>
        <h1 class="px-3">Listing Page</h1>

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

        <!-- 2 buttons -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-8"></div>
                <div class="col-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-success">
                        Show Stats
                    </button>
                </div>
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

        <div class="container-fluid my-3">
            <div class="row">
                <!-- carousel -->
                <div class="col-7">
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
                <div class="col-5">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col">
                            <h2>Name of Listing</h2>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col">
                            <h4>Quantity Available</h4>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col">
                            <div class="card my-3" style="width: 18rem">
                                <div class="card-body">
                                    <h5 class="card-title">Food Description</h5>
                                    <p class="card-text">
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </p>
                                    <!-- <a href="#" class="card-link">Card link</a>
                                    <a href="#" class="card-link"
                                        >Another link</a
                                    > -->
                                </div>
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row py-1">
                        <div class="col-1"></div>
                        <div class="col">
                            <h6 class="d-inline">Category of Food Listing:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >Vegetable</span
                            >
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row py-1">
                        <div class="col-1"></div>
                        <div class="col">
                            <h6 class="d-inline">Location:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >Ang Mo Kio</span
                            >
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row py-1">
                        <div class="col-1"></div>
                        <div class="col">
                            <h6 class="d-inline">Price:</h6>
                            <span class="badge text-bg-listing ms-1">$5</span>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row pt-1 pb-2">
                        <div class="col-1"></div>
                        <div class="col">
                            <h6 class="d-inline">Listing Expiry Time:</h6>
                            <span class="badge text-bg-listing ms-1"
                                >11/10/23</span
                            >
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row pb-2">
                        <div class="col-1"></div>
                        <div class="col">
                            <span
                                class="border-top border-secondary d-flex"
                            ></span>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row pt-2">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <div class="d-grid">
                                <button
                                    class="btn btn-success text-bg-listing"
                                    type="button"
                                >
                                    Chope!
                                </button>
                            </div>
                        </div>
                        <div class="col-1"></div>
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
                                src="../components/icons/user.png"
                                class="img-fluid"
                                alt="..."
                                style="width: 30px"
                            />
                            <span class="align-middle ms-2">Justin123</span>
                        </div>

                        <div class="col">
                            <span class="align-middle ms-2">Category: </span>
                            <span class="badge text-bg-secondary">NTUC</span>
                        </div>

                        <div class="col">
                            <span class="align-middle ms-2"
                                >Number of Listings:
                            </span>
                            <span class="badge text-bg-secondary">10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <h5>Similar food listings</h5>
            <div class="album py-2">
                <div class="container-fluid px-0">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div class="col">
                            <div class="card shadow-sm">
                                <svg
                                    class="bd-placeholder-img card-img-top"
                                    width="100%"
                                    height="225"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label="Placeholder: Thumbnail"
                                    preserveAspectRatio="xMidYMid slice"
                                    focusable="false"
                                >
                                    <title>Placeholder</title>
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="#55595c"
                                    />
                                    <text
                                        x="50%"
                                        y="50%"
                                        fill="#eceeef"
                                        dy=".3em"
                                    >
                                        Thumbnail
                                    </text>
                                </svg>
                                <div class="card-body">
                                    <p class="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
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
