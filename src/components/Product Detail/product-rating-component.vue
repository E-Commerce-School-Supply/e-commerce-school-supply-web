<template>
  <!-- Overall Rating (Rating + Stars + Reviews) -->
  <div class="flex flex-col justify-start space-y-1 m-5">
    <h2 class="text-[20px]">Overall product rating</h2>
    <div class="flex items-center">
      <h2 class="text-[96px]">{{ rating.toFixed(1) }}</h2>

      <div class="ml-5">
        <!-- Stars Row -->
        <div class="flex text-[#FF6B6B] text-2xl">
          <template v-for="n in 5" :key="n">
            <span v-if="n <= Math.floor(rating)">★</span>
            <span v-else-if="n - rating <= 0.9">⯪</span>
            <span v-else>☆</span>
          </template>
        </div>

        <!-- Reviews Count -->
        <span class="text-gray-600 text-sm">{{ reviews }} reviews</span>                 
      </div>
    </div>

    <!-- Recommendation Line -->
    <span class="text-gray-600 text-[14px] mt-1">
      {{ recommend }} out of {{ reviews }} recommend this product
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductRatingComponent',

  props: {
    rating: { type: Number, required: true },       // e.g., 4.0
    reviews: { type: Number, required: true },      // e.g., 150
    recommend: { type: Number, required: true }     // e.g., 140
  }
})
</script>
