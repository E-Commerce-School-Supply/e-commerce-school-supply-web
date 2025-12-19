<template>
  <div class="space-y-8 border-b border-gray-300 pb-6 relative">
    <!-- Edit/Delete Buttons -->
    <div v-if="editable" class="absolute bottom-2 right-2 flex gap-2">
      <button @click="$emit('edit')" class="px-2 py-1 text-white bg-blue-500 rounded-sm">Edit</button>
      <button @click="$emit('delete')" class="px-2 py-1 text-white bg-red-500 rounded-sm">Delete</button>
    </div>

    <!-- Top Row: Profile + Name + Stars + Verified -->
    <div class="flex justify-between items-start">
      <!-- Left Profile + Name + Stars -->
      <div class="flex gap-3">
        <img
          :src="avatarSrc"
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

          <h4 class="mt-3 font-semibold text-lg">{{ review.title }}</h4>
          <p class="text-gray-700 text-sm leading-relaxed text-wrap max-w-[800px]">{{ review.body }}</p>

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlankProfile from '@/assets/images/pfp_blank.jpeg'

export default defineComponent({
  name: "review-card-component",
  props: {
    review: { type: Object, required: true },
    editable: { type: Boolean, default: false }
  },
  computed: {
    avatarSrc(): string {
      const raw = (this as any)?.review?.profile
      if (typeof raw !== 'string') return BlankProfile
      const s = raw.trim()
      if (!s) return BlankProfile
      if (/^(https?:\/\/|data:image\/|blob:|\/|\.{1,2}\/)/.test(s)) return s
      return BlankProfile
    }
  }
});
</script>
