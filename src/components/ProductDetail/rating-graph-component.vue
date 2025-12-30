<template>
  <div>
    <h3 class="text-xl font-bold mb-4">Rating</h3>

    <!-- Rating Bars -->
    <div class="space-y-1">
      <div 
        v-for="(item, index) in ratings" 
        :key="index" 
        class="flex items-center gap-3"
      >
        <span class="w-3 text-sm font-medium">{{ item.stars }}</span>
        <span class="text-[#FF6B6B] text-[20px]">★</span>
        <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
          <div 
            class="h-full bg-[#FF6B6B] rounded-md" 
            :style="{ width: item.percentage + '%' }"
          ></div>
        </div>
        <span class="w-8 text-right text-sm">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface RatingItem {
  stars: number      // 1 to 5
  count: number      // number of reviews for this star
  percentage: number // width percentage of the bar (0-100)
}

export default defineComponent({
  name: 'RatingGraphComponent',

  props: {
    ratings: {
      type: Array as () => RatingItem[],
      required: true
    }
  }
})
</script>
