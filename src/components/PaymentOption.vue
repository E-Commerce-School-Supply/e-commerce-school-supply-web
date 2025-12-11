<template>
  <div
    class="flex w-full h-[102px] items-center justify-between p-4 border rounded-lg cursor-pointer"
    :class="{ 'border-[#1A535C] bg-[#1A535C]': selected }"
    @click="emitPay('select')"
  >
    <!-- Radio Button -->
    <div class="flex items-center gap-4">
      <div
        class="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center"
        :class="{ 'border-white': selected }"
      >
        <div
          v-if="selected"
          class="w-3 h-3 bg-white rounded-full"
        ></div>
      </div>

      <!-- Label and Description -->
      <div>
        <p class="font-semibold text-black" :class="{'text-white':selected}">
          {{ label }}</p>
        <p class="text-sm text-gray-500" :class="{'text-white':selected}">
          {{ description }}</p>
      </div>
    </div>

    <!-- image -->
    <div>
      <img
        v-if="image"
        :src="image"
        :alt="label"
        class="w-12 h-8 object-contain"
        object-contain
      />
    </div>

  </div>
</template>

<script setup lang="ts">

defineProps<{
  label: string
  description: string
  image?: string | null
  selected: boolean
}>()

const emitPay = defineEmits<{
  (e: 'select'): void
}>()

</script>
