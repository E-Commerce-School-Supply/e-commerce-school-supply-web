

<template>
  <div class="space-y-2 text-[16px] leading-tight">
    <h2 class="text-[32px]">
      {{ title }}
    </h2>

    <div
      v-for="(item, index) in info"
      :key="index"
      class="flex"
    >
      <span class="font-semibold w-32">
        {{ item.label }}:
      </span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

interface ProductInfoItem {
  label: string
  value: string
}

export default defineComponent({
  name: 'ProductInfo',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Product Info'
    },
    info: {
      type: Array as PropType<ProductInfoItem[]>,
      required: true
    }
  }
})
</script>