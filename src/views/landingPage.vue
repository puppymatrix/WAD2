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

        <div class="row">
          <div class="col">
              <div class="container text-center my-3">
                <h2 class="font-weight-light">Featured: Food Near You</h2>
                <div class="row mx-auto my-auto justify-content-center">
                    <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <!-- add in for loop for carousel -->
                            <div class="carousel-item active">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/31f?text=1" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 1</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/e66?text=2" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/7d2?text=3" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 3</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400?text=4" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 4</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/aba?text=5" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 5</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/fc0?text=6" class="img-fluid">
                                        </div>
                                        <div class="card-img-overlay">Slide 6</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- buttons -->
                        <a class="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a class="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
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
@media (max-width: 767px) {
    .carousel-inner .carousel-item > div {
        display: none;
    }
    .carousel-inner .carousel-item > div:first-child {
        display: block;
    }
}

.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
    display: flex;
}

/* medium and up screens */
@media (min-width: 768px) {
    
    .carousel-inner .carousel-item-end.active,
    .carousel-inner .carousel-item-next {
      transform: translateX(25%);
    }
    
    .carousel-inner .carousel-item-start.active, 
    .carousel-inner .carousel-item-prev {
      transform: translateX(-25%);
    }
}

.carousel-inner .carousel-item-end,
.carousel-inner .carousel-item-start { 
  transform: translateX(0);
}



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

let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

</script>




