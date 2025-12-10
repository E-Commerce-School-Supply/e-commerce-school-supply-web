<template>
  <div class="pr-20">
    <h1 class="text-[20px] font-semibold my-5">Price</h1>

    <!-- Display current range -->
    <div class="flex justify-between mb-2">
      <p>Range</p>
      <p>${{ minPrice.toFixed(2) }} - ${{ maxPrice.toFixed(2) }}</p>
    </div>

    <!-- Slider -->
    <div class="relative w-full h-5">
      <!-- Track -->
      <div class="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full -translate-y-1/2"></div>

      <!-- Range fill -->
      <div
        class="absolute top-1/2 h-2 bg-black rounded-full -translate-y-1/2"
        :style="{ left: sliderPercent(minPrice) + '%', width: sliderPercent(maxPrice) - sliderPercent(minPrice) + '%' }"
      ></div>

      <!-- Handles -->
      <input
        type="range"
        min="0"
        :max="maxProductPrice"
        step="0.01"
        v-model.number="maxPrice"
        class="absolute top-0 w-full h-5 bg-transparent appearance-none pointer-events-auto"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, type PropType } from 'vue';

export default defineComponent({
  name: 'PriceRangeSlider',
  props: {
    products: {
      type: Array as PropType<{ price: number }[]>,
      required: true
    },
    min: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:maxPrice'],
  setup(props, { emit }) {
    const minPrice = ref(props.min);
    const maxProductPrice = computed(() => Math.max(...props.products.map(p => p.price), 100));
    const maxPrice = ref(maxProductPrice.value);

    // emit maxPrice when changed
    watch(maxPrice, (value) => {
      emit('update:maxPrice', value);
    });

    // convert price to percentage for styling
    const sliderPercent = (price: number) => {
      return ((price - minPrice.value) / (maxProductPrice.value - minPrice.value)) * 100;
    };

    return {
      minPrice,
      maxPrice,
      maxProductPrice,
      sliderPercent
    };
  }
});
</script>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.25rem;
  width: 1.25rem;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  position: relative;
}
input[type='range']::-moz-range-thumb {
  height: 1.25rem;
  width: 1.25rem;
  background: black;
  border-radius: 50%;
  cursor: pointer;
}
</style>
