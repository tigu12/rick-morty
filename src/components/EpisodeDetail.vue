<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const route = useRoute()
const episodeId = route.params.id

const EPISODE_QUERY = gql`
  query Episode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
      }
    }
  }
`

const { result, loading, error } = useQuery(EPISODE_QUERY, { id: episodeId })
const episode = ref(null)

watchEffect(() => {
  if (result.value) {
    episode.value = result.value.episode
  }
})
</script>
<template>
  <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
    <div v-if="loading" class="text-blue-500 text-lg">Loading...</div>
    <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
    <div v-if="episode">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">{{ episode.name }}</h1>
      <p><b>Episode:</b> {{ episode.episode }}</p>
      <p><b>Air Date:</b> {{ episode.air_date }}</p>
      <p><b>Characters:</b></p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="character in episode.characters" :key="character.id" class="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <img :src="character.image" alt="Character Image" class="w-32 h-32 object-cover rounded-full mb-2">
          <p>{{ character.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
