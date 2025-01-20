<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-400">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <RouterLink to="/" class="flex flex-shrink-0 items-center mr-4">
            <img class="h-10 w-auto" src="@/assets/images/joker-logo.svg" alt="joker_img" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Jokes App</span>
          </RouterLink>
          <div class="flex flex-1"></div>
          <div>
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                activeClass="border-red-500"
                exactActiveClass="border-red-700"
                class="text-gray-100 hover:text-black transition-colors duration-200 rounded-md px-3 py-2 font-semibold"
                >Home</RouterLink
              >
              <RouterLink
                to="/jokes"
                class="text-gray-100 hover:text-black transition-colors duration-200 rounded-md px-3 py-2 font-semibold"
                >Jokes</RouterLink
              >
              <RouterLink
                to="/collection"
                class="text-gray-100 hover:text-black transition-colors duration-200 rounded-md px-3 py-2 font-semibold"
                >My Collection</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
