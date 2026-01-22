<template>
  <div class="space-y-8 border-b border-gray-300 pb-6 relative dark:border-gray-700">
    <!-- Edit/Delete Buttons -->
    <div v-if="editable" class="absolute bottom-2 right-2 flex gap-2">
      <button
        @click="$emit('edit')"
        class="px-2 py-1 rounded-sm font-semibold bg-[#1A535C] text-white hover:bg-[#15444a] dark:bg-[#1A535C] dark:text-gray-100 dark:hover:bg-[#2A7A8F]"
      >
        {{ $t("reviewCard.edit") }}
      </button>
      <button
        @click="$emit('delete')"
        class="px-2 py-1 rounded-sm font-semibold border border-[#1A535C] text-[#1A535C] hover:bg-[#1A535C] hover:text-white dark:border-[#1A535C] dark:text-[#1A535C] dark:hover:bg-[#2A7A8F] dark:hover:text-gray-100"
      >
        {{ $t("reviewCard.delete") }}
      </button>
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
            <h3 class="font-semibold text-lg dark:text-white">{{ review.name }}</h3>

            <!-- Stars -->
            <div class="flex items-center text-[#FF6B6B] text-lg ml-10">
              <span v-for="n in 5" :key="n">
                {{ n <= Math.floor(review.rating) ? '★' : '☆' }}
              </span>
              <span class="text-gray-700 text-sm ml-2 dark:text-gray-400">({{ review.rating.toFixed(1) }})</span>
            </div>
          </div>

          <div class="text-gray-500 text-sm dark:text-gray-400">{{ formatDate(review.date) }}</div>

          <h4 class="mt-3 font-semibold text-lg dark:text-white wrap-break-word overflow-hidden max-w-[800px]">{{ review.title }}</h4>
          <p class="text-gray-700 text-sm leading-relaxed wrap-break-word overflow-hidden max-w-[550px] dark:text-gray-300">{{ review.body }}</p>

          <p class="text-sm mt-2 font-medium dark:text-gray-300 wrap-break-word max-w-[800px]">
            {{ $t("reviewCard.recommend_prompt") }}
            <span :class="review.recommend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ review.recommend ? $t("reviewCard.recommend_yes") : $t("reviewCard.recommend_no") }}
            </span>
          </p>
        </div>
      </div>

      <!-- Verified -->
      <div v-if="review.verified" class="flex items-center gap-1 text-green-600 text-sm w-[150px] text-nowrap dark:text-green-400">
        {{ $t("reviewCard.verified_purchase") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlankProfile from '@/assets/images/pfp_blank.jpeg'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

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
      if (s.startsWith('/')) return `${String(API_BASE_URL).replace(/\/$/, '')}${s}`
      if (/^(https?:\/\/|data:image\/|blob:|\.{1,2}\/)/.test(s)) return s
      return BlankProfile
    },
  },
  methods: {
      formatDate(dateString: string) {
        if (!dateString) return ''
        // Split at 'T' and take the first part
        return dateString.split('T')[0]
      }
    }
});
</script>
