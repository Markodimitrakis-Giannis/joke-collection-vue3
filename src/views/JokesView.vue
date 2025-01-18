<script setup lang="ts">
import JokeCard from '@/components/jokecard/JokeCard.vue'
import { useQueryClient, useQuery } from '@tanstack/vue-query'
import { useAppJokesQueries } from '@/apicalls/useAppJokesQueries.ts'
import { computed, onUnmounted } from 'vue'
import JokesHeroSection from '@/components/jokesherosection/JokesHeroSection.vue'
import { FrontendJokeTypeEnum } from '@/types/Jokes.ts'
import { ref, watch } from 'vue'

// Access QueryClient instance
const queryClient = useQueryClient()
const { getJokes } = useAppJokesQueries()

const currentJokeType = ref(FrontendJokeTypeEnum.GENERAL)

const setCurrentJokeType = (type: FrontendJokeTypeEnum) => {
  console.log('Setting joke type to:', type)
  currentJokeType.value = type
}

const currentJokeQueryKey = computed(() => [currentJokeType.value])
const jokesQuery = useQuery({
  queryKey: ['jokes', currentJokeQueryKey],
  queryFn: () => getJokes(currentJokeType.value),
  staleTime: 1000 * 60 * 5, // 5 minutes
})

const jokesData = computed(() => jokesQuery.data)
const isLoading = computed(() => jokesQuery.isLoading.value)
const hasFailed = computed(() => jokesQuery.isError.value)

watch(currentJokeType, () => {
  queryClient.invalidateQueries({ queryKey: ['jokes', currentJokeQueryKey] }) // Only reason i have this is because the API fetched different jokes each time for the same type. In a normal case,
  // one wouldn't need this as the query caching for the same keys is beneficial ( for non crucial data)
})
onUnmounted(() => {
  return () => {
    queryClient.cancelQueries({ queryKey: ['jokes', currentJokeQueryKey] })
  }
})
</script>

<template>
  <section class="bg-green-50 py-4 overflow-hidden">
    <div class="container-xl lg:container h-screen m-auto flex flex-col gap-4 overflow-auto">
      <JokesHeroSection
        :set-current-joke-type="setCurrentJokeType"
        :current-joke-type="currentJokeType"
      />
      <div v-if="isLoading" class="text-center text-2xl font-bold">Loading...</div>
      <div v-else-if="hasFailed" class="text-center text-2xl font-bold">Error fetching jokes</div>

      <div v-else-if="jokesData" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JokeCard v-for="joke in jokesData.value" :key="joke.id" :joke="joke" />
      </div>
    </div>
  </section>
</template>
