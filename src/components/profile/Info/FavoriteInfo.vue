<script setup lang="ts">
import ProductCardComponent from '@/components/product/product-card-component.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import type { Product } from '@/types/product'
import { ref } from 'vue'

const products = ref<Product[]>([
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/668/original/backpack-transparent-background-with-ai-generative-free-png.png',
    name: 'UrbanTrail Classic 25L Backpack',
    price: 39.99,
    rating: 2.8,
    discount: null,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL: 'https://i.pinimg.com/originals/a4/b0/2d/a4b02dd9c6ec52fe882845b2866c5f2e.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: null,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 39.99,
    rating: 4.5,
    discount: 80,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
  {
    imageURL:
      'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
    name: 'Comfort Sneakers',
    price: 40.0,
    rating: 4.5,
    discount: 30,
  },
])
</script>

<template>
  <div class="border border-default border-dashed rounded-base p-5">
    <div class="w-full flex flex-row justify-between items-center mb-5">
      <div class="w-full max-w-4xl">
        <SearchInput />
      </div>
      <span class="text-gray-400 text-sm">168 items</span>
    </div>

    <div class="w-full flex flex-wrap justify-evenly gap-10">
      <ProductCardComponent :products="products" />
    </div>
  </div>
</template>
