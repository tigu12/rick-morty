<template>
  <div class="bg-black min-h-screen">
    <nav class="bg-gray-600 p-2 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo or Branding -->
        <div class="text-white text-l font-get-schwifty flex items-center">
          <a href="#">
            <!-- Add your logo or branding here -->
          </a>
          <h3><span>Rick & Morty</span></h3>
        </div>
        <!-- Navigation Links -->
        <div class="flex space-x-4 text-white">
          <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
          <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
          <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
          <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
        </div>
      </div>
    </nav>
    <div class="container mx-auto bg-gray-900 p-2">
      <h1 class="text-3xl font-bold text-center text-blue-600 my-4">The Movie Episodes</h1>
      <ul>
        <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
        <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(ep, index) in (showAll ? result.episodes.results : result.episodes.results.slice(0, 10))" :key="ep.id" class="bg-gray-800 shadow-md rounded-lg p-4">
            <h2 class="text-lg font-bold text-blue-400 mb-2">{{ ep.name }}</h2>
            <p class="text-gray-300 mb-1"><strong>Episode Code:</strong> {{ ep.episode }}</p>
            <p class="text-gray-300 mb-1"><strong>Air Date:</strong> {{ ep.air_date }}</p>
            <p class="text-gray-300 mb-2"><strong>Created:</strong> {{ ep.created }}</p>
            <div class="flex flex-wrap -m-1">
              <!-- Display up to 3 characters -->
              <div v-for="(character, i) in ep.characters.slice(0, 3)" :key="i" class="bg-gray-700 shadow-md rounded-full p-2 m-1 flex items-center">
                <img :src="character.image" :alt="character.name" class="w-10 h-10 rounded-full mr-2 border-2 border-gray-300">
                <div>
                  <p class="text-white font-semibold text-sm">{{ character.name }}</p>
                  <p class="text-gray-300 text-xs">{{ character.status }}</p>
                  <p class="text-gray-300 text-xs">{{ character.species }}</p>
                  <p class="text-gray-300 text-xs">{{ character.gender }}</p>
                </div>
              </div>
            </div>
            <!-- See More Button -->
            <button @click="showMore(index)" class="mt-2 flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
              <span v-if="expandedIndex !== index">+</span>
              <span v-else>-</span>
            </button>
            <!-- Additional characters displayed when See More button is clicked -->
            <div v-if="expandedIndex === index" class="mt-2">
              <div class="flex flex-wrap -m-1">
                <div v-for="(character, i) in ep.characters.slice(3)" :key="i" class="bg-gray-700 shadow-md rounded-full p-2 m-1 flex items-center">
                  <img :src="character.image" :alt="character.name" class="w-10 h-10 rounded-full mr-2 border-2 border-gray-300">
                  <div>
                    <p class="text-white font-semibold text-sm">{{ character.name }}</p>
                    <p class="text-gray-300 text-xs">{{ character.status }}</p>
                    <p class="text-gray-300 text-xs">{{ character.species }}</p>
                    <p class="text-gray-300 text-xs">{{ character.gender }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button @click="toggleShowAll" class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            {{ showAll ? 'Show Less' : 'Show More' }}
          </button>
        </div>
      </ul>
      <footer class="bg-gray-900 text-white text-center py-4">
        <a href="https://github.com/tigu12" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a><br>
  <a href="https://www.figma.com/design/obnPK0zXeGu8gku3xpFsOW/Untitled?node-id=1-2&t=MOBzL4h7l1docXp9-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
        <p>&copy; 2024 Rick and Morty. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const expandedIndex = ref(null)
const showAll = ref(false)

const Episode_QUERY = gql`
  query Episode {
    episodes {
      results {
        id
        name
        episode
        air_date
        created
        characters {
          name
          status
          species
          gender
          image
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(Episode_QUERY);

function showMore(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

function toggleShowAll() {
  showAll.value = !showAll.value
}
</script>

<style scoped>
/* Tailwind CSS import */
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

/* Adjust spacing for better presentation */
ul {
  margin: 0;
  padding: 0;
}

/* Adjust margin around container */
.container {
  margin: 0.5rem auto;
}

/* Style for episode container */
.bg-gray-800 {
  background-color: #1f2937; /* Dark gray */
  color: #f3f4f6; /* Light gray */
  border-radius: 1rem; /* Rounded corners */
  border: 1px solid #374151; /* Border color */
  transition: background-color 0.3s ease; /* Smooth transition */
  display: flex; /* Use flexbox */
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
}
</style>
