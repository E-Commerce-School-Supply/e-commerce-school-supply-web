<script setup lang="ts">
import { IconUserFilled } from '@tabler/icons-vue'
import type { Component } from 'vue'
const props = defineProps<{
  label: string
  value: string
  icon: Component
}>()
</script>

<template>
  <div
    class="group w-full max-w-lg bg-white drop-shadow-lg p-5 rounded rounded-4 hover:bg-accent transition"
  >
    <div class="flex flex-row justify-between items-center text-accent mb-5 group-hover:text-white">
      <h1 class="font-bold text-lg">{{ label }}</h1>
      <component :is="icon" class="w-5 h-5" />
    </div>
    <h1 class="font-light text-base group-hover:text-white">{{ value }}</h1>
  </div>
</template>
