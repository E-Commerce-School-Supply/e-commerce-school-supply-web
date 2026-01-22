<script setup lang="ts">
import QuantityInput from '@/components/QuantityInput.vue'
import StarRating from '@/components/ui/StarRating.vue'
import type { Item } from '@/types/cart';


const props = defineProps<{
  item: Item
}>()

// Define emits for parent communication
const emit = defineEmits<{
  (e: 'update-quantity', productId: string, newQuantity: number): void
  (e: 'remove', productId: string): void
}>()
</script>

<template>
  <div class="border-b border-neutral-black-100 pb-6 last:border-b-0 dark:border-gray-700">
    <div class="relative sm:grid sm:grid-cols-5 gap-4 items-center">
      <div class="col-span-2">
        <div class="flex gap-10">
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded" />

          <div class="flex-1">
            <h3 class="text-[20px] font-medium mb-2 dark:text-white">
              {{ item.name }}
            </h3>

            <div class="space-y-1 text-xs dark:text-gray-400">
              <p>Item No: {{ item.itemNo }}</p>
              <p>Brand: {{ item.brand }}</p>
              <StarRating :rating="item.rating" :showNumber="true" class="mb-3" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between col-span-2 ml-20 dark:text-white">
        <span>${{ item.price.toFixed(2) }}</span>
        
        <span>
          <QuantityInput
            :value="item.quantity"
            @update:value="(val) => emit('update-quantity', item.productId, val)"
          />
        </span>

        <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
      </div>

      <button 
        @click="emit('remove', item.productId)" 
        class="absolute right-5 top-5 lg:static lg:justify-self-end hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        <svg class="w-5 h-5 text-neutral-black-500" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>