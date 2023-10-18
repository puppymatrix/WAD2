<template>
    <div class="container-fluid">
        <div class="row">
            <!-- add in gif thingy -->
            <div class="col-6">
                <!-- TODO: CREATE GIF -->
                <!-- <img src="homepageGif.gif"> -->

            </div>
            <!-- link to search bar -->
            <div class="col-6">
                <input type="text" v-bind="searchInput" placeholder="Enter a cuisine, restaurant or location">
                <button type="submit" class="btn" @keyup.enter="searchDatabase()">Let's Go!</button>
            </div>
        </div>

        <!-- <div class="row"> -->
            <!-- <div class="col"> -->
                <!-- may change to featured food if unable to get location data -->
                <!-- <h2>Featured: Food Near You </h2>  -->
                <!-- food carousel -->
                <!-- <div id="carouselExampleControls" class="carousel">
                    <div class="carousel-inner"> -->
                        <!-- need to populate using database aka shift this down to function and process using data -->
                        <!-- <div class="carousel-item active">
                            <div class="card">
                                <div class="img-wrapper"><img src="..." class="d-block w-100" alt="..."> </div>
                                <div class="card-body">
                                    <h5 class="card-title">food1</h5>
                                    <p class="card-text">text desription of food/cuuisine? maybe buttons</p>
                                    <a href="#" class="btn btn-primary">link to listing</a>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="card">
                                <div class="img-wrapper"><img src="..." class="d-block w-100" alt="..."> </div>
                                <div class="card-body">
                                    <h5 class="card-title">food2</h5>
                                    <p class="card-text">text</p>
                                    <a href="#" class="btn btn-primary">link to listing</a>
                                </div>
                            </div>
                        </div> -->
                        <!-- buttons -->
                        <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- this shows sponsors (can either use grid and hyperlink or just 1 image) -->
        <div class="row">
            <div class="col">

            </div>
        </div>
        <!-- statistics -->
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel-inner {
  padding: 1em;
}
.card {
  margin: 0 0.5em;
  box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
  border: none;
}
.carousel-control-prev,
.carousel-control-next {
  background-color: #e1e1e1;
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}
@media (min-width: 768px) {
  .carousel-item {
    margin-right: 0;
    flex: 0 0 33.333333%;
    display: block;
  }
  .carousel-inner {
    display: flex;
  }
}
.card .img-wrapper {
    max-width: 100%;
    height: 13em;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card img {
    max-height: 100%;
}
@media (max-width: 767px) {
  .card .img-wrapper {
    height: 17em;
  }
}
/*  */

</style>



<script >
// vue part
export default {
  data() {
    return {
      searchInput: '',
    }
  },
  methods:{
    searchDatabase(){
      //take searchInput and pass into database 
    }
  }
}




</script>




