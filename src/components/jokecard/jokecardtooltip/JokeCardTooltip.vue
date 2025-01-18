<script setup lang="ts">
import { FlSaveCopy } from '@kalimahapps/vue-icons'
import { AnFilledDelete } from '@kalimahapps/vue-icons'
import { addJokeToLocalStorage, removeJokeFromLocalStorage } from '@/lib/utils.ts'
import type { FrontendJokeType } from '@/types/Jokes.ts'
import type { PropType } from 'vue'

const props = defineProps({
  isItemInLibrary: {
    type: Boolean,
    required: true,
  },
  joke: {
    type: Object as PropType<FrontendJokeType>,
    required: true,
  },
})

const emit = defineEmits(['added', 'deleted'])

const handleAddJoke = () => {
  addJokeToLocalStorage(props.joke)
  emit('added')
}

const handleRemoveJoke = () => {
  removeJokeFromLocalStorage(props.joke.id)
  emit('deleted')
}
</script>

<template>
  <div class="flex justify-center items-center">
    <button v-if="!isItemInLibrary" @click="handleAddJoke">
      <FlSaveCopy class="h-6 w-6 text-black" />
    </button>
    <button v-else @click="handleRemoveJoke"><AnFilledDelete class="h-6 w-6 text-black" /></button>
  </div>
</template>
