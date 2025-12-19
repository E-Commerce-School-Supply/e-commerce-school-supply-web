<template>
  <div class="product-detail-view">

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-4 py-6 mt-10">
      <div class="flex items-center space-x-2 text-gray-600">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <router-link to="/product-list">Products</router-link>
        <span>/</span>
        <span class="font-medium">{{ product?.name || 'Product' }}</span>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-if="product" class="max-w-7xl mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Left: Image -->
        <div class="flex flex-col items-center justify-center">
          <div class="w-full bg-gray-100 rounded-lg p-8 flex items-center justify-center h-96">
            <img :src="product.imageUrl || product.imageURL" :alt="product.name" class="max-h-96 object-contain">
          </div>
          <div v-if="product.discount" class="mt-4">
            <span class="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg font-bold">
              Save {{ product.discount }}%
            </span>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="flex flex-col">
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex text-[#FF6B6B] text-2xl">
              <template v-for="n in 5" :key="n">
                <span v-if="n <= Math.floor(0)">★</span>
                <span v-else-if="n - 0 <= 0.5">⯪</span>
                <span v-else>☆</span>
              </template>
            </div>
            <span class="font-semibold">{{ (0).toFixed(1) }}</span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-bold">${{ getDiscountedPrice(product) }}</span>
              <span v-if="product.discount" class="text-2xl text-gray-400 line-through">${{ product.price?.toFixed(2) }}</span>
            </div>
          </div>

          <p class="text-gray-700 text-lg mb-6">{{ product.description || 'High-quality school product' }}</p>

          <!-- Details -->
          <div class="border-t border-b border-gray-200 py-6 mb-6 space-y-2">
            <div class="flex justify-between" v-if="product.mainCategory">
              <span class="text-gray-600">Category:</span>
              <span class="font-semibold">{{ product.mainCategory }}</span>
            </div>
            <div class="flex justify-between" v-if="product.subCategory">
              <span class="text-gray-600">Sub Category:</span>
              <span class="font-semibold">{{ product.subCategory }}</span>
            </div>
            <div class="flex justify-between" v-if="product.brandName">
              <span class="text-gray-600">Brand:</span>
              <span class="font-semibold">{{ product.brandName }}</span>
            </div>
            <div class="flex justify-between" v-if="product.color">
              <span class="text-gray-600">Color:</span>
              <span class="font-semibold">{{ product.color }}</span>
            </div>
            <div class="flex justify-between" v-if="product.size">
              <span class="text-gray-600">Size:</span>
              <span class="font-semibold">{{ product.size }}</span>
            </div>
            <div class="flex justify-between" v-if="product.material">
              <span class="text-gray-600">Material:</span>
              <span class="font-semibold">{{ product.material }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Stock:</span>
              <span :class="(product.stockQuantity ?? 0) > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                {{ (product.stockQuantity ?? 0) > 0 ? `${product.stockQuantity} Available` : 'Out of Stock' }}
              </span>
            </div>
          </div>

          <!-- Quantity and Add to Cart -->
            <div class="flex gap-4 mb-8">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button @click="quantity > 1 && quantity--" class="px-4 py-2 hover:bg-gray-100">-</button>
              <span class="px-6 py-2 font-semibold">{{ quantity }}</span>
              <button @click="quantity++" :disabled="quantity >= (product.stockQuantity ?? 0)" class="px-4 py-2 hover:bg-gray-100 disabled:opacity-50">+</button>
            </div>
            <button
              @click="addToCart"
              :disabled="(product.stockQuantity ?? 0) === 0"
              class="flex-1 bg-[#1A535C] text-white font-bold py-3 rounded-lg hover:bg-[#154B5F] disabled:bg-gray-400 transition"
            >
              {{ (product.stockQuantity ?? 0) === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
          </div>

          <!-- Back Button -->
          <router-link to="/product-list" class="text-center bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300">
            ← Back to Products
          </router-link>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="flex justify-center items-center min-h-96">
      <p class="text-gray-500">Loading product...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initFlowbite } from 'flowbite'

export default {
  name: 'product-detail-view',
  components: {},
  data() {
    return {
      authStore: useAuthStore(),
      product: null as any,
      quantity: 1,
    }
  },
  computed: {},
  methods: {
    getDiscountedPrice(product: any) {
      const discount = product.discount ?? 0
      const priceAfterDiscount = product.price - (product.price * discount) / 100
      return (Math.floor(priceAfterDiscount * 100) / 100).toFixed(2)
    },
    async addToCart() {
      const cartStore = useCartStore()
      if (!this.authStore.user) {
        alert('Please sign in first')
        return
      }
      try {
        for (let i = 0; i < this.quantity; i++) {
          await cartStore.addToCart({
            productId: this.product.id,
            name: this.product.name,
            itemNo: this.product.id,
            brand: this.product.brandName || 'TovRean',
            color: this.product.color || 'Standard',
            rating: 0,
            price: this.product.price,
            quantity: 1,
            image: this.product.imageUrl || this.product.imageURL || '',
          })
        }
        alert(`Added ${this.quantity} item(s) to cart!`)
        this.quantity = 1
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    },
    async loadProduct() {
      const route = useRoute()
      const productStore = useProductStore()
      try {
        if (productStore.products.length === 0) {
          await productStore.fetchProducts()
        }
        const productId = route.params.id as string
        this.product = productStore.products.find((p) => p.id === productId)
      } catch (error) {
        console.error('Error loading product:', error)
      }
    },
  },
  setup() {
    onMounted(() => {
      initFlowbite()
    })
  },
  created() {
    this.loadProduct()
  },
}
</script>

<style scoped>
.product-detail-view {
  min-height: 100vh;
}
</style>
