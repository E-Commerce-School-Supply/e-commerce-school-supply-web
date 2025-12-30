<script setup lang="ts">
// Define props to accept the rating value and an optional showNumber flag
const props = defineProps<{
  rating: number;
  showNumber?: boolean; // Optional: whether to show the "4.5" text
}>();
</script>

<template>
  <div class="flex items-center text-[#FF6B6B]">
    <span v-if="showNumber" class="mr-2 font-semibold text-gray-800">
      {{ rating?.toFixed(1) }}
    </span>

    <span class="text-[20px] flex items-center">
      <template v-for="n in 5" :key="n">
        <span v-if="n <= Math.floor(rating)">★</span>
        
        <span v-else-if="n - rating <= 0.5">⯪</span>
        
        <span v-else>☆</span>
      </template>
    </span>
  </div>
</template>