<script setup></script>

<template>
    <body>
        <h1 class="px-3">Listing Page</h1>

        <!-- search bar -->
        <div class="container-fluid my-3">
            <form class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button class="btn btn-success" type="submit">Search</button>
            </form>
        </div>

        <!-- 2 buttons -->
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-8"></div>
                <div class="col-2">
                    <button type="button" class="btn btn-outline-success">
                        Show Stats
                    </button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-outline-success">
                        Map View
                    </button>
                </div>
            </div>
        </div>

        <!-- carousel -->
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <BCarousel controls indicators imgHeight="450px">
                        <BCarouselSlide
                            img-src="https://picsum.photos/1024/480/?image=1"
                        />
                        <BCarouselSlide
                            img-src="https://picsum.photos/1024/480/?image=2"
                        />
                        <BCarouselSlide
                            img-src="https://picsum.photos/1024/480/?image=3"
                        />
                    </BCarousel>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h2>Name of Listing</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h4>Quantity Available</h4>
                        </div>
                    </div>

                    <div class="row">
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
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Category of Food Listing:</h6>
                            <span class="badge text-bg-listing">Vegetable</span>
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Location:</h6>
                            <span class="badge text-bg-listing"
                                >Ang Mo Kio</span
                            >
                        </div>
                    </div>

                    <div class="row py-1">
                        <div class="col">
                            <h6 class="d-inline">Price:</h6>
                            <span class="badge text-bg-listing">$5</span>
                        </div>
                    </div>

                    <div class="row pt-1 pb-2">
                        <div class="col">
                            <h6 class="d-inline">Listing Expiry Time:</h6>
                            <span class="badge text-bg-listing">11/10/23</span>
                        </div>
                    </div>

                    <div class="row pb-2">
                        <div class="col-10">
                            <span class="border border-dark d-flex"></span>
                        </div>
                        <div class="col-2"></div>
                    </div>

                    <div class="row pt-2">
                        <div class="col-10">
                            <div class="d-grid">
                                <button class="btn btn-success text-bg-listing" type="button">
                                    Chope!
                                </button>
                            </div>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
.text-bg-listing {
    background-color: rgb(67, 160, 70, 1);
}
</style>
