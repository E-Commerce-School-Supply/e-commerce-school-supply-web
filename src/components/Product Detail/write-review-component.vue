<template>
  <div>
    <!-- Show Review Card if user already submitted -->
    <div v-if="userReview">
      <review-card-component
        :review="userReview"
        :editable="true"
        @edit="editReview"
        @delete="deleteReview"
      />
    </div>

    <!-- Show Form if no review submitted -->
    <div v-else>
      <h2 class="text-2xl font-bold">Write a review for this product</h2>
      <div class="flex gap-4 mt-4">
        <!-- Profile -->
        <img :src="profilePic" class="w-[50px] h-[50px] rounded-full bg-gray-400" />

        <!-- Form -->
        <div class="flex-1 space-y-3">
          <input
            type="text"
            placeholder="Review Title"
            v-model="title"
            class="w-full h-[40px] px-3 rounded-sm focus:outline-none bg-white"
          />
          <textarea
            placeholder="Write your comments..."
            v-model="body"
            class="w-full h-[150px] px-3 py-2 rounded-sm resize-none focus:outline-none bg-white"
          ></textarea>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-wrap justify-end mt-4">
        <div class="flex flex-col text-sm">
          <label class="font-semibold mb-1">Recommend this product?</label>
          <drop-down-component v-model="recommendOption" :options="recommendOptions" />
        </div>

        <div class="flex flex-col text-sm">
          <label class="font-semibold mb-1">Rating</label>
          <drop-down-component v-model="starOption" :options="starOptions" />
        </div>

        <button
          @click="submitReview"
          class="mt-6 px-6 py-3 bg-[#1A535C] text-white rounded-sm font-semibold"
        >
          Post your review
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import DropDownComponent from "./drop-down-component.vue";
import ReviewCardComponent from "./review-card-component.vue";

interface Review {
    id: number;
    profile: string;
    name: string;
    title: string;
    body: string;
    rating: number;
    recommend: boolean;
    verified: boolean;
    date: string;
}

export default defineComponent({
  name: "WriteReviewComponent",
  components: { DropDownComponent, ReviewCardComponent },

  props: {
    profilePic: {
      type: String,
      default: "https://i.pinimg.com/736x/e5/da/72/e5da72f5e61cd1776498bae3cb7b8645.jpg"
    },
    currentUserName: {
      type: String,
      required: true
    },
    userReview: {
      type: Object as PropType<Review | null>,
      default: null
    }
  },

  emits: ["submit-review", "delete-review"],

  setup(props, { emit }) {
    const title = ref("");
    const body = ref("");
    const starOption = ref("5");
    const recommendOption = ref("true");

    const recommendOptions = [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ];

    const starOptions = [
      { label: "5 Stars", value: "5" },
      { label: "4 Stars", value: "4" },
      { label: "3 Stars", value: "3" },
      { label: "2 Stars", value: "2" },
      { label: "1 Star", value: "1" }
    ];

    const submitReview = () => {
      if (!title.value || !body.value) return;

      emit("submit-review", {
        id: Date.now(),
        profile: props.profilePic,
        name: props.currentUserName,
        title: title.value,
        body: body.value,
        rating: Number(starOption.value),
        recommend: recommendOption.value === "true",
        verified: true,
        date: new Date().toISOString()
      });

      title.value = "";
      body.value = "";
      starOption.value = "5";
      recommendOption.value = "true";
    };

    const editReview = () => {
      if (!props.userReview) return;

      title.value = props.userReview.title;
      body.value = props.userReview.body;
      starOption.value = props.userReview.rating.toString();
      recommendOption.value = props.userReview.recommend ? "true" : "false";

      emit("delete-review", props.userReview.id);
    };

    const deleteReview = () => {
      if (!props.userReview) return;
      emit("delete-review", props.userReview.id);
    };

    return {
      title,
      body,
      starOption,
      recommendOption,
      recommendOptions,
      starOptions,
      submitReview,
      editReview,
      deleteReview
    };
  }
});
</script>

