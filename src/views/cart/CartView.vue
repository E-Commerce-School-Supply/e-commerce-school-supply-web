<template>
  <div class="flex">
    <!-- Left side -->
    <div class="w-[1324px] pt-[50px] pl-[70px] pr-[70px]">
      <div class="mb-8 text-lg">
        <span class="font-light">Home / </span>
        <span class="font-normal">Cart</span>
      </div>

      <p class="text-[32px] font-bold mt-12 mb-12">My Cart</p>
      <!-- Cart header -->
      <div class="sm:grid sm:grid-cols-5 mb-1 font-semibold">
        <div class="col-span-2"><span>Products</span></div>

        <div class="flex items-center justify-between col-span-2 ml-20">
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
      </div>
      <hr class="mb-6" />
      <!-- Cart Items -->
      <div class="space-y-6">
        <div
          v-if="cartStore.items.length === 0"
          class="text-center py-12"
        >
          <p class="text-lg text-gray-500">Your cart is empty</p>
          <router-link
            to="/product-list"
            class="text-blue-600 hover:underline mt-4 inline-block"
          >
            Continue Shopping
          </router-link>
        </div>
        <div
          v-for="item in cartStore.items"
          :key="item.productId"
          class="border-b border-neutral-black-100 pb-6 last:border-b-0"
        >
          <!-- Each product summery -->
          <div class="hidden sm:grid sm:grid-cols-5 gap-4 items-center">
            <!-- Product info with image -->
            <div class="col-span-2">
              <div class="flex gap-10">
                <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded" />

                <div class="flex-1">
                  <h3 class="text-[20px] font-medium mb-2">
                    {{ item.name }}
                  </h3>

                  <div class="space-y-1 text-xs">
                    <p>Item No: {{ item.itemNo }}</p>

                    <p>Brand: {{ item.brand }}</p>

                    <div class="flex items-center gap-1 mt-1">
                      <div class="flex">
                        <span v-for="i in 5" :key="i" class="text-[#FF6B6B]">
                          <span v-if="i <= Math.floor(item.rating)">★</span>
                          <span v-else-if="i - item.rating <= 0.5">⯪</span>
                          <span v-else>☆</span>
                        </span>
                      </div>

                      <span>{{ item.rating.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between col-span-2 ml-20">
              <!-- Price -->
              <span>${{ item.price.toFixed(2) }}</span>
              <!-- Quantity -->
              <span>
                <QuantityInput
                  :value="item.quantity"
                  @update:value="updateQuantity(item.productId, $event)"
                />
              </span>
              <!-- Total -->
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>

            <button @click="removeItem(item.productId)" class="justify-self-end">
              <svg class="w-5 h-5 text-neutral-black-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side -->
    <div class="bg-[#E8E8E8] flex flex-col w-[596px] p-[50px]">
      <p class="text-[32px] font-bold">Order Summary</p>

      <hr class="border-3 border-black mt-5" />

      <!-- Detail -->
      <ul class="text-[16px] font-semibold">
        <li class="flex justify-between mt-8">
          <span class="text-[#5C5F6A]">Subtotal</span>
          <span> ${{ cartStore.subtotal.toFixed(2) }} </span>
        </li>

        <li class="flex justify-between mt-8">
          <span class="text-[#5C5F6A]">Shipping</span>
          <span>
            {{ cartStore.shipping === 0 ? 'Free' : `$${cartStore.shipping.toFixed(2)}` }}
          </span>
        </li>

        <li class="flex justify-between mt-8 mb-8">
          <span class="text-[#5C5F6A]">Tax</span>
          <span> ${{ cartStore.tax.toFixed(2) }} </span>
        </li>

        <hr class="border-3 border-black" />

        <li class="flex justify-between mt-8 mb-8 text-[20px]">
          <span>Total</span>
          <span> ${{ cartStore.total.toFixed(2) }} </span>
        </li>
      </ul>

      <hr class="border-3 border-black" />

      <!-- Button -->
      <div class="flex flex-col items-center">
        <button
          @click="handleCheckout"
          class="bg-black text-white w-[296px] text-[14px] font-semibold py-3 mt-6 mb-6 rounded-xl"
        >
          Checkout
        </button>
        <router-link
          to="/product-list"
          class="underline text-[12px] font-semibold text-gray-900 hover:text-gray-600 cursor-pointer"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuantityInput from '@/components/QuantityInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const isAuthenticated = computed(() => !!authStore.user)

// Fetch cart when component mounts
onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      await cartStore.fetchCart()
    } catch (err) {
      console.error('Error loading cart:', err)
    }
  }
})

const handleCheckout = () => {
  if (!isAuthenticated.value) {
    alert('You cannot checkout as a guest. Please sign in or register to continue.')
    return
  }

  if (cartStore.items.length === 0) {
    alert('Your cart is empty. Add items before checkout.')
    return
  }

  // Navigate to checkout route
  router.push({ name: 'checkout' })
}

const updateQuantity = async (productId: string, newQuantity: number) => {
  if (newQuantity > 0) {
    try {
      await cartStore.updateQuantity(productId, newQuantity)
    } catch (err) {
      console.error('Error updating quantity:', err)
    }
  }
}

const removeItem = async (productId: string) => {
  try {
    await cartStore.removeFromCart(productId)
  } catch (err) {
    console.error('Error removing item:', err)
  }
}
</script>
