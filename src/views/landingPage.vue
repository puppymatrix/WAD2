<template>
    <div class="container-fluid bod">
        <div class="row">
            <!-- add in gif thingy -->
            <div class="col px-0 firstRow">
                <!-- TODO: CREATE GIF -->
                <video id="homeImage" src="../components/images/landingPage/homePage.mp4" autoplay muted loop></video>

            </div>
            <!-- link to search bar -->
            <div class="col-6 p-0 d-flex justify-content-center align-items-center" style="background-color: #263238; text-align: center">
                <div id="searchText">
                    <h1 class="">Help reduce food waste today</h1><br>
                    <div class="input-group mb-3 px-5">
                        <input type="text" class="form-control" placeholder="Enter a cuisine, restaurant or location" v-bind="searchInput">
                        <button class="btn btn-outline-secondary" type="button" style="color: white; background-color: #97BF04;" @keyup.enter="searchDatabase()">Let's Go!</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- problematic carousel row -->
        <div class="row secondRow">
          <div class="col">
            <div class="container text-center my-4">
            <h2 class="font-weight-light">Featured: Food Near You</h2>
            <div class="row mx-auto my-auto justify-content-center">
                <div id="reccoCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner" role="listbox">
                    <!-- <div class="carousel-inner" role="listbox" v-html="carousel"> -->
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
                    <a class="carousel-control-prev bg-transparent w-aut" href="#reccoCarousel" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </a>
                    <a class="carousel-control-next bg-transparent w-aut" href="#reccoCarousel" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- this shows sponsors (2 rows 4 col each grid) -->

 
        <!-- statistics -->
        <div class="row stats1">
            <div class="col-5 p-5 text-light ml-3">
                <h2><strong>In Singapore alone, 2,000 tonnes of food is thrown away daily.</strong></h2>
                <h3>That's equivalent to...</h3>
                <ul>
                    <li>1 elephant</li>
                    <li>10 million cats</li>
                    <li>the empire state building</li>
                </ul>
            </div>
            <div class="col-7">
                image or smth
            </div>
        </div>
        <div class="row stats">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>
        <div class="row stats">
            <div class="col">
                <h1>insert stats/charts/graphs</h1>
            </div>
        </div>

        <div class="row mb-5 sponsors">
            <h2 class="pb-5" style="text-align: center;"> Our Partners </h2>
            <div class="col-3 partnerCol">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/fairpriceIcon.png">
                </a>
                
            </div>
            <div class="col-3 partnerCol">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/breadtalk.png">
                </a>
            </div>
            <div class="col-3 partnerCol">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/shengsiong.png">
                </a>
            </div>
            <div class="col-3 partnerCol">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/fairpriceIcon.png">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bod{
    background-color: #0b2b26;
}
.stats1{
    
}
#searchText{
    position: absolute;
    justify-content: center;
    top: 20%
}
h1{
    font-size: 6vw;
    color: black
    
}
.firstRow{
    position: relative;
    
}
.secondRow{
    background-color: #fffdd0;
}

#homeImage{
    width:100%;
    height: auto;
    background: black;
    filter:opacity(80%);
}

.sponsors{
    padding-left: 10%;
    padding-right: 10%;
    background-color: #fffdd0;
    padding-top: 1%;
    padding-bottom: 3%;

}
.partnerCol{
    text-align: center;
}
.partnerIcon{
    max-width: 70%;
}
.stats{
    text-align: center;
}
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
// import { db } from "@/firebase";
// import { db } from "@/firebase";
// import { collection, doc, setDoc, getDocs } from "firebase/firestore";

// async function getAllListings() {
//     const querySnapshot = await getDocs(collection(db, "listings"));
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());
//         console.log(doc.data().Image[0])
//     });
    
// }

// getAllListings();

// vue part
export default {
  data() {
    return {
      searchInput: '',
      dataObj: {}, //this is data returned from database
      
    }
  },
  methods:{
    searchDatabase(){
      //take searchInput and pass into database 
      
    }, 
    findListings(){
      //search for top 10 listings near user and return as dataObj, used to put this into makecarousel later on

    },
    makeCarousel(){
      
    }
    // makeCarousel(){
    //   //make carousel 
    //   let counter = 0
    //   //add html code to carousel 
    //   for(listingKey in this.dataObj){
    //     for(listingObj in this.dataObj[listingKey]){
    //       //decide 'active' tag
    //       if(counter == 0){
    //         //need to edit card stuff
    //         this.carousel += `<div class="carousel-item active">
    //                         <div class="col-md-3">
    //                             <div class="card">
    //                                 <div class="card-img">
    //                                     <img src="{{ listingObj.image[0] }}" class="img-fluid">
    //                                 </div>
    //                                 <div class="card-img-overlay">Slide 1</div>
    //                             </div>
    //                         </div>
    //                     </div>`
    //         counter += 1
    //     }else{
    //       this.carousel += `<div class="carousel-item">
    //           <div class="col-md-3">
    //               <div class="card">
    //                   <div class="card-img">
    //                     <img src="{{ listingObj.image[0] }}" class="img-fluid">
    //                   </div>
    //                   <div class="card-img-overlay">Slide 2</div>
    //               </div>
    //           </div>
    //       </div>`
    //     }
    //     }
    //   }
    // }
    
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




