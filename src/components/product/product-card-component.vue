<template>
  <!-- Product grid -->
  <div
    v-for="(product, index) in products"
    :key="index"
    class="w-[300px] h-[330px] bg-white rounded-[20px] overflow-hidden border border-gray-400 hover:-translate-y-1 hover:shadow-lg transition cursor-pointer"
    @click="goToDetail(product.id)"
  >
    <!-- Image Section -->
    <div class="relative flex justify-center items-center h-40">
      <img
        :src="product.imageURL"
        :alt="product.name"
        class="max-w-[250px] max-h-40 object-contain"
      />

      <!-- Discount -->
      <div
        v-if="product.discount"
        class="absolute top-4 left-4 w-[50px] h-[30px] bg-[#FF6B6B] rounded-[5px] flex justify-center items-center text-white text-[12px]"
      >
        -{{ product.discount }}%
      </div>

      <!-- Out of stock badge -->
      <div v-if="(product.stockQuantity ?? 0) <= 0"
           class="absolute bottom-4 left-4 bg-red-600 text-white text-[12px] px-2 py-1 rounded">
        Out of stock
      </div>

      <!-- Heart Icon -->
      <button @click.stop="toggleLike(index)" class="absolute top-4 right-4 bg-white rounded-full p-2">
        <img v-if="!isLiked[index]" src="/src/assets/images/Heart.png" class="w-[27px] h-6" />
        <img v-else src="/src/assets/images/Heart-fill.png" class="w-[27px] h-6" />
      </button>
    </div>

    <!-- Info Section -->
    <div class="p-4 bg-[#F5F5F5] m-2 rounded-[20px]">
      <!-- Product Name -->
      <h1 class="text-[14px] font-bold">{{ product.name }}</h1>

      <!-- Rating -->
      <div class="flex items-center mb-3 text-[#FF6B6B]">
        <span class="mr-2 font-semibold text-gray-800">{{ product.rating.toFixed(1) }}</span>
        <span class="text-[20px]">
          <template v-for="n in 5" :key="n">
            <span v-if="n <= Math.floor(product.rating)">★</span>
            <!-- full star -->
            <span v-else-if="n - product.rating <= 0.5">⯪</span>
            <!-- half star -->
            <span v-else>☆</span>
            <!-- empty star -->
          </template>
        </span>
      </div>

      <!-- Price and Add to Cart -->
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-sm text-gray-500">Price</h2>
          <div class="flex items-end">
            <p class="font-bold text-[24px]">${{ getDiscountedPrice(product) }}</p>
            <p v-if="product.discount" class="font-bold text-[12px] ml-2 line-through">
              ${{ product.price.toFixed(2) }}
            </p>
          </div>
        </div>

        <button
          @click.stop="btnLink(index)"
          :disabled="(product.stockQuantity ?? 0) <= 0"
          class="text-white w-28 h-[36px] rounded-md text-[12px] font-semibold"
        >
          <div
            v-if="(product.stockQuantity ?? 0) <= 0"
            class="w-full h-full flex justify-center items-center rounded-sm bg-gray-400 opacity-60 cursor-not-allowed"
          >
            Out of stock
          </div>
          <div
            v-else-if="!linkBtn[index]"
            class="bg-[#1A535C] w-full h-full flex justify-center items-center rounded-sm hover:bg-[#15444a] transition"
          >
            Add to Cart
          </div>
          <div
            v-else
            class="bg-[#C3C3C3] w-full h-full flex justify-center items-center rounded-sm"
          >
            Added {{ addedQuantity[index] }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '@/types/product'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { defineComponent, ref, watch, computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

export default defineComponent({
  name: 'product-card-component',

  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
  },

  setup(props) {
    const router = useRouter()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => !!authStore.user)

    // Create reactive arrays to track like and add-to-cart states for each product
    const favStore = useFavoriteStore()
    const isLiked = ref<boolean[]>([])
    const linkBtn = ref<boolean[]>([])
    const addedQuantity = ref<number[]>([])

    // Initialize arrays when products prop changes
    watch(
      () => props.products,
      (newProducts) => {
        isLiked.value = newProducts.map(p => favStore.isFavorited(p.id))
        linkBtn.value = newProducts.map(() => false)
        addedQuantity.value = newProducts.map(() => 0)
      },
      { immediate: true },
    )

    const getDiscountedPrice = (product: Product) => {
      const discount = product.discount ?? 0
      const priceAfterDiscount = product.price - (product.price * discount) / 100
      return (Math.floor(priceAfterDiscount * 100) / 100).toFixed(2)
    }

    const toggleLike = (index: number) => {
      const product = props.products[index]
      favStore.toggleFavorite(product)
      isLiked.value[index] = favStore.isFavorited(product.id)
    }

    const goToDetail = (productId: string | undefined) => {
      if (productId) {
        router.push({ name: 'product-detail', params: { id: productId } })
      }
    }

    const btnLink = async (index: number) => {
      if (!isAuthenticated.value) {
        alert('Please sign in first to add items to your cart')
        return
      }

      const product = props.products[index]
      try {
        // Add item to cart - map product fields correctly
        await cartStore.addToCart({
          productId: product.id || `product-${index}`,
          name: product.name,
          itemNo: product.id || `P${index}`,
          brand: product.brandName || 'TovRean',
          color: product.color || 'Standard',
          rating: product.rating || 4.5,
          price: product.price,
          quantity: 1,
          image: product.imageURL || product.imageUrl || '',
        })
        linkBtn.value[index] = true
        addedQuantity.value[index] = (addedQuantity.value[index] || 0) + 1
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    }

    return {
      isLiked,
      linkBtn,
      addedQuantity,
      toggleLike,
      btnLink,
      goToDetail,
      getDiscountedPrice,
    }
  },
})
</script>
