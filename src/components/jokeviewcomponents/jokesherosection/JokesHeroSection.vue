<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps } from 'vue'

import { FrontendJokeTypeEnum } from '@/types/Jokes.ts'

const props = defineProps({
  currentJokeType: {
    type: String as PropType<FrontendJokeTypeEnum>,
    required: true,
  },
  setCurrentJokeType: {
    type: Function as PropType<(type: FrontendJokeTypeEnum) => void>,
    required: true,
  },
})
const changeJokeType = (type: FrontendJokeTypeEnum) => {
  if (type === props.currentJokeType) {
    return
  } else {
    props.setCurrentJokeType(type)
  }
}
</script>

<template>
  <section class="bg-black text-white py-20 rounded">
    <div class="flex flex-col justify-center items-center rounded gap-10">
      <div class="text-3xl font-bold text-gray-200">JOKES TYPE</div>
      <div class="flex justify-center items-center gap-3">
        <button
          :class="`${
            props.currentJokeType === FrontendJokeTypeEnum.Random
              ? 'border-yellow-300 border-2 text-yellow-300'
              : ''
          } text-white py-2 px-4 rounded block`"
          @click="changeJokeType(FrontendJokeTypeEnum.Random)"
        >
          Random Jokes
        </button>
        <button
          :class="`${
            props.currentJokeType === FrontendJokeTypeEnum.PROGRAMMING
              ? 'border-yellow-300 border-2 text-yellow-300'
              : ''
          } text-white py-2 px-4 rounded block`"
          @click="changeJokeType(FrontendJokeTypeEnum.PROGRAMMING)"
        >
          Programming Jokes
        </button>
      </div>
    </div>
  </section>
</template>
