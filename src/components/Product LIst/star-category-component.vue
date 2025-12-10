<template>
  <div class="text-base/8 text-[15px]">
    <div 
      v-for="(rate, index) in ratingOptions" 
      :key="index" 
      class="flex items-center cursor-pointer"
      @click="toggleRating(index)"
    >
      <div
        class="h-5 w-5 rounded-full border-2 transition-all duration-200"
        :class="selectedRating === rate.value 
          ? 'border-white bg-black ring-black ring-2' 
          : 'border-black'"
      ></div>

      <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
        {{ rate.stars }}
        <p class="ml-2 text-black text-[16px] font-light">{{ rate.value }}</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';

interface Star {
    stars: string;
    value: number; // numeric value
}

export default {
    name: "star-category-component",
    props: {
        ratingOptions: {
            type: Array as PropType<Star[]>,
            required: true
        }
    },
    emits: ["update"],
    setup(props, { emit }) {
        const selectedRating = ref<number | null>(null);

        const toggleRating = (index: number) => {
            const option = props.ratingOptions[index];
            if (!option) return; // safe check
            if (selectedRating.value === option.value) {
                selectedRating.value = null; // unselect
                emit("update", null);
            } else {
                selectedRating.value = option.value;
                emit("update", option.value);
            }
        };

        return { selectedRating, toggleRating };
    }
};
</script>


