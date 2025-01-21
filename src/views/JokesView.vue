<script setup lang="ts">
import JokeCard from '@/components/jokecard/JokeCard.vue'
import { useQueryClient, useQuery } from '@tanstack/vue-query'
import { useAppJokesQueries } from '@/apicalls/useAppJokesQueries.ts'
import { computed, onUnmounted } from 'vue'
import JokesHeroSection from '@/components/jokeviewcomponents/jokesherosection/JokesHeroSection.vue'
import { FrontendJokeTypeEnum } from '@/types/Jokes.ts'
import { ref, watch } from 'vue'
import { QueryNames } from '@/types/Queries.ts'
import CardSkeleton from '@/components/cardskeleton/CardSkeleton.vue'

const queryClient = useQueryClient()
const { getJokes, getRandomJokes } = useAppJokesQueries()

const currentJokeType = ref(FrontendJokeTypeEnum.Random)

const setCurrentJokeType = (type: FrontendJokeTypeEnum) => {
  currentJokeType.value = type
}

const currentJokeQueryKey = computed(() => currentJokeType.value)
const jokesQuery = useQuery({
  queryKey: [QueryNames.JOKES, currentJokeQueryKey],
  queryFn: () =>
    currentJokeQueryKey.value === FrontendJokeTypeEnum.Random
      ? getRandomJokes(10)
      : getJokes(currentJokeType.value),
  staleTime: 1000 * 60 * 5, // 5 minutes
  enabled: !!currentJokeQueryKey.value,
})

const jokesData = computed(() => jokesQuery.data)
const isLoading = computed(() => jokesQuery.isLoading.value)
const hasFailed = computed(() => jokesQuery.isError.value)

watch(currentJokeType, () => {
  queryClient.resetQueries({ queryKey: [QueryNames.JOKES, currentJokeQueryKey] }) // Only reason i have this is because the API fetched different jokes each time for the same type. In a normal case,
  // one wouldn't need this as the query caching for the same keys is beneficial ( for non crucial data)
})

onUnmounted(() => {
  return () => {
    queryClient.cancelQueries({ queryKey: [QueryNames.JOKES, currentJokeQueryKey] }).then(() => {
      console.log(`Cancelled ${QueryNames.JOKES} query`)
    })
  }
})
</script>

<template>
  <section class="bg-blue-50 py-4 flex flex-1 flex-col min-h-screen">
    <div class="container-xl lg:container m-auto flex flex-col flex-1 gap-4 h-full">
      <JokesHeroSection
        :set-current-joke-type="setCurrentJokeType"
        :current-joke-type="currentJokeType"
      />
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto">
        <CardSkeleton v-for="i in 10" :key="i" />
      </div>
      <div
        v-else-if="hasFailed"
        class="text-center text-2xl font-bold text-red-600 h-full flex flex-1 justify-center items-center"
      >
        {{ jokesQuery.error?.value ?? 'Error fetching jokes' }}
      </div>

      <div v-else-if="jokesData" class="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto">
        <JokeCard v-for="joke in jokesData.value" :key="joke.id" :joke="joke" />
      </div>
    </div>
  </section>
</template>
