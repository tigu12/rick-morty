<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import Swiper from './Swiper.vue'

const router = useRouter()

const navigateToEpisode = (id) => {
  router.push({ name: 'EpisodeDetails', params: { id } })
}

const navigateToCharacter = (id) => {
  router.push({ name: 'CharacterDetails', params: { id } })
}

const navigateToLocation = (id) => {
  router.push({ name: 'LocationDetails', params: { id } })
}

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
        status
        gender
        species
        location {
          id
          name
        }
        episode {
          id
          name
          episode
          air_date
          created
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(CHARACTERS_QUERY)

const getUniqueItems = (items, key) => {
  const uniqueKeys = new Set()
  return items.filter(item => {
    if (!uniqueKeys.has(item[key])) {
      uniqueKeys.add(item[key])
      return true
    }
    return false
  })
}

const uniqueEpisodes = computed(() => {
  const episodes = result.value ? result.value.characters.results.flatMap(character => character.episode) : []
  return getUniqueItems(episodes, 'id')
})

const uniqueCharacters = computed(() => result.value ? getUniqueItems(result.value.characters.results, 'id') : [])

const uniqueLocations = computed(() => {
  const locations = result.value ? result.value.characters.results.map(character => character.location).filter(location => location !== null) : []
  return getUniqueItems(locations, 'id')
})

const allEpisodes = ref([])
const allCharacters = ref([])
const allLocations = ref([])
const displayedEpisodes = ref([])
const displayedCharacters = ref([])
const displayedLocations = ref([])

watchEffect(() => {
  if (uniqueEpisodes.value.length) {
    allEpisodes.value = uniqueEpisodes.value
    displayedEpisodes.value = allEpisodes.value.slice(0, 6)
  }
  if (uniqueCharacters.value.length) {
    allCharacters.value = uniqueCharacters.value
    displayedCharacters.value = allCharacters.value.slice(0, 6)
  }
  if (uniqueLocations.value.length) {
    allLocations.value = uniqueLocations.value
    displayedLocations.value = allLocations.value.slice(0, 6)
  }
})

const showMoreEpisodes = () => {
  const startIndex = displayedEpisodes.value.length
  const endIndex = Math.min(startIndex + 6, allEpisodes.value.length)
  displayedEpisodes.value = [...displayedEpisodes.value, ...allEpisodes.value.slice(startIndex, endIndex)]
}

const showMoreCharacters = () => {
  const startIndex = displayedCharacters.value.length
  const endIndex = Math.min(startIndex + 6, allCharacters.value.length)
  displayedCharacters.value = [...displayedCharacters.value, ...allCharacters.value.slice(startIndex, endIndex)]
}

const showMoreLocations = () => {
  const startIndex = displayedLocations.value.length
  const endIndex = Math.min(startIndex + 6, allLocations.value.length)
  displayedLocations.value = [...displayedLocations.value, ...allLocations.value.slice(startIndex, endIndex)]
}
</script>
<template>
  <div class="bg-black min-h-screen">
    <nav class="bg-gray-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="font-get-schwifty text-white">Rick and Morty</router-link>
        <div class="flex space-x-4 text-white">
          <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
          <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
          <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
          <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
        </div>
      </div>
    </nav>

    <div class="container mx-auto mt-8">
      <h1 class="text-4xl font-get-schwifty text-center text-blue-600 mb-8">Welcome to the Rick and Morty <br>TV Show Website!</h1>

      <div class="flex flex-col md:flex-row justify-center items-center my-8 space-y-4 md:space-y-0 md:space-x-8">
        <div class="w-full md:w-1/2">
          <Swiper />
        </div>
        <div class="w-full md:w-1/2 bg-black p-6 rounded-lg shadow-lg">
          <p class="text-base text-justify leading-relaxed mb-4 text-white">
            <b class="text-blue-600 text-xl">Overview:</b> <br>
            "Rick and Morty" is a hilarious animated series that follows the adventures of an eccentric scientist, Rick Sanchez, and his grandson Morty Smith. Together, they explore different dimensions, encounter strange beings, and navigate through mind-bending scenarios.
          </p>
          <div class="text-base text-left space-y-2 text-white">
            <p class="mb-2"><b class="text-blue-600 text-xl">Type:</b> "Rick and Morty" is an animated science fiction comedy series.</p>
            <p class="mb-2"><b class="text-blue-600 text-xl">Creators:</b> The show was created by Justin Roiland and Dan Harmon.</p>
            <p class="mb-2"><b class="text-blue-600 text-xl">Main Characters:</b> The main characters are voiced by Justin Roiland, Chris Parnell, Spencer Grammer, and Sarah Chalke.</p>
            <p class="mb-2"><b class="text-blue-600 text-xl">Review:</b> "Rick and Morty" has garnered widespread critical acclaim for its clever humor, inventive storytelling, and imaginative world-building. With high ratings on platforms like IMDb and Rotten Tomatoes, it's a must-watch for fans of animated comedy and science fiction.</p>
          </div>
        </div>
      </div>
      <div class="container mx-auto p-4">
        <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
        <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
        <div v-else class="space-y-6">
          <div>
            <h2 class="text-3xl font-bold text-blue-600 mb-6">Episodes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="ep in displayedEpisodes" :key="ep.id" class="episode-card bg-gray-800 shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:bg-gray-700" @click="navigateToEpisode(ep.id)">
                <h3 class="font-semibold text-xl text-white">{{ ep.name }}</h3>
                <p class="text-white">{{ ep.episode }}</p>
                <p class="text-white">{{ ep.air_date }}</p>
                <p class="text-white">{{ ep.created }}</p>
              </div>
            </div>
            <button v-if="displayedEpisodes.length < allEpisodes.length" @click="showMoreEpisodes" class="text-blue-600 font-semibold hover:underline mt-4">Show More</button>
          </div>
        
<div>
  <h2 class="text-3xl font-bold text-blue-600 mb-6">Characters</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="character in displayedCharacters" :key="character.id" class="character-card bg-gray-800 shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:bg-gray-700">
      <div class="flex flex-col items-center">
        <img :src="character.image" alt="Character Image" class="w-32 h-32 object-cover rounded-full mb-4" @click="navigateToCharacter(character.id)">
        <h3 class="font-semibold text-xl text-white">{{ character.name }}</h3>
        <p class="text-white">{{ character.status }}</p>
        <p class="text-white">{{ character.species }}</p>
        <p class="text-white">{{ character.gender }}</p>
      </div>
    </div>
  </div>
  <button v-if="displayedCharacters.length < allCharacters.length" @click="showMoreCharacters" class="text-blue-600 font-semibold hover:underline mt-4">Show More</button>
</div>

<div>
  <h2 class="text-3xl font-bold text-blue-600 mb-6">Locations</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="location in displayedLocations" :key="location.id" class="location-card bg-gray-800 shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:bg-gray-700" @click="navigateToLocation(location.id)">
      <h3 class="font-semibold text-xl text-white">{{ location.name }}</h3>
    </div>
  </div>
  <button v-if="displayedLocations.length < allLocations.length" @click="showMoreLocations" class="text-blue-600 font-semibold hover:underline mt-4">Show More</button>
</div>
        </div>
      </div>

      <footer class="bg-gray-900 text-white text-center py-4">
         <a href="https://github.com/tigu12" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a><br>
  <a href="https://www.figma.com/design/imgcBGTc1PQmVlnQpCxXWc/home-page?node-id=0-1&t=74dRHcyTN9SldRjm-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
        <p>&copy; 2024 Rick and Morty. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.character-card,
.location-card {
  transition: transform 0.3s, background-color 0.3s;
}

.character-card:hover,
.location-card:hover {
  transform: scale(1.05);
  background-color: #4a5568;
}
nav a {
  transition: color 0.3s;
}

nav a:hover {
  color: #00bcd4;
}
.episode-card {
  transition: transform 0.3s, background-color 0.3s;
}
.episode-card:hover {
  transform: scale(1.05);
  background-color: #4a5568;
}

footer p {
  font-size: 0.875rem;
}

.footer-bg {
  background: #1a202c;
}
</style>
