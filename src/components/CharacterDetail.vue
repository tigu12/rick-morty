<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const route = useRoute()
const characterId = route.params.id

const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
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
      }
    }
  }
`

const { result, loading, error } = useQuery(CHARACTER_QUERY, { id: characterId })
const character = ref(null)

watchEffect(() => {
  if (result.value) {
    character.value = result.value.character
  }
})
</script>

<template>
  <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
    <div v-if="loading" class="text-blue-500 text-lg">Loading...</div>
    <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
    <div v-if="character" class="space-y-4">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">{{ character.name }}</h1>
      <img :src="character.image" alt="Character Image" class="w-48 h-48 object-cover rounded-full mb-4 mx-auto">
      <div class="space-y-2">
        <p><b>Status:</b> <span class="text-blue-400">{{ character.status }}</span></p>
        <p><b>Species:</b> <span class="text-blue-400">{{ character.species }}</span></p>
        <p><b>Gender:</b> <span class="text-blue-400">{{ character.gender }}</span></p>
        <p><b>Location:</b> <span class="text-blue-400">{{ character.location.name }}</span></p>
      </div>
      <div>
        <p class="font-bold">Episodes:</p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li v-for="ep in character.episode" :key="ep.id" class="text-blue-400">
            {{ ep.name }} <span class="text-blue-600">({{ ep.episode }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
