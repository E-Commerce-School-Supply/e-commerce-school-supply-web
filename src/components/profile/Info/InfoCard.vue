<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  value: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <div class="flex-1 min-w-[250px] border border-default rounded-base p-5">
    <div class="flex items-center gap-3">
      <div class="text-accent">
        <component :is="icon" :size="24" />
      </div>
      <div class="flex-1">
        <p class="text-sm text-body font-medium">{{ label }}</p>
        <p class="text-base text-heading font-semibold mt-1">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-accent {
  color: #e03b3b;
}
.text-body {
  color: #6b7280;
}
.text-heading {
  color: #111827;
}
.border-default {
  border-color: #e5e7eb;
}
.rounded-base {
  border-radius: 0.5rem;
}
</style>
