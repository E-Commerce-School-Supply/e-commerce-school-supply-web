<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useToastStore()
// Use storeToRefs to keep reactivity for state, but destructure actions directly
const { isVisible, message, type } = storeToRefs(store)

// Dynamic Styles based on type
const alertClasses = computed(() => {
  return type.value === 'success'
    ? 'text-green-800 bg-green-50 border-green-200'
    : 'text-red-800 bg-red-50 border-red-200'
})
</script>

<template>
  <Transition name="slide-right">
    <div
      v-if="isVisible"
      class="fixed top-5 right-5 z-9999 w-full max-w-sm cursor-pointer"
      @click="store.hideToast()"
    >
      <div
        :class="[
          'flex items-start sm:items-center p-4 mb-4 text-sm rounded-lg border shadow-lg',
          alertClasses,
        ]"
        role="alert"
      >
        <svg
          class="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            v-if="type === 'success'"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>

        <div>
          <span class="font-medium me-1">{{ type === 'success' ? 'Success!' : 'Error!' }}</span>
          {{ message }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
