<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { CancelTokenSource } from 'axios'
import axios from 'axios'
import HomeHeroSection from '@/components/homeviewcomponents/homeherosection/HomeHeroSection.vue'
import heroJokerImg from '@/assets/images/joker_card_img.jpg'
import HomePageCarousel from '@/components/homeviewcomponents/homepagecarousel/HomePageCarousel.vue'
import type { FrontendJokeType } from '@/types/Jokes.ts'

import { useAppJokesQueries } from '@/apicalls/useAppJokesQueries.ts'

// Reactive state for the jokes data, loading and error statuses.
const jokesData = ref<FrontendJokeType[] | null>(null)
const isLoading = ref<boolean>(false)
const hasFailed = ref<boolean>(false)
const error = ref<string | null>(null)
const { getRandomJokes } = useAppJokesQueries()

let cancelTokenSource: CancelTokenSource | null = null

async function fetchJokes() {
  isLoading.value = true
  hasFailed.value = false
  error.value = null

  // Create a cancel token for the request.
  cancelTokenSource = axios.CancelToken.source()

  try {
    // Replace the endpoint URL with the actual URL from which you fetch jokes.
    jokesData.value = await getRandomJokes()
  } catch (err: unknown) {
    if (axios.isCancel(err)) {
      console.log('Request cancelled:', err.message)
    } else {
      console.error(err)
      hasFailed.value = true
      error.value = 'Error fetching jokes'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchJokes()
})

onUnmounted(() => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Component unmounted: cancelled jokes request')
  }
})
</script>

<template>
  <main class="bg-blue-50 py-4 flex flex-1 flex-col min-h-screen gap-4">
    <HomeHeroSection
      title="Welcome to the Jokes App!"
      description="
Enjoy the best jokes from the internet. We have jokes for everyone, from general jokes to programming jokes. You can also save your favourite jokes as well as rate them. Have fun!"
      :img-src="heroJokerImg"
    />
    <div
      v-if="hasFailed"
      class="text-center text-2xl font-bold text-red-600 h-full flex flex-1 justify-center items-center"
    >
      {{ error ?? 'Error fetching jokes' }}
    </div>
    <HomePageCarousel v-else-if="jokesData !== null" :items="jokesData" :isLoading="isLoading" />
  </main>
</template>
