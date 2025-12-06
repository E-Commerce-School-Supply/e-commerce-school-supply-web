<template>
    <!-- Title -->
    <h2 class="text-2xl font-bold">Write a review for this product</h2>

    <!-- Profile + Form -->
    <div class="flex gap-4">

        <!-- Profile Circle -->
        <img 
            src="https://i.pinimg.com/736x/e5/da/72/e5da72f5e61cd1776498bae3cb7b8645.jpg"
            class="w-[50px] h-[50px] rounded-full bg-gray-400"></img>

        <!-- Input Fields -->
        <div class="flex-1 space-y-3">

            <!-- Title Field -->
            <input type="text"
                placeholder="Review Title"
                class="w-full h-[40px] px-3 rounded-sm focus:outline-none bg-white" />

            <!-- Comment Field -->
            <textarea
                placeholder="Write your comments..."
                class="w-full h-[150px] px-3 py-2 rounded-sm  resize-none focus:outline-none bg-white"></textarea>

        </div>
    </div>

    <!-- Recommendation + Rating + Button -->
    <div class="flex items-center gap-4 flex-wrap justify-end">

        <!-- Recommend Dropdown -->
        <div class="flex flex-col text-sm">
            <label class="font-semibold mb-1">Recommend this product?</label>
            <drop-down-component v-model="recommendOption" :options="recommendOptions"/>
        </div>

        <!-- Rating Dropdown -->
        <div class="flex flex-col text-sm">
            <label class="font-semibold mb-1">Rating</label>
            <drop-down-component v-model="starOption" :options="starOptions"/>
        </div>

        <!-- Button -->
        <button class="mt-6 px-6 py-3 bg-[#1A535C] text-white rounded-sm font-semibold">
            Post your review
        </button>

    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from "vue";
    import DropDownComponent from "./drop-down-component.vue";
    export default{
        name: "write-review-component",
        components: {
            DropDownComponent
        },

        setup() {
            const starOption = ref("5");
            const recommendOption = ref("true");

            const recommendOptions = [
                {label: "Yes", value: "true"},
                {label: "No", value: "false"},
            ]

            const starOptions = [
                { label: "5 Stars", value: "5" },
                { label: "4 Stars", value: "4" },
                { label: "3 Stars", value: "3" },
                { label: "2 Stars", value: "2" },
                { label: "1 Star", value: "1" },
            ];

            return{
                starOption,
                starOptions,
                recommendOption,
                recommendOptions
            }

        
        }
    }
</script>