<script setup lang="ts">
import HomeHeroSection from '@/components/homeviewcomponents/homeherosection/HomeHeroSection.vue'
import heroJokerImg from '@/assets/images/joker_card_img.jpg'

import { QueryNames, SubQueryNames } from '@/types/Queries.ts'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, onUnmounted } from 'vue'
import { useAppJokesQueries } from '@/apicalls/useAppJokesQueries.ts'
import HomePageCarousel from '@/components/homeviewcomponents/homepagecarousel/HomePageCarousel.vue'

const queryClient = useQueryClient()
const { getRandomJokes } = useAppJokesQueries()
const desiredJokesLength = 150 // No pagination from the API :/

const jokesQuery = useQuery({
  queryKey: [QueryNames.JOKES, SubQueryNames.RANDOM],
  queryFn: () => getRandomJokes(desiredJokesLength),
  staleTime: 1000 * 60 * 5, // 5 minutes
})

const jokesData = computed(() => jokesQuery.data)
const isLoading = computed(() => jokesQuery.isLoading.value)
const hasFailed = computed(() => jokesQuery.isError.value)

onUnmounted(() => {
  return () => {
    queryClient.cancelQueries({ queryKey: [QueryNames.JOKES, SubQueryNames.RANDOM] }).then(() => {
      console.log(`Cancelled ${QueryNames.JOKES} query`)
    })
  }
})
</script>

<template>
  <main class="bg-blue-50 py-4 flex flex-1 flex-col min-h-screen flex-col gap-4">
    <HomeHeroSection
      title="Welcome to the Jokes App!"
      description="
Enjoy the best jokes from the internet. We have jokes for everyone, from general jokes to programming jokes. You can also save your favourite jokes as well as rate them. Have fun!"
      :img-src="heroJokerImg"
    />
    <div v-if="isLoading" class="text-center text-2xl font-bold text-white">Loading...</div>
    <div v-else-if="hasFailed" class="text-center text-2xl font-bold text-white">
      Error fetching jokes
    </div>
    <HomePageCarousel :v-else-if="jokesData !== undefined" :items="jokesData.value!" />
  </main>
</template>
