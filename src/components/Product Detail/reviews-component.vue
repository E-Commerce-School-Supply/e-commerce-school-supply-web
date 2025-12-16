<template>
  <!-- Header: Total reviews + Sort -->
  <div class="flex items-center justify-between h-[70px] border-b border-gray-300 bg-[#F5F5F5] px-6">
    <h2 class="text-xl font-bold">{{ reviews.length }} Reviews</h2>

    <div class="flex items-center gap-2 text-sm">
      <span class="font-semibold text-nowrap">Sort by:</span>
      <drop-down-component v-model="sortOption" :options="sortOptions" />
    </div>
  </div>

  <!-- Review List -->
  <div  class="bg-[#F5F5F5] w-full rounded-sm p-10 space-y-6">
    <review-card-component
      v-if="reviews.length > 0"
      v-for="(review, index) in visibleReviews"
      :key="review.id"
      :review="review"
    />

    <!-- See More / Show Less Buttons -->
    <div class="flex justify-center mt-4 space-x-4">
      <button
        v-if="visibleCount < sortedReviews.length"
        @click="seeMore()"
        class="px-6 py-2 bg-[#1A535C] text-white rounded-sm font-semibold"
      >
        See More
      </button>

      <button
        v-if="visibleCount > initialVisibleCount"
        @click="showLess()"
        class="px-6 py-2 bg-[#1A535C] text-white rounded-sm font-semibold"
      >
        Show Less
      </button>
    </div>
    <div v-if="reviews.length === 0" class="w-full justify-center flex text-[24px]  text-red-500">
        <h1>There are no comment here!!</h1>
    </div>    
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed, type PropType, watch } from "vue";
import ReviewCardComponent from "./review-card-component.vue";
import DropDownComponent from "./drop-down-component.vue";

interface Review {
  id: number;
  profile: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  recommend: boolean;
  verified: boolean;
}

export default defineComponent({
  name: "ReviewsComponent",
  components: { ReviewCardComponent, DropDownComponent },

  props: {
    reviews: {
      type: Array as PropType<Review[]>,
      required: true
    },
    initialVisibleCount: {
      type: Number,
      default: 6
    }
  },

  setup(props) {
    const visibleCount = ref(props.initialVisibleCount);

    const sortOption = ref("newest");

    const sortOptions = [
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
      { label: "Highest Rating", value: "high_rating" },
      { label: "Lowest Rating", value: "low_rating" }
    ];

    // Computed property to sort reviews dynamically
    const sortedReviews = computed(() => {
      return [...props.reviews].sort((a, b) => {
        switch (sortOption.value) {
          case "newest":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "oldest":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "high_rating":
            return b.rating - a.rating;
          case "low_rating":
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
    });

    // Slice sorted reviews for visible count
    const visibleReviews = computed(() =>
      sortedReviews.value.slice(0, visibleCount.value)
    );

    const seeMore = () => {
      visibleCount.value = Math.min(
        visibleCount.value + props.initialVisibleCount,
        sortedReviews.value.length
      );
    };

    const showLess = () => {
      visibleCount.value = props.initialVisibleCount;
    };

    return {
      visibleCount,
      visibleReviews,
      seeMore,
      showLess,
      sortOption,
      sortOptions,
      sortedReviews,
      initialVisibleCount: props.initialVisibleCount
    };
  }
});
</script>
