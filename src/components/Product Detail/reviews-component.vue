<template>
    <!-- Header: 150 reviews + Sort -->
    <div class="flex items-center justify-between h-[70px] border-b border-gray-300 bg-[#F5F5F5] px-6">
        <h2 class="text-xl font-bold">150 Reviews</h2>

        <div class="flex items-center gap-2 text-sm">
            <span class="font-semibold text-nowrap">Sort by:</span>
            <drop-down-component v-model="sortOption" :options="sortOptions"/>
        </div>
    </div>

    <!-- BOTTOM: Review List -->
<div class="bg-[#F5F5F5] w-full rounded-sm p-10 space-y-6">

    <!-- Review List -->
    <review-card-component
        v-for="(review, index) in visibleReviews"
        :key="index"
        :review="review"
    />

    <!-- Buttons -->
    <div class="flex justify-center mt-4 space-x-4">
            <button
                v-if="visibleCount < reviews.length"
                @click="seeMore()"
                class="px-6 py-2 bg-[#1A535C] text-white rounded-sm font-semibold"
                >
                See More
            </button>

            <button
                v-if="visibleCount > 6"
                @click="showLess()"
                class="px-6 py-2 bg-[#1A535C] text-white rounded-sm font-semibold"
                >
                Show Less
            </button>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ReviewCardComponent from './review-card-component.vue';
import DropDownComponent from "./drop-down-component.vue";

export default defineComponent({
    name: "reviews-component",
    components: { ReviewCardComponent, DropDownComponent },
    setup() {
        const reviews = ref([
        {
            id: 1,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Lim Kitty",
            rating: 4,
            date: "2025-12-03 11:11",
            title: "Amazing pen!",
            body: "This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!",
            recommend: true,
            verified: true
        },
        {
            id: 2,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smiths",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: false,
            verified: true
        },
        {
            id: 3,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 4,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 5,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 6,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 7,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 8,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 9,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 10,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 11,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 12,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 13,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 14,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 15,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 16,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        {
            id: 17,
            profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
            name: "Jane Smith",
            rating: 5,
            date: "2025-12-02 14:22",
            title: "Excellent product!",
            body: "I love this pen! Great quality and writes perfectly.",
            recommend: true,
            verified: true
        },
        // Add as many reviews as needed
        ]);

        const visibleCount = ref(6);
        const visibleReviews = computed(() => reviews.value.slice(0, visibleCount.value));

        const seeMore = () => {
        visibleCount.value = Math.min(visibleCount.value + 6, reviews.value.length);
        };

        const showLess = () => {
        visibleCount.value = 6;
        };

        const sortOption = ref("newest");

        const sortOptions = [
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
            { label: "Highest Rating", value: "high_rating" },
            { label: "Lowest Rating", value: "low_rating" },
        ];

        return { 
            reviews, 
            visibleCount, 
            visibleReviews, 
            seeMore, 
            showLess,
            sortOption, 
            sortOptions
        };
    }
});
</script>
