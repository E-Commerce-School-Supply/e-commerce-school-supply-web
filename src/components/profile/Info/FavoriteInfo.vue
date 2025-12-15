<script setup lang="ts">
import ProductCardComponent from '@/components/product/product-card-component.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { computed } from 'vue'

const favStore = useFavoriteStore()
const products = computed(() => favStore.favorites)
</script>

<template>
  <div class="border border-default border-dashed rounded-base p-5">
    <div class="w-full flex flex-row justify-between items-center mb-5">
      <div class="w-full max-w-4xl">
        <SearchInput />
      </div>
      <span class="text-gray-400 text-sm">{{ favStore.count }} items</span>
    </div>

    <div class="w-full flex flex-wrap justify-evenly gap-10">
      <ProductCardComponent :products="products" />
    </div>
  </div>
</template>
