<template>
  
  <swiper
    class="mySwiper"
    :slides-per-view="1"
    :space-between="10"
    loop
    :autoplay="{ delay: 3000 }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
     <img :src="slide.image" :alt="slide.alt" class="w-full h-auto rounded-lg shadow-lg" />
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
    { image: 'https://images7.alphacoders.com/133/1335145.jpg', alt: 'Slide 1' },
    { image: 'https://c4.wallpaperflare.com/wallpaper/410/59/609/rick-and-morty-tv-rick-sanchez-morty-smith-wallpaper-preview.jpg', alt: 'Slide 2' },
    { image: 'https://wallpapers.com/images/featured/rick-and-morty-cool-t3ynu5ly9m7jq6e2.jpg', alt: 'Slide 3' },
  ])
  </script>
  
