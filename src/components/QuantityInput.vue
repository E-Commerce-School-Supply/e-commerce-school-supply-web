<template>
  <div class="flex items-center gap-4 border rounded px-4 py-2 w-fit">

    <button @click="updateQuantity(value - 1)">
      <span>-</span>
    </button>

    <span class="text-center w-6 font-inter font-medium text-neutral-black-b800">
      {{ value }}
    </span>

    <button @click="updateQuantity(value + 1)">
      <span>+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
}>()

const emit = defineEmits<{
  'update:value': [value: number]
}>()

const updateQuantity = (qty: number) => {
  if (qty > 0) {
    emit('update:value', qty)
  }
}
</script>
