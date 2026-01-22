<template>
  <!-- Overall Rating (Rating + Stars + Reviews) -->
  <div class="flex flex-col justify-start space-y-1 m-5 dark:bg-gray-800 p-4 rounded-md">
    <h2 class="text-[20px] dark:text-white">{{ $t('productRating.overall') }}</h2>
    <div class="flex items-center">
      <h2 class="text-[96px] dark:text-white">{{ rating.toFixed(1) }}</h2>

      <div class="ml-5">
        <!-- Stars Row -->
        <StarRating :rating="rating" />

        <!-- Reviews Count -->
        <span class="text-gray-600 text-sm dark:text-gray-400">{{ $t('productRating.reviews', { count: reviews }) }}</span>                 
      </div>
    </div>

    <!-- Recommendation Line -->
    <span class="text-gray-600 text-[14px] mt-1 dark:text-gray-400">
      {{ $t('productRating.recommendation', { recommendCount: recommend, reviewCount: reviews }) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StarRating from '../ui/StarRating.vue';

export default defineComponent({
  name: 'ProductRatingComponent',
  components: { StarRating },
  props: {
    rating: { type: Number, required: true },       // e.g., 4.0
    reviews: { type: Number, required: true },      // e.g., 150
    recommend: { type: Number, required: true }     // e.g., 140
  }
})
</script>
