<script setup lang="ts">
import JokeCard from '@/components/jokecard/JokeCard.vue'
import { getJokesFromLocalStorage, setRatingsToLocalStorage } from '@/lib/utils.ts'
import { ref, computed } from 'vue'
import CollectionFilters from '@/components/collectionfilters/CollectionFilters.vue'
import { CollectionFiltersEnum } from '@/types/CollectionFilters.ts'
import CollectionHeroSection from '@/components/collectionherosection/CollectionHeroSection.vue'
import type { FrontendJokeTypeEnum } from '@/types/Jokes.ts'

const jokes = ref(getJokesFromLocalStorage())
const activeFilter = ref<CollectionFiltersEnum | null>(null)

const avgRating = computed(() => {
  const ratedJokes = jokes.value.filter((joke) => joke.rating !== 0 && joke.rating !== undefined)
  const totalRatings = ratedJokes.reduce((sum, joke) => sum + (joke.rating ?? 0), 0)
  return ratedJokes.length > 0 ? (totalRatings / ratedJokes.length).toFixed(2) : '--'
})

const updateJokeRating = (updatedJoke) => {
  const existingIndex = jokes.value.findIndex((joke) => joke.id === updatedJoke.id)
  if (existingIndex !== -1) {
    jokes.value.splice(existingIndex, 1, updatedJoke) // Update joke
  } else {
    jokes.value.push(updatedJoke)
  }
}

const updatePersonalCollection = (updatedJoke) => {
  const existingIndex = jokes.value.findIndex((joke) => joke.id === updatedJoke.id)
  if (existingIndex >= 0) {
    jokes.value.splice(existingIndex, 1, updatedJoke) // Update joke
  } else {
    jokes.value.push(updatedJoke)
  }
  const ratings = jokes.value.map(({ id, rating }) => ({ id, rating: rating ?? 0 }))
  setRatingsToLocalStorage(ratings)
  jokes.value = getJokesFromLocalStorage()
}

const removeJokeFromCollection = (jokeId) => {
  jokes.value = jokes.value.filter((joke) => joke.id !== jokeId)

  const ratings = jokes.value.map(({ id, rating }) => ({ id, rating: rating ?? 0 }))
  setRatingsToLocalStorage(ratings)
}
const sortedJokes = computed(() => {
  if (activeFilter.value === CollectionFiltersEnum.Rating) {
    return [...jokes.value].sort((a, b) => {
      const aRating = a.rating ?? 0
      const bRating = b.rating ?? 0
      return bRating - aRating
    })
  }
  return jokes.value
})

const toggleIsShowingSortedByRating = (type: FrontendJokeTypeEnum) => {
  if (activeFilter.value === type) {
    activeFilter.value = null
  } else {
    activeFilter.value = type
  }
}
</script>

<template>
  <section class="bg-blue-50 min-h-screen flex flex-col py-4">
    <div class="container-xl lg:container m-auto flex flex-col flex-1 gap-4 h-full overflow-auto">
      <CollectionHeroSection :average-rating="avgRating" :total-jokes="jokes.length" />

      <div class="flex flex-row py-4 flex-1 gap-4">
        <div class="flex-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto pr-6">
            <JokeCard
              v-for="joke in sortedJokes"
              :key="joke.id"
              :joke="joke"
              :update-personal-collection="updatePersonalCollection"
              @remove="removeJokeFromCollection"
              @rating-updated="updateJokeRating"
            />
          </div>
        </div>

        <div class="flex-none w-64">
          <CollectionFilters
            :active-filter="activeFilter"
            :set-active-filter="toggleIsShowingSortedByRating"
          />
        </div>
      </div>
    </div>
  </section>
</template>
