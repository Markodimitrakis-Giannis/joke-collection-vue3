<script setup lang="ts">
import NavBar from './components/navbar/NavBar.vue'
import ToasterItem from '@/components/ui/toast/ToasterItem.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <ToasterItem position="top-right" />
</template>
