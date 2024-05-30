<script setup>
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

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
          name
        }
        episode {
          name
          episode
          air_date
          created
        }
      }
    }
  }
`
const { result, loading, error } = useQuery(CHARACTERS_QUERY);

const initialCharactersCount = 10
const charactersToShow = ref(initialCharactersCount)

const displayedCharacters = computed(() => {
  return result.value?.characters.results.slice(0, charactersToShow.value) || []
})

const showMoreButton = computed(() => {
  return result.value && charactersToShow.value < result.value.characters.results.length
})

const showLessButton = computed(() => {
  return charactersToShow.value > initialCharactersCount
})

function showMore() {
  charactersToShow.value += initialCharactersCount
}

function showLess() {
  charactersToShow.value = initialCharactersCount
}

console.log(result.value)
</script>
<template>
  <div class="bg-black min-h-screen">
    <nav class="bg-gray-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-sm font-get-schwifty flex items-center">
          <a href="#"></a>
          <span>Rick and Morty</span>
        </div>
        <div class="flex space-x-4 text-white">
          <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
          <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
          <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
          <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
        </div>
      </div>
    </nav>

    <div class="container mx-auto mt-8">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">The Movie Characters</h1>
    </div>

    <div class="container mx-auto p-4">
      <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
      <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="character in displayedCharacters" :key="character.id" class="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col md:flex-row mb-6">
            <div class="p-6 md:w-full flex flex-col items-center">
              <img :src="character.image" alt="Character Image" class="w-24 h-24 object-cover rounded-full mb-4">
              <div class="text-center">
                <h3 class="font-semibold text-lg text-white">{{ character.name }}</h3>
                <p class="text-sm text-white">{{ character.status }}</p>
                <p class="text-sm text-white">{{ character.species }}</p>
                <p class="text-sm text-white">{{ character.gender }}</p>
              </div>
            </div>
            <div class="p-6 md:w-full">
              <div class="mb-4">
                <h4 class="text-sm font-medium mb-2 text-white">Last known Location:</h4>
                <div class="flex space-x-2 overflow-x-auto">
                  <div v-if="character.location" class="min-w-max bg-gray-700 p-2 rounded-lg text-xs text-white">
                    <span class="font-semibold">{{ character.location.name }}</span>
                  </div>
                </div>
              </div>
              <div>
                <center><h4 class="text-sm font-medium mb-2 text-white">Episodes:</h4></center>
                <div class="flex space-x-2 overflow-x-auto">
                  <div v-for="ep in character.episode" :key="ep.id" class="min-w-max bg-gray-700 p-2 rounded-lg text-xs text-white">
                    <span class="font-semibold">{{ ep.name }}</span>
                    <br>
                    <span class="font-semibold">{{ ep.episode }}</span>
                    <br>
                    <span class="font-semibold">({{ ep.air_date }})</span>
                    <br>
                    <span class="font-semibold">({{ ep.created }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4" v-if="showMoreButton || showLessButton">
          <button v-if="showMoreButton" @click="showMore" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Show More</button>
          <button v-if="showLessButton" @click="showLess" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Show Less</button>
        </div>
        <footer class="bg-gray-900 text-white text-center py-4">
          <p><b>Tigist Negussie<b></p>
          <a href="https://github.com/tigu12" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a><br>
  <a href="https://www.figma.com/design/nWGxclMZ0MT5JZcZA5qZ8j/Untitled?node-id=0-1&t=nxDJjJcwxU9h9EQe-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
        <p>&copy; 2024 Rick and Morty. All rights reserved.</p>
      </footer>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
.bg-gray-800 {
  background-color: #1f2937; /* Dark gray */
  color: #f3f4f6; /* Light gray */
  border-radius: 1rem; /* Rounded corners */
  border: 1px solid #374151; /* Border color */
  transition: transform 0.3s ease; /* Smooth transition */
}

.bg-gray-800:hover {
  transform: scale(1.05); /* Slightly enlarge on hover */
}
</style>
