<template>
    <span class="font-semibold text-[20px]">Colours:</span>

    <div class="flex gap-4 mt-1 items-center">
        <button
            v-for="(color, index) in colors"
            :key="index"
            @click="selectColor(index)"
            :class="[
                'rounded-full transition-all duration-200',
                selectedColor === index
                ? 'w-6 h-6 border-2 border-white ring-2 ring-black'
                : 'w-6 h-6'
            ]"
            :style="{ background: color }"
        ></button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "colour-picker-component",

    props: {
        colors: {
            type: Array as () => string[],
            required: true
        }
    },

    setup(props) {
        const selectedColor = ref(0);

        const selectColor = (index: number) => {
            selectedColor.value = index;
        };

        return {
            selectedColor,
            selectColor
        };
    }
});
</script>
