<script setup lang="ts">
defineProps({
  totalJokes: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number || String,
    required: true,
  },
})

const generateStars = (rating: number): ('full' | 'half' | 'empty')[] => {
  const stars = []
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  for (let i = 0; i < fullStars; i++) {
    stars.push('full')
  }
  if (halfStar) {
    stars.push('half')
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('empty')
  }
  return stars
}
</script>

<template>
  <div class="bg-black text-white py-8 text-center rounded">
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl font-bold">My Collection</h1>
      <div class="flex flex-row gap-6 items-center justify-center">
        <div class="text-[20px] font-semibold">Total Jokes: {{ totalJokes }}</div>

        <div class="font-semibold flex items-center justify-center gap-2">
          <div class="text-[20px] font-semibold">Average Rating:</div>
          <span class="flex gap-1 justify-center items-center pt-1">
            <template v-for="(state, index) in generateStars(averageRating)" :key="index">
              <span
                :class="[
                  'flex',
                  'justify-center',
                  'star',
                  'leading-8',
                  state === 'full' ? 'star-full' : state === 'half' ? 'star-half' : 'star-empty',
                ]"
              ></span>
            </template>
            <span class="flex justify-center items-center">
              {{ averageRating === 0 ? '--' : averageRating }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.star {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: transparent;
  position: relative;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.star-full {
  background-color: gold;
}

.star-half {
  background: linear-gradient(to right, gold 50%, #ccc 50%);
}

.star-empty {
  background-color: #ccc;
}
</style>
