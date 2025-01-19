<script setup lang="ts">
import type { PropType } from 'vue'
import { CollectionFiltersEnum } from '@/types/CollectionFilters.ts'

const props = defineProps({
  activeFilter: {
    type: String as PropType<CollectionFiltersEnum | null>,
    required: true,
  },
  setActiveFilter: {
    type: Function as PropType<(filter: CollectionFiltersEnum | null) => void>,
    required: true,
  },
})
</script>
<template>
  <div
    class="flex flex-col w-64 p-4 bg-purple-700 text-white rounded-lg space-y-3 h-[500px] overflow-y-auto border-black border-2"
  >
    <h2 class="text-lg font-semibold border-b border-purple-300 pb-2 text-center">Filters</h2>
    <button
      @click="props.setActiveFilter(CollectionFiltersEnum.Rating)"
      :class="[
        props.activeFilter === CollectionFiltersEnum.Rating ? 'bg-yellow-400' : '',
        'px-4 py-2 rounded  w-full',
      ]"
      class="bg-gray-800 px-4 py-2 rounded w-full"
    >
      Sort By Rating
    </button>
    <button class="bg-gray-800 px-4 py-2 rounded">Sort By Popularity</button>
    <button class="bg-gray-800 px-4 py-2 rounded">Random</button>
    <button class="bg-gray-800 px-4 py-2 rounded">Another Filter</button>
    <button class="bg-gray-800 px-4 py-2 rounded">Extra Filter</button>
  </div>
</template>
