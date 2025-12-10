<template>
    <div class="text-base/8 text-[15px]">
        <div 
            v-for="(cat, index) in categories" 
            :key="index" 
            class="flex items-center cursor-pointer mb-2"
            @click="selectCategory(index)"
        >
            <div 
                class="h-5 w-5 rounded-full border-2 transition-all duration-200"
                :class="
                    selected === index 
                        ? 'border-white bg-black ring-black ring-2' 
                        : 'border-black'
                "
            ></div>

            <p class="ml-2 text-[15px]">{{ cat }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: "CategoryComponent",

    props: {
        categories: {
            type: Array as () => string[],
            required: true
        }
    },

    emits: ["update"],

    setup(props, { emit }) {
        const selected = ref<number | null>(null);

        // 👇 When user selects category → emit back to parent
        const selectCategory = (index: number) => {
            if (selected.value === index) {
                // Toggle off
                selected.value = null;
                emit("update", null); // send null to parent
            } else {
                selected.value = index;
                emit("update", props.categories[index]);
            }
        };

        return {
            selected,
            selectCategory
        };
    }
});
</script>
