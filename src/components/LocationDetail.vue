<template>
  <div class="container mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
    <div v-if="loading" class="text-blue-500 text-lg">Loading...</div>
    <div v-if="error" class="text-red-500 text-lg">Something went wrong...</div>
    <div v-if="location">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">{{ location.name }}</h1>
      <p><b>Type:</b> {{ location.type }}</p>
      <p><b>Dimension:</b> {{ location.dimension }}</p>
      <p><b>Residents:</b></p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="resident in location.residents" :key="resident.id" class="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <img :src="resident.image" alt="Resident Image" class="w-32 h-32 object-cover rounded-full mb-2">
          <p>{{ resident.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const route = useRoute()
const locationId = route.params.id

const LOCATION_QUERY = gql`
  query Location($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`

const { result, loading, error } = useQuery(LOCATION_QUERY, { id: locationId })
const location = ref(null)

watchEffect(() => {
  if (result.value) {
    location.value = result.value.location
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
