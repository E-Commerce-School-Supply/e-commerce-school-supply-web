<script setup lang="ts">
import type { Product } from '@/types/product';
import FavoriteInfo from './Info/FavoriteInfo.vue'

const props = defineProps<{
  favProduct: Product[]
}>()

</script>

<template>
  <div>
    <h1>My Favorites</h1>
    <FavoriteInfo :products="favProduct"/>
  </div>
</template>
