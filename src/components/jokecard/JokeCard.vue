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
import { ref } from 'vue'
import { isJokeSavedInLocalStorage } from '@/lib/utils.ts'
import JokeCardTooltip from '@/components/jokecard/jokecardtooltip/JokeCardTooltip.vue'

const props = defineProps({
  joke: {
    type: Object as PropType<FrontendJokeType>,
    required: true,
  },
})
const showPunchline = ref(false)
const togglePunchline = () => {
  showPunchline.value = !showPunchline.value
}

const isJokeSaved = ref(isJokeSavedInLocalStorage(props.joke?.id))
const updateJokeSavedStatus = () => {
  isJokeSaved.value = isJokeSavedInLocalStorage(props.joke.id)
}
</script>

<template>
  <CardContainer
    class="flex flex-col gap-5 bg-white border-yellow-300 border-2 px-4 py-4 hover:bg-blue-900 hover:cursor-pointer"
  >
    <div class="flex flex-row">
      <CardHeader class="py-1 px-0">
        <CardTitle class="text-black">{{ joke.type.toUpperCase() }}</CardTitle>
      </CardHeader>
      <div class="flex flex-1"></div>
      <JokeCardTooltip
        :is-item-in-library="isJokeSaved"
        :joke="joke"
        @added="updateJokeSavedStatus"
        @deleted="updateJokeSavedStatus"
        >Tooltip</JokeCardTooltip
      >
    </div>
    <CardDescription>
      {{ joke.setup }}
    </CardDescription>

    <div class="flex justify-center items-center">
      <button
        @click="togglePunchline"
        :class="`
        ${showPunchline ? 'bg-gray-400' : 'bg-purple-300'}
      `"
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
            'punchline-jump': showPunchline,
          },
          'transition-opacity duration-500 ease-in-out',
        ]"
        class="text-black text-center font-semibold"
      >
        {{ joke.punchline }}
      </p>
    </CardContent>
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
