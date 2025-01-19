<script setup lang="ts">
import {
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { FrontendJokeType } from '@/types/Jokes.ts'
import type { PropType } from 'vue'
import { onMounted, ref, computed } from 'vue'
import JokeCardTooltip from '@/components/jokecard/jokecardtooltip/JokeCardTooltip.vue'
import {
  isJokeSavedInLocalStorage,
  getRatingsFromLocalStorage,
  setRatingsToLocalStorage,
} from '@/lib/utils.ts'

const props = defineProps({
  joke: {
    type: Object as PropType<FrontendJokeType>,
    required: true,
  },
  updatePersonalCollection: {
    type: Function as PropType<(updatedJoke: FrontendJokeType) => void>,
    required: false,
  },
})

const rating = ref<number>(0)
const showPunchline = ref(false)
const isJokeSaved = ref(isJokeSavedInLocalStorage(props.joke?.id))

const emits = defineEmits(['remove', 'ratingUpdated'])

const togglePunchline = () => (showPunchline.value = !showPunchline.value)

const updateJokeSavedStatus = () => {
  isJokeSaved.value = isJokeSavedInLocalStorage(props.joke.id)

  if (props.updatePersonalCollection) {
    props.updatePersonalCollection({ ...props.joke })
  }
}

const fetchExistingRating = () => {
  const allRatings = getRatingsFromLocalStorage()
  const existingRating = allRatings.find((r) => r.id === props.joke.id)
  if (existingRating) {
    rating.value = existingRating.rating
  }
}

const setRating = (jokeId: number, star: number) => {
  const ratings = getRatingsFromLocalStorage()
  const index = ratings.findIndex((r) => r.id === jokeId)

  if (index >= 0) {
    ratings[index].rating = star
  } else {
    ratings.push({ id: jokeId, rating: star })
  }
  setRatingsToLocalStorage(ratings)
  rating.value = star

  emits('ratingUpdated', { ...props.joke, rating: star })
}

const starClasses = computed(() =>
  Array.from({ length: 5 }, (_, i) =>
    i + 1 <= rating.value ? 'text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer',
  ),
)

const removeJoke = () => {
  emits('remove', props.joke.id)
}
onMounted(() => fetchExistingRating())
</script>

<template>
  <CardContainer
    class="flex flex-col gap-5 bg-white border-yellow-700 border-2 px-4 py-4 hover:bg-yellow-200 hover:cursor-pointer"
  >
    <!-- Header -->
    <div class="flex flex-row">
      <CardHeader class="py-1 px-0">
        <CardTitle class="text-black">{{ joke.type.toUpperCase() }}</CardTitle>
      </CardHeader>
      <div class="flex flex-1"></div>
      <JokeCardTooltip
        :is-item-in-library="isJokeSaved"
        :joke="joke"
        @added="updateJokeSavedStatus"
        @deleted="removeJoke"
      >
        Tooltip
      </JokeCardTooltip>
    </div>

    <CardDescription class="h-[40px]">
      {{ joke.setup }}
    </CardDescription>

    <div class="flex justify-center items-center">
      <button
        @click="togglePunchline"
        :class="showPunchline ? 'bg-gray-400' : 'bg-purple-300'"
        class="text-black py-2 px-4 rounded block"
      >
        {{ showPunchline ? 'Hide' : 'Show' }} Punchline
      </button>
    </div>

    <CardContent>
      <p
        :class="[
          {
            'opacity-0': !showPunchline,
            'opacity-100': showPunchline,
          },
          'h-[40px] punchline-jump',
          'transition-opacity duration-500 ease-in-out animate-bounce',
        ]"
        class="text-black text-center font-semibold"
      >
        {{ joke.punchline }}
      </p>
    </CardContent>

    <div class="flex items-center justify-center gap-2">
      <span
        v-for="(className, index) in starClasses"
        :key="index"
        :class="className"
        @click="setRating(joke.id, index + 1)"
        class="text-2xl transition-colors"
      >
        ★
      </span>
    </div>
  </CardContainer>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.punchline-jump {
  animation: bounce 0.5s ease-in-out;
}
</style>
