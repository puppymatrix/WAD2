<template>
    <div>
        <h1>Listing Page</h1>
        <BCarousel controls indicators>
            <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=1" />
            <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=2" />
            <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=3" />
        </BCarousel>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
