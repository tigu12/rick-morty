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
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHM0dZBd2H3WHTswZZ5FNEYbTmvmJCaHdmw&s', alt: 'Slide 1' },
    { image: 'https://c4.wallpaperflare.com/wallpaper/410/59/609/rick-and-morty-tv-rick-sanchez-morty-smith-wallpaper-preview.jpg', alt: 'Slide 2' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLiBWHpBxXiHjM8AxtirViT-LLct_WkCqpidyxGX22sS_Wm3Ql3v7ra1_e_LTB1hk5NQ&usqp=CAU', alt: 'Slide 3' },
  ])
  </script>
  
