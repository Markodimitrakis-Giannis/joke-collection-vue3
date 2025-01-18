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
  <section class="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
    <div class="flex justify-center items-center rounded">
      <div class="flex justify-center items-center gap-3">
        <button
          :class="`${
            props.currentJokeType === FrontendJokeTypeEnum.GENERAL ? 'border-black border-2' : ''
          } text-white py-2 px-4 rounded block`"
          @click="changeJokeType(FrontendJokeTypeEnum.GENERAL)"
        >
          General
        </button>
        <button
          :class="`${
            props.currentJokeType === FrontendJokeTypeEnum.PROGRAMMING
              ? 'border-black border-2'
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
