<template>
  <div class="flex justify-end my-20 items-center gap-6 text-[16px] select-none">

    <!-- Previous -->
    <div
      class="cursor-pointer"
      :class="current === 1 ? 'text-[#A1A1A1] cursor-default' : ''"
      @click="goPrevious"
    >
      Previous
    </div>

    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="h-10 w-10 rounded-lg flex items-center justify-center"
        :class="page === current 
          ? 'bg-[#2C2C2C] text-white' 
          : page !== '...' ? 'cursor-pointer hover:bg-gray-200' : ''"
        @click="page !== '...' && changePage(page as number)"
      >
        {{ page }}
      </div>
    </div>

    <!-- Next -->
    <div
      class="cursor-pointer"
      :class="current === total ? 'text-[#A1A1A1] cursor-default' : ''"
      @click="goNext"
    >
      Next
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Pagination",

  props: {
    current: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },

  emits: ["update:current"],

  setup(props, { emit }) {
    /**
     * REAL PAGINATION LOGIC
     * Creates an adaptive list like:
     * 1 … 5 6 7 … 20
     */
    const pages = computed<(number | string)[]>(() => {
      const cur = props.current;
      const total = props.total;
      const pages: (number | string)[] = [];

      if (total <= 7) {
        // Show all pages if total small
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        // Always first page
        pages.push(1);

        // Left dots
        if (cur > 4) pages.push("...");

        // Pages around current
        const start = Math.max(2, cur - 1);
        const end = Math.min(total - 1, cur + 1);
        for (let i = start; i <= end; i++) pages.push(i);

        // Right dots
        if (cur < total - 3) pages.push("...");

        // Last page
        pages.push(total);
      }

      return pages;
    });


    // Change page
    const changePage = (page: number) => {
      emit("update:current", page);
    };

    // Previous
    const goPrevious = () => {
      if (props.current > 1) {
        emit("update:current", props.current - 1);
      }
    };

    // Next
    const goNext = () => {
      if (props.current < props.total) {
        emit("update:current", props.current + 1);
      }
    };

    return {
      pages,
      changePage,
      goPrevious,
      goNext
    };
  }
});
</script>
