import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/HomePage.vue';
import CharacterPage from '../components/CharacterPage.vue';
import EpisodePage from '../components/EpisodePage.vue';
import LocationPage from '../components/LocationPage.vue'; 
import LocationDetail from '../components/LocationDetail.vue';
import CharacterDetail from '../components/CharacterDetail.vue';
import EpisodeDetail from '../components/EpisodeDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Homepage,
    },
    {
      path: '/characters',
      name: 'character',
      component: CharacterPage,
    },
    {
      path: '/Episodes',
      name: 'episode',
      component: EpisodePage,
    },
    {
      path: '/Locations',
      name: 'location',
      component: LocationPage,
    },
    { path: '/Episode/:id', name: 'EpisodeDetails', component: EpisodeDetail },
    { path: '/Character/:id', name: 'CharacterDetails', component: CharacterDetail },
    { path: '/Location/:id', name: 'LocationDetails', component: LocationDetail },
  ]
});

export default router;
