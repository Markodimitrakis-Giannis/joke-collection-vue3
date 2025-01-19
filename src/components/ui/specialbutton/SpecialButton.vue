<template>
  <div class="relative group">
    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0">
      <rect rx="8" ry="8" class="line" height="100%" width="100%" stroke-linejoin="round" />
    </svg>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
svg rect {
  stroke: #ffffff;
  fill: transparent;
  stroke-width: 2;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset 1s ease;
}

.group:hover svg rect {
  stroke-dashoffset: 0;
}
</style>
