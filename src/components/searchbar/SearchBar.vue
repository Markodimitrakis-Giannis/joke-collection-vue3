<script setup lang="ts">
defineProps({
  searchTerm: {
    type: String,
    required: true,
  },
  handleSearch: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="flex justify-center items-center w-[258px]">
    <input
      :value="searchTerm"
      @input="handleSearch"
      type="text"
      placeholder="Search term in joke setup"
      class="w-full p-2 rounded-md text-green-800 font-italic border-2 border-purple-400"
    />
  </div>
</template>
