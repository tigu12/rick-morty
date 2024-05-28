<template>
  
  <swiper
    class="mySwiper"
    :slides-per-view="1"
    :space-between="10"
    loop
    :autoplay="{ delay: 3000 }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <img :src="(`src/assets/pictures/${slide.image}`)" :alt="slide.alt" class="w-full h-auto rounded-lg shadow-lg" />
    </swiper-slide>
  </swiper>


  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SwiperCore, { Autoplay } from 'swiper/core'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  
  // Import Swiper's CSS
  import 'swiper/swiper-bundle.css'
  
  // Install Swiper modules
  SwiperCore.use([Autoplay])
  
  // Define your slides data
  const slides = ref([
    { image: 'pic2.webp', alt: 'Slide 1' },
    { image: 'pic7.jpg', alt: 'Slide 2' },
    { image: 'pic5.jpg', alt: 'Slide 3' },
  ])
  </script>
  