<script setup lang="ts">
import { FlSaveCopy } from '@kalimahapps/vue-icons'
import { AnFilledDelete } from '@kalimahapps/vue-icons'
import { addJokeToLocalStorage, removeJokeFromLocalStorage } from '@/lib/utils.ts'
import type { FrontendJokeType } from '@/types/Jokes.ts'
import type { PropType } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

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

const { toast } = useToast()
const emit = defineEmits(['added', 'deleted'])

const handleAddJoke = () => {
  toast({
    title: `Joke with id ${props.joke?.id} added`,
    description: new Date().toLocaleTimeString(),
    duration: 5000,
  })
  addJokeToLocalStorage(props.joke)
  emit('added')
}

const handleRemoveJoke = () => {
  toast({
    title: `Joke with id ${props.joke?.id} removed`,
    description: new Date().toLocaleTimeString(),
    variant: 'destructive',
    duration: 5000,
  })
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
