<template>
    <div class="flex items-center space-x-3">
        <span class="text-[20px] font-medium">Colour:</span>
        <div v-if="colors.length === 0" class="text-grey-300 ">
            No colours available
        </div>
        <div v-else class="flex gap-2">
            <button
                v-for="(color, index) in colors"
                :key="index"
                @click="selectColor(index)"
                class="w-8 h-8 rounded-full border-2 transition-all"
                :style="{ backgroundColor: color }"
                :class="{ 'ring-2 ring-offset-2 ring-[#1A535C]': selectedColorIndex === index }"
                :title="`Color ${index + 1}`"
            ></button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'colour-picker-component',
    props: {
        colors: {
            type: Array as () => string[],
            required: true,
            default: () => []
        }
    },
    setup(props) {
        const selectedColorIndex = ref(0)

        const selectColor = (index: number) => {
            selectedColorIndex.value = index
        }

        return {
            selectedColorIndex,
            selectColor
        }
    }
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
