<template>
  <div class="space-y-8">
    <!-- SINGLE REVIEW CARD -->
    <div class="border-b border-gray-300 pb-6">
      <!-- Top Row: Profile + Name + Stars + Verified -->
      <div class="flex justify-between items-start">

        <!-- Left Profile + Name + Stars -->
        <div class="flex gap-3">
          <!-- profile image -->
          <img
            :src="review.profile || '/src/assets/images/default-avatar.png'"
            alt="User Profile"
            class="w-[50px] h-[50px] rounded-full object-cover"
          />

          <div class="space-y-1">
            <div class="flex items-center">
              <h3 class="font-semibold text-lg">{{ review.name }}</h3>

              <!-- Stars -->
              <div class="flex items-center text-[#FF6B6B] text-lg ml-10">
                <span v-for="n in 5" :key="n">
                  {{ n <= Math.floor(review.rating) ? '★' : '☆' }}
                </span>
                <span class="text-gray-700 text-sm ml-2">({{ review.rating.toFixed(1) }})</span>
              </div>
            </div>

            <div class="text-gray-500 text-sm">{{ review.date }}</div>

            <!-- Review Title -->
            <h4 class="mt-3 font-semibold text-lg">{{ review.title }}</h4>

            <!-- Review Body -->
            <p class="text-gray-700 text-sm leading-relaxed text-wrap max-w-[800px]">{{ review.body }}</p>

            <!-- Recommend Line -->
            <p class="text-sm mt-2 font-medium">
              Recommend this product:
              <span :class="review.recommend ? 'text-green-600' : 'text-red-600'">
                {{ review.recommend ? '✔ Yes' : '✖ No' }}
              </span>
            </p>
          </div>
        </div>

        <!-- Verified -->
        <div v-if="review.verified" class="flex items-center gap-1 text-green-600 text-sm w-[150px] text-nowrap">
          ✔ Verified purchase
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "review-card-component",
        props: {
            review: {
                type: Object,
                required: true
            }
        },
    });
</script>
