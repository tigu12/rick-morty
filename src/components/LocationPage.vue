<template>
  <div class="bg-black min-h-screen">
    <nav class="bg-gray-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo or Branding -->
        <div class="text-white text-l font-get-schwifty flex items-center">
          <a href="#">
            <!-- Add your logo or branding here -->
          </a>
          <span>Rick & Morty</span>
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
    <div class="container mx-auto text-center">
      <h1 class="text-4xl font-bold text-blue-600 my-8">The Movie Locations</h1>
      <!-- Loading or error message -->
      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
      <div v-else>
        <!-- Locations display -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(loc, index) in displayedLocations" :key="index" class="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:bg-gray-500 flex flex-col items-center">
            <!-- Location information -->
            <div class="p-4 flex flex-col items-center justify-center text-white">
              <h2 class="text-xl font-semibold text-blue-400 mb-2">{{ loc.name }}</h2>
              <p><b>Type:</b> {{ loc.type }}</p>
              <p><b>Dimension:</b> {{ loc.dimension }}</p>
              <p><b>Created:</b> {{ loc.created }}</p>
            </div>
            <!-- Residents -->
            <div class="flex flex-wrap justify-center p-4">
              <div v-for="(resident, i) in (expandedResidents[index] ? loc.residents : loc.residents.slice(0, 3))" :key="i" class="flex flex-col items-center bg-gray-700 p-4 rounded-full m-2">
                <img :src="resident.image" :alt="resident.name" class="w-16 h-16 object-cover mb-2 rounded-full">
                <div class="text-sm text-center text-white">
                  <p class="mb-1"><b>Name:</b> {{ resident.name }}</p>
                  <p class="mb-1"><b>Status:</b> {{ resident.status }}</p>
                  <p class="mb-1"><b>Species:</b> {{ resident.species }}</p>
                  <p class="mb-1"><b>Gender:</b> {{ resident.gender }}</p>
                </div>
              </div>
            </div>
            <!-- See More button -->
            <div v-if="loc.residents.length > 3" class="flex justify-center w-full mt-4">
              <button @click="toggleExpanded(index)" class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-400 transition">
                <span v-if="expandedResidents[index]">-</span>
                <span v-else>+</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Show More and Show Less buttons -->
        <div class="text-center mt-4" v-if="showMoreButton || showLessButton">
          <button v-if="showMoreButton" @click="showMore" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Show More</button>
          <button v-if="showLessButton" @click="showLess" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Show Less</button>
        </div>
      </div>
      <footer class="bg-gray-900 text-white text-center py-4 w-full">
        <a href="https://github.com/tigu12" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a><br>
  <a href="https://www.figma.com/design/oSFyW389zPsFMAa5VBT9hd/Untitled?node-id=0-1&t=e82zQVw15PQ9jaaJ-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
        <p>&copy; 2024 Rick and Morty. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const LOCATION_QUERY = gql`
  query Location {
    locations {
      results {
        name
        type
        dimension
        created
        residents {
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

const { result, loading, error } = useQuery(LOCATION_QUERY);

const initialLocationsCount = 10
const locationsToShow = ref(initialLocationsCount)

const displayedLocations = computed(() => {
  return result.value?.locations.results.slice(0, locationsToShow.value) || []
})

const showMoreButton = computed(() => {
  return result.value && locationsToShow.value < result.value.locations.results.length
})

const showLessButton = computed(() => {
  return locationsToShow.value > initialLocationsCount
})

const expandedResidents = ref([]);

const toggleExpanded = (index) => {
  expandedResidents.value[index] = !expandedResidents.value[index];
}

function showMore() {
  locationsToShow.value += initialLocationsCount;
}

function showLess() {
  locationsToShow.value = initialLocationsCount;
}
</script>

<style scoped>
/* Additional styles for the residents' containers */
.bg-gray-800 {
  background-color: #1f2937; /* Dark gray */
  color: #f3f4f6; /* Light gray */
  border-radius: 1rem; /* Rounded corners */
  border: 1px solid #374151; /* Border color */
  transition: transform 0.3s ease; /* Smooth transition */
}

.bg-gray-800:hover {
  background-color: #374151;
  /* Slightly enlarge on hover */
}
</style>
