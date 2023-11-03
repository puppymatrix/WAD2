<script setup>
    import CarouselMarquee from "@/components/CarouselMarquee.vue";
    import ScrollTop from 'primevue/scrolltop'
</script>

<template>
    <ScrollTop/>
    <div class="container-fluid bod">
        <div class="row">
            <!-- Header Design -->
            <div class="col p-0 firstRow">
                <video id="homeImage" src="../components/images/landingPage/homePage.mp4" autoplay muted loop></video>
                <div id="searchText">
                    <h1 class="welcome">Reduce food waste today with FoodCatch! </h1><br>
                    <div class="input-group mb-3 px-5">
                        <input type="text" class="form-control" placeholder="Input the food you want to search for..." v-model="searchInput" @keyup.enter="navigate">
                        <button class="btn btn-outline-secondary" type="button" style="color: white; background-color: #97BF04; border: none;" @click="navigate">Let's Go!</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row secondRow py-5">
            <h2 class="carouselHeader font-weight-light text-center pt-3 mb-0" style="color:#ebf1e7"> Featured: Good Deals Available! </h2>
            <CarouselMarquee/>
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
                        <p class="text-left" style="color: white;">FoodCatch is a platform that aims to reduce food waste by connecting consumers to food establishments and fellow Singaporeans with excess food. This is in alignment with SDG12 - Ensuring Sustainable Consumption </p>
                    </div>
                </div>     
            </div>
        </div>

        <!--Statistics-->

        <div id="stats" class="row d-flex justify-content-center align-items-center">
            <div class="col-12 stats p-5 stats1">
                <h3 class="statsHeader">Singaporeans throw away more than 2,000 tonnes of food daily</h3>
                <p class="statsDesc num1">That's equivalent to 2 million kilograms!</p>
            </div>

            <div class="col-12 stats p-5 stats1">
                <h3 class="statsHeader">9 million people are reported to die from hunger each year</h3>
                <p class="statsDesc num2">This includes 3.1 million children!</p>
            </div>

            <div class="col-12 stats p-5 stats1">
                <h3 class="statsHeader">Food waste produces a lot of greenhouse gases</h3>
                <p class="statsDesc num3">This causes global warming and climate change!</p>
            </div>
        </div>

        <!--Key Partner-->
        <div id="partners" class="row sponsors" >
            <h3 class="text-center m-0 " style="color:#ebf1e7">Our Partners</h3>
            <!-- <div style="border-top: 1px solid #0b2b26;"></div> -->
            <div class=" col-sm-3 partnerCol p-4">
                <a href="https://www.fairprice.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/fairpriceIcon.png">
                </a>
            </div>
            <div class=" col-sm-3  partnerCol p-4">
                <a href="https://www.breadtalk.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/breadtalk.png">
                </a>
            </div>
            <div class="col-sm-3  partnerCol p-4">
                <a href="https://shengsiong.com.sg/">
                    <img class="partnerIcon" src="../components/images/landingPage/partnerIcons/shengsiong.png">
                </a>
            </div>
            <div class="col-sm-3 partnerCol  p-4">
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
    background-color: #b08430;
    /* height: 500px */
    
}

.carouselHeader{
    color:  #0b2b26;
    text-align: center;
    font-weight: bold;
}


#stats{
    background-image: url("../components/images/landingPage/stats-background.jpg");
    background-size: cover;
    opacity: 80%;
    padding: 20px;
    transition: 0.5s;
}


.stats{
    position: relative;
    border: border solid 1px;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.971);  
}

.stats1{
    opacity: 0;
    transition: all 3s;
    transform: translateX(-100%);
    filter: blur(5px);
}

.show{
    opacity: 0.8;
    transform: translateX(0px);
    filter: blur(0px);
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
    background-color: #b08430;
    padding: 20px;

}
.partnerCol{
    text-align: center;
    margin: auto
}
.partnerIcon{
    max-width: 70%;
}


</style>



<script >

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
  mounted(){
    this.scrollWords()
    },
  methods:{
    navigate(){
    this.$router.push(`/allListings?search=${this.searchInput}`)
    },
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

    async scrollWords(){
        // animation
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry) => {
                if (entry.isIntersecting){
                    entry.target.classList.add('show')
                }else{
                    entry.target.classList.remove('show')
                }
            })
        })
        const aboutUs = document.querySelectorAll('.stats1');
        aboutUs.forEach((el) => {
            observer.observe(el)
        });

    },
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




