<template>
    <div class="grid grid-cols-8 gap-4 h-full">
        <!-- Thumbnail Images (Left Column) -->
        <div v-if="images.length > 1" class="col-span-2 space-y-3 overflow-auto pr-1">
            <div
                v-for="(image, index) in images"
                :key="index"
                @click="selectImage(index)"
                class="cursor-pointer border rounded-md overflow-hidden hover:border-[#1A535C] transition bg-white h-20 sm:h-24"
                :class="{ 'border-[#1A535C] border-2': selectedIndex === index }"
            >
                <img :src="image" :alt="`Product image ${index + 1}`" class="w-full h-full object-cover" />
            </div>
        </div>

        <!-- Main Image Display -->
        <div
            class="bg-white rounded-md overflow-hidden flex items-center justify-center"
            :class="images.length > 1 ? 'col-span-6' : 'col-span-8'"
        >
            <img
                :src="images[selectedIndex]"
                alt="Selected product image"
                class="w-full h-full object-contain"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'product-image-component',
    props: {
        images: {
            type: Array as () => string[],
            required: true,
            default: () => []
        }
    },
    setup(props) {
        const selectedIndex = ref(0)

        const selectImage = (index: number) => {
            selectedIndex.value = index
        }

        return {
            selectedIndex,
            selectImage
        }
    }
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
