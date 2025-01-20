<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { FrontendJokeType } from '@/types/Jokes.ts'
import JokeCard from '@/components/jokecard/JokeCard.vue'

const props = defineProps({
  items: {
    type: Array as PropType<FrontendJokeType[]>,
    required: true,
  },
})

const currentIndex = ref(0)

const currentItems = computed(() => {
  if (props.items.length < 3) {
    return [...props.items, ...props.items.slice(0, 3 - props.items.length)]
  }
  return [
    props.items[currentIndex.value],
    props.items[(currentIndex.value + 1) % props.items.length],
    props.items[(currentIndex.value + 2) % props.items.length],
  ]
})

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}
</script>

<template>
  <div class="container bg-black rounded mx-auto flex flex-col items-center gap-8 py-8">
    <div class="text-white font-bold text-lg">Random Jokes from the API</div>
    <div
      class="relative w-full overflow-hidden flex flex-col md:flex-row gap-4 justify-center items-center"
    >
      <div class="flex flex-col justify-center items-center md:justify-start">
        <button
          @click="prev"
          class="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Previous
        </button>
      </div>
      <div
        class="flex flex-col md:flex-row gap-4 transition-transform duration-300"
        :style="{ transform: `translateX(0%)` }"
      >
        <div
          v-for="item in currentItems"
          :key="item.id"
          class="flex justify-center items-center px-4"
        >
          <JokeCard :joke="item" :update-personal-collection="() => {}" :is-in-home-page="true" />
        </div>
      </div>

      <div class="flex flex-col justify-center items-center md:justify-start">
        <button
          @click="next"
          class="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
