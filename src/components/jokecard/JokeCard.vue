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

defineProps({
  joke: {
    type: Object as PropType<FrontendJokeType>,
    required: true,
  },
})
const showPunchline = ref(false)
const togglePunchline = () => {
  showPunchline.value = !showPunchline.value
}
</script>

<template>
  <CardContainer
    class="flex flex-col gap-5 bg-black px-4 py-4 hover:bg-blue-900 hover:cursor-pointer"
  >
    <div class="flex flex-row">
      <CardHeader class="py-1 px-0">
        <CardTitle class="text-white">{{ joke.type.toUpperCase() }}</CardTitle>
      </CardHeader>
      <div class="flex flex-1"></div>
      <div class="text-white py-2">Tooltip</div>
    </div>
    <CardDescription>
      {{ joke.setup }}
    </CardDescription>

    <div class="flex justify-center items-center">
      <button
        @click="togglePunchline"
        :class="`
        ${showPunchline ? 'bg-red-500' : 'bg-green-500'}
      `"
        class="text-white py-2 px-4 rounded block"
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
        class="text-white text-center font-semibold"
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
