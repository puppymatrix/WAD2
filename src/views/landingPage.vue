<template>
    <div class="container-fluid bod">
        <div class="row">
            <!-- Header Design -->
            <div class="col px-0 firstRow">
                <video id="homeImage" src="../components/images/landingPage/homePage.mp4" autoplay muted loop></video>

                <div id="searchText">
                    <h1 class="welcome">Reduce food waste today with FoodCatch! </h1><br>
                    <div class="input-group mb-3 px-5">
                        <input type="text" class="form-control" placeholder="Input the food you want to search for..." v-bind="searchInput">
                        <button class="btn btn-outline-secondary" type="button" style="color: white; background-color: #97BF04; border: none;" @keyup.enter="searchDatabase()">Let's Go!</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Try with firebase -->
        <!-- <div class="row">
            <Vue3Marquee :pause-on-hover="true">
                <div class="card" v-for="listing in allListings" :key="listing">
                    <img
                    :class="{ unfade: hover, faded: !hover }"
                    class="marquee-listing-image"
                    :src="listing.ImageUrls[0]"
                    width="235"
                    height="350"
                    />
                    <h6 class="marquee-listing-title display-5 text-center">{{ listing.ListingName }}</h6>
                </div>
            </Vue3Marquee>
        </div> -->

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

        <!-- About the Company -->
        <div id="aboutUs" class="row thirdRow">
            <div class="container-fluid p-4">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="row align-items-center">
                            <div class="col-6 p-4">
                                <video id="groceries1" src="..\components\images\landingPage\groceries1.mp4" autoplay muted loop style="width: 100%"></video>
                            </div>

                            <div class="col-6">
                                <div class="row d-flex justify-content-start mb-3">
                                    <div class="col">
                                        <img src="..\components\images\landingPage\groceries3.jpg" style="width: 100%; overflow: hidden;">
                                    </div>
                                </div>
                                <div class="row d-flex justify-content-start">
                                    <div class="col">
                                        <img src="..\components\images\landingPage\groceries2.jpg" style="width: 100%; overflow: hidden;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <h1 class="text-left" style="color: #97BF04;">About Us</h1>
                        <div class="typingWords">
                            <h2>
                                <span class="typed-text">{{ typeValue }}</span>
                                <span class="typed-cursor" :class="{'typing': typeStatus}">&nbsp;</span>
                            </h2>
                        </div>
                        <p class="text-left" style="color: white;">FoodCatch is a platform that aims to reduce food waste by connecting consumers to food establishments and fellow Singaporeans with excess food. This is in alignment with SDG12 - Responsible Consumption </p>
                    </div>
                </div>     
            </div>
        </div>

        <!--Statistics-->

        <div id="stats" class="row d-flex justify-content-center align-items-center">
            <div class="col-md-3 stats">
                <h3 class="statsHeader">Singaporeans throw away more than 2,000 tonnes of food daily</h3>
                <p class="statsDesc">That's equivalent to 2 million kilograms!</p>
            </div>

            <div class="col-md-3 stats">
                <h3 class="statsHeader">9 million people are reported to die from hunger each year</h3>
                <p class="statsDesc">This includes 3.1 million children!</p>
            </div>

            <div class="col-md-3 stats">
                <h3 class="statsHeader">Food waste produces a lot of greenhouse gases</h3>
                <p class="statsDesc">This causes global warming and climate change!</p>
            </div>
        </div>

        <!--Key Partner-->
        <div id="partners" class="row sponsors">
            <h1 class="text-center" style="color: #0b2b26;">Our Partners</h1>
            <div class="col-3 partnerCol">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/fairpriceIcon.png">
                </a>
            </div>
            <div class="col-3 partnerCol">
                <a href="https://www.breadtalk.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/breadtalk.png">
                </a>
            </div>
            <div class="col-3 partnerCol">
                <a href="https://shengsiong.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/shengsiong.png">
                </a>
            </div>
            <div class="col-3 partnerCol">
                <a href="https://giant.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/giant.png">
                </a>
            </div>
        </div>
    </div>
    
</template>

<style scoped>

.bod{
    background-color: #0b2b26;
}
    
#searchText{
    position: absolute;
    justify-content: center;
    align-content: center;
    top: 20%
}


h1{
    font-size: 6vw;
    color: black
    
}
.firstRow{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;  
}

#homeImage{
    width:100%;
    height: auto;
    background: black;
    filter:opacity(30%);
}

#searchText{
    position: absolute;
    justify-content: center;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.typed-text{
    color: #A1BF73;
    font-size: 4vw;
    font-weight:300;
}

.typed-cursor{
    display: inline-block;
    margin-left: 3px;
    width: 3px;
    background-color: #fff;
    animation: cursorBlink 1s infinite;
}

@keyframes cursorBlink{
    49% {background-color: #fff}
    50% {background-color: transparent}
    99% {background-color: transparent}
}

.typing{
    animation: none;
}

.welcome{
    font-size: 6vw;
    color: white;
    text-align: center;

}

.typingWords{
    margin-bottom: 10px;
    display: flex;
    justify-content: left;
}


.secondRow{
    background-color: #fffdd0;
}


#stats{
    background-image: url("../components/images/landingPage/stats-background.jpg");
    background-size: cover;
    opacity: 80%;
    padding: 20px;
}


.stats{
    position: relative;
    border: border solid 1px;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.971);
    opacity: 80%;
}

.statsHeader{
    color:  #0b2b26;
    text-align: center;
}

.statsDesc{
    font-style: bold;
    font-size: 18px;
    text-align: center;
}

.sponsors{
    background-color: #fffdd0;
    padding: 20px;

}
.partnerCol{
    text-align: center;
}
.partnerIcon{
    max-width: 70%;
    height: 50%;
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
      

      // typing effect
      typeValue: '',
      typeStatus: false,
      typeArray: ['Listing excess food', 'Purchasing excess food', 'Reducing food waste'],
      typingSpeed: 200, 
      erasingSpeed: 100, 
      newTextDelay: 2000, 
      typeArrayIndex: 0, 
      charIndex: 0
    }
  },
    // components: {
    //     Vue3Marquee
    // },
  methods:{
    typeText(){
        if(this.charIndex < this.typeArray[this.typeArrayIndex].length){
            if (!this.typeStatus){
                this.typeStatus = true;
            }

            this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
            this.charIndex += 1;

            setTimeout(this.typeText, this.typingSpeed);
        }else{
            this.typeStatus = false;
            setTimeout(this.eraseText, this.newTextDelay);
        }
    },
    eraseText(){
        if (this.charIndex > 0){
            if (!this.typeStatus){
                this.typeStatus = true;
            }

            this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex -1);
            this.charIndex -= 1;
            setTimeout(this.eraseText, this.erasingSpeed);
        }else{
            this.typeStatus = false;
            this.typeArrayIndex += 1;
            if (this.typeArrayIndex >= this.typeArray.length){
                this.typeArrayIndex = 0;
            }
            setTimeout(this.typeText, this.typingSpeed + 1000);
        }
    },
    searchDatabase(){
      //take searchInput and pass into database 
      
    }, 
    findListings(){
      //search for top 10 listings near user and return as dataObj, used to put this into makecarousel later on

    },
    makeCarousel(){
      
    },
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
  },
  
  created(){
    setTimeout(this.typeText, this.newTextDelay + 200)
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




