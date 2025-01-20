<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { RouteNames } from '@/types/Routes.ts'

defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section>
    <div
      class="container bg-orange-400 rounded mx-auto flex flex-col md:flex-row items-center gap-8 py-8"
    >
      <div class="flex-shrink-0 md:w-1/2">
        <img
          :src="imgSrc"
          alt="Hero Image"
          class="w-[500px] h-[600px] object-cover rounded-lg shadow-lg"
        />
      </div>

      <div class="md:w-1/2 text-center md:text-left flex flex-col gap-4">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{{ title }}</h1>
        <p class="text-gray-800 text-lg leading-relaxed">{{ description }}</p>
        <div class="flex justify-center md:justify-start py-6">
          <RouterLink
            :to="RouteNames.JOKES"
            class="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-md inline-block w-auto font-semibold"
          >
            Explore More
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
