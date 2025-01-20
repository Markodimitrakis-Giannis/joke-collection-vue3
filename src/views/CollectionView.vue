<script setup lang="ts">
import JokeCard from '@/components/jokecard/JokeCard.vue'
import { getJokesFromLocalStorage, setRatingsToLocalStorage } from '@/lib/utils.ts'
import { ref, computed } from 'vue'
import CollectionFilters from '@/components/collectionviewcomponents/collectionfilters/CollectionFilters.vue'
import { CollectionFiltersEnum } from '@/types/CollectionFilters.ts'
import CollectionHeroSection from '@/components/collectionviewcomponents/collectionherosection/CollectionHeroSection.vue'
import type { FrontendJokeType } from '@/types/Jokes.ts'
import SearchBar from '@/components/ui/searchbar/SearchBar.vue'

const jokes = ref<FrontendJokeType[]>(getJokesFromLocalStorage())
const searchWord = ref<string>('')
const activeSortingFilter = ref<CollectionFiltersEnum | null>(null)
const filteredRating = ref<number | null>(null)

const avgRating = computed(() => {
  const ratedJokes = jokes.value.filter((joke) => joke.rating !== 0 && joke.rating !== undefined)
  const totalRatings = ratedJokes.reduce((sum, joke) => sum + (joke.rating ?? 0), 0)
  return ratedJokes.length > 0 ? (totalRatings / ratedJokes.length).toFixed(2) : '--'
})

const updateJokeRating = (updatedJoke: FrontendJokeType) => {
  const existingIndex = jokes.value.findIndex((joke) => joke.id === updatedJoke.id)
  if (existingIndex !== -1) {
    jokes.value.splice(existingIndex, 1, updatedJoke)
  } else {
    jokes.value.push(updatedJoke)
  }
}

const updatePersonalCollection = (updatedJoke: FrontendJokeType) => {
  const existingIndex = jokes.value.findIndex((joke) => joke.id === updatedJoke.id)
  if (existingIndex >= 0) {
    jokes.value.splice(existingIndex, 1, updatedJoke)
  } else {
    jokes.value.push(updatedJoke)
  }
  const ratings = jokes.value.map(({ id, rating }) => ({ id, rating: rating ?? 0 }))
  setRatingsToLocalStorage(ratings)
  jokes.value = getJokesFromLocalStorage()
}

const removeJokeFromCollection = (jokeId: number) => {
  jokes.value = jokes.value.filter((joke) => joke.id !== jokeId)
}
const filteredJokes = computed(() => {
  const searchTerm = searchWord.value.toLowerCase().trim() // Filtering should always be in backend but for the purpose of this project, I am doing it in frontend
  const filtered = jokes.value.filter((joke) => joke.setup.toLowerCase().includes(searchTerm))

  const filteredByRating = filteredRating.value
    ? filtered.filter((joke) => joke.rating === filteredRating.value)
    : filtered

  if (activeSortingFilter.value === CollectionFiltersEnum.Rating) {
    return [...filteredByRating].sort((a, b) => {
      const aRating = a.rating ?? 0
      const bRating = b.rating ?? 0
      return bRating - aRating
    })
  }
  if (activeSortingFilter.value === CollectionFiltersEnum.Alphabetical) {
    return [...filteredByRating].sort((a, b) =>
      a.punchline.charAt(0).localeCompare(b.punchline.charAt(0)),
    ) // Sort by first letter of punchline as there is no title of the joke to sort alphabetically or any similar field
  }

  return filteredByRating
})

const toggleActiveSortingFilter = (type: CollectionFiltersEnum | null) => {
  if (activeSortingFilter.value === type) {
    activeSortingFilter.value = null
  } else {
    activeSortingFilter.value = type
  }
}

const changeFilteredRating = (newRating: number | null) => {
  filteredRating.value = newRating
}

const handleSeachTermChange = (e: Event) => {
  setTimeout(() => {
    if (e.target) {
      searchWord.value = (e.target as HTMLInputElement).value
    }
  }, 1000) // Debounce the input (in case we had api calls in real projects)
}
</script>

<template>
  <section class="bg-blue-50 min-h-screen flex flex-col py-4">
    <div class="container-xl lg:container m-auto flex flex-col flex-1 gap-4 h-full overflow-auto">
      <CollectionHeroSection :average-rating="avgRating" :total-jokes="jokes.length" />

      <div class="flex flex-col flex-1 gap 4">
        <div class="flex flex-row py-4 flex-1 gap-4">
          <div class="flex-auto">
            <div
              v-if="filteredJokes.length > 0"
              class="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto pr-6"
            >
              <JokeCard
                v-for="joke in filteredJokes"
                :key="joke.id"
                :joke="joke"
                :update-personal-collection="updatePersonalCollection"
                @remove="removeJokeFromCollection"
                @rating-updated="updateJokeRating"
              />
            </div>
            <div
              v-else
              class="flex justify-center items-center h-[20px] text-xl text-orange-500 font-bold font-italic"
            >
              No Jokes Found
            </div>
          </div>

          <div class="flex w-64 flex-col gap-4">
            <CollectionFilters
              :active-sorting-filter="activeSortingFilter"
              :set-active-sorting-filter="toggleActiveSortingFilter"
              :filtered-rating="filteredRating"
              :set-filtered-rating="changeFilteredRating"
            />
            <SearchBar :handle-search="handleSeachTermChange" :search-term="searchWord" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
