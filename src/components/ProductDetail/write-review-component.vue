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
        <!-- Show Form if no review submitted -->
    <div v-else>
      <h2 class="text-2xl font-bold">{{ $t('writeReview.title') }}</h2>
      <div class="flex gap-4 mt-4">
        <!-- Profile -->
        <img :src="profilePicSrc" class="w-[50px] h-[50px] rounded-full bg-gray-400" />

        <!-- Form -->
        <div class="flex-1 space-y-3">
          <input
            type="text"
            :placeholder="$t('writeReview.placeholder_title')"
            v-model="title"
            class="w-full h-10 px-3 rounded-sm focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <textarea
            :placeholder="$t('writeReview.placeholder_body')"
            v-model="body"
            class="w-full h-[150px] px-3 py-2 rounded-sm resize-none focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          ></textarea>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-wrap justify-end mt-4">
        <div class="flex flex-col text-sm dark:text-gray-300">
          <label class="font-semibold mb-1">{{ $t('writeReview.recommend_prompt') }}</label>
          <drop-down-component v-model="recommendOption" :options="recommendOptions" />
        </div>

        <div class="flex flex-col text-sm dark:text-gray-300">
          <label class="font-semibold mb-1">{{ $t('writeReview.rating_prompt') }}</label>
          <drop-down-component v-model="starOption" :options="starOptions" />
        </div>

        <button
          @click="submitReview"
          class="mt-6 px-6 py-3 bg-[#1A535C] text-white rounded-sm font-semibold dark:bg-[#1A535C] dark:text-gray-100 dark:hover:bg-[#2A7A8F]"
        >
          {{ $t('writeReview.post_button') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType } from "vue";
import DropDownComponent from "./drop-down-component.vue";
import ReviewCardComponent from "./review-card-component.vue";
import BlankProfile from '@/assets/images/pfp_blank.jpeg'

interface Review {
  id: string | number;
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
      default: ""
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
        const profilePicSrc = computed(() => {
          const raw = props.profilePic
          if (typeof raw !== 'string') return BlankProfile
          const s = raw.trim()
          if (!s) return BlankProfile
          if (/^(https?:\/\/|data:image\/|blob:|\/|\.{1,2}\/)/.test(s)) return s
          return BlankProfile
        })

    const title = ref("");
    const body = ref("");
    const starOption = ref("0");
    const recommendOption = ref("true");

    const recommendOptions = [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ];

    const starOptions = [
      { label: "0 Stars", value: "0" },
      { label: "5 Stars", value: "5" },
      { label: "4 Stars", value: "4" },
      { label: "3 Stars", value: "3" },
      { label: "2 Stars", value: "2" },
      { label: "1 Star", value: "1" }
    ];

    const submitReview = () => {
      if (!title.value || !body.value) return;
      if (Number(starOption.value) <= 0) return;

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
      starOption.value = "0";
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
      profilePicSrc,
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

