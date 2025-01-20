<script setup lang="ts">
import type { PropType } from 'vue'
import { CollectionFiltersEnum } from '@/types/CollectionFilters.ts'
import StarFilterDropdown from '@/components/collectionviewcomponents/starfilterdropdown/StarFilterDropdown.vue'

const props = defineProps({
  activeSortingFilter: {
    type: String as PropType<CollectionFiltersEnum | null>,
    required: true,
  },
  setActiveSortingFilter: {
    type: Function as PropType<(filter: CollectionFiltersEnum | null) => void>,
    required: true,
  },
  filteredRating: {
    type: [Number, null],
    required: true,
  },
  setFilteredRating: {
    type: Function as PropType<(rating: number | null) => void>,
    required: true,
  },
})
</script>
<template>
  <div
    class="flex flex-col w-64 p-4 gap-2 bg-purple-700 text-white rounded-lg space-y-3 py-10 overflow-y-auto border-black border-2"
  >
    <h2 class="text-lg font-semibold border-b border-purple-300 pb-2 text-center">Filters</h2>
    <button
      @click="props.setActiveSortingFilter(CollectionFiltersEnum.Rating)"
      :class="[
        props.activeSortingFilter === CollectionFiltersEnum.Rating
          ? 'border-yellow-400 border-2'
          : 'border-transparent border-2',
        'px-4 py-2 rounded  w-full',
      ]"
      class="bg-gray-800 px-4 py-2 rounded w-full"
    >
      Sort By Rating
    </button>
    <button
      @click="props.setActiveSortingFilter(CollectionFiltersEnum.Alphabetical)"
      :class="[
        props.activeSortingFilter === CollectionFiltersEnum.Alphabetical
          ? 'border-yellow-400 border-2'
          : 'border-transparent border-2',
        'px-4 py-2 rounded  w-full',
      ]"
      class="bg-gray-800 px-4 py-2 rounded w-full"
    >
      Sort Alphabetically
    </button>
    <StarFilterDropdown
      :set-filtered-rating="setFilteredRating"
      :filtered-rating="filteredRating"
    />
  </div>
</template>
