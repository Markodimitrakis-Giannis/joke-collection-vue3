<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { CaChevronDown } from '@kalimahapps/vue-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
  filteredRating: {
    type: [Number, null],
    required: true,
  },
  setFilteredRating: {
    type: Function as PropType<(rating: number | null) => void>,
    required: true,
  },
})

const dropdownOpen = ref(false)

const handleSelect = (rating: number | null) => {
  if (rating === null) {
    props.setFilteredRating(null)
  } else {
    props.setFilteredRating(rating)
  }
  dropdownOpen.value = false
}

const generateStars = (rating: number): string[] => {
  return Array.from({ length: 5 }, (_, index) => (index < rating ? '★' : '☆'))
}
</script>

<template>
  <DropdownMenu v-model:open="dropdownOpen">
    <DropdownMenuTrigger
      as="button"
      :class="[props.filteredRating ? 'border-yellow-400 border-2' : 'border-transparent border-2']"
      class="bg-gray-800 px-4 py-2 rounded w-full text-center border-2 flex flex-row justify-center items-center gap-2"
    >
      Filter by Rating
      <div class="flex justify-center items-center pt-1">
        <CaChevronDown class="h-[18px] w-[18px]" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="bg-white text-black rounded-lg shadow-lg">
      <DropdownMenuItem
        v-for="rating in [5, 4, 3, 2, 1]"
        :key="rating"
        @click="handleSelect(rating)"
        class="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer"
        :class="filteredRating === rating ? 'bg-yellow-300' : ''"
      >
        <span class="flex">
          <span v-for="(star, index) in generateStars(rating)" :key="index" class="text-lg">
            {{ star }}
          </span>
        </span>
        <span class="ml-auto text-sm">{{ rating }} </span>
      </DropdownMenuItem>
      <span
        class="text-center flex justify-center items-center cursor-pointer py-2 hover:bg-red-300 rounded font-semibold"
        @click="handleSelect(null)"
      >
        Clear
      </span>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
