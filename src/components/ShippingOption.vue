<template>
  <div
    class="flex w-full items-center justify-between p-4 border rounded-lg cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors"
    :class="{ 'border-[#1A535C] bg-[#1A535C] text-white': selected }"
    @click="emitShip('select')"
  >
    <!-- Radio Button -->
    <div class="flex items-center gap-4">
      <div
        class="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center dark:border-gray-500"
        :class="{ 'border-white': selected }"
      >
        <div
          v-if="selected"
          class="w-3 h-3 bg-white rounded-full"
        ></div>
      </div>

      <!-- Label and Description -->
      <div>
        <p class="font-semibold text-black dark:text-gray-100" :class="{'text-white':selected}">
          {{ label }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-300" :class="{'text-white':selected}">
          {{ description }}</p>
      </div>
    </div>

    <!-- Price -->
    <div class="font-medium text-black dark:text-gray-100" :class="{'text-white':selected}">
      {{ displayPrice }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  description: string
  price: number
  selected: boolean
}>()

const emitShip = defineEmits<{
  (e: 'select'): void
}>()

const displayPrice = computed(() => (props.price === 0 ? 'Free' : `$${props.price.toFixed(2)}`))
</script>
