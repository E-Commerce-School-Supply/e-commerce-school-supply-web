<template>
  <div class="w-full flex flex-col lg:flex-row min-h-screen">
    <!-- Left side -->
    <div class="w-full pt-8 px-4 md:px-10 lg:pl-[70px] lg:pr-[70px]">
      <div class="mb-8 text-lg">
        <span class="font-light">{{ $t('common.home') }} / </span>
        <span class="font-normal">{{ $t('footer.cart') }}</span>
      </div>

      <p class="text-[32px] font-bold mt-12 mb-12">{{ $t('cart.title') }}</p>
      <!-- Cart header -->
      <div class="">
      
          <div class="hidden sm:grid sm:grid-cols-5 mb-1 font-semibold">
            <div class="col-span-2"><span>{{ $t('cart.table_product') }}</span></div>
            <div class="flex items-center justify-between col-span-2 ml-20">
              <span>{{ $t('cart.table_price') }}</span>
              <span>{{ $t('cart.table_quantity') }}</span>
              <span>{{ $t('cart.table_total') }}</span>
            </div>
          </div>
          <hr class="mb-6">
         
      </div>
      <!-- Cart Items -->
       <div v-if="isLoading">
          <Spinner/>
       </div>
       <div v-else>
          <div
          v-if="cartStore.items.length === 0" class="text-center py-12">
          <p class="text-lg text-gray-500">{{ $t('cart.empty') }}</p>
          <router-link
          to="/product-list"
          class="text-blue-600 hover:underline mt-4 inline-block"
          >
          {{ $t('common.continue_shopping') }}
          </router-link>
          </div>
          <CartItem
            v-else
            v-for="item in items"
            :key="item.productId"
            :item="item"
            @update-quantity="updateQuantity"
            @remove="removeItem"
          />
       </div>
    </div>

    <!-- Right side -->
    <div class="w-full flex mr-10 items-center lg:w-[40%] xl:w-[35%]">
      <div class="lg:sticky lg:top-24 bg-[#E8E8E8] flex flex-col w-full p-8 lg:p-[50px] rounded-xl shadow-sm mb-10">
        <p class="text-[32px] font-bold text-gray-900">{{ $t('cart.summary_title') }}</p>

        <hr class="border-t-2 border-black mt-5" />

        <ul class="text-[16px] font-semibold">
          <li class="flex justify-between mt-8">
            <span class="text-[#5C5F6A]">{{ $t('cart.subtotal') }}</span>
            <span class="text-gray-900"> ${{ cartStore.subtotal.toFixed(2) }} </span>
          </li>

          <li class="flex justify-between mt-8">
            <span class="text-[#5C5F6A]">{{ $t('cart.shipping') }}</span>
            <span class="text-gray-900">
              {{ cartStore.shipping === 0 ? $t('cart.free') : `$${cartStore.shipping.toFixed(2)}` }}
            </span>
          </li>

          <li class="flex justify-between mt-8 mb-8">
            <span class="text-[#5C5F6A]">{{ $t('cart.tax') }}</span>
            <span class="text-gray-900"> ${{ cartStore.tax.toFixed(2) }} </span>
          </li>

          <hr class="border-t-2 border-black" />

          <li class="flex justify-between mt-8 mb-8 text-[20px] text-gray-900">
            <span>{{ $t('cart.total') }}</span>
            <span> ${{ cartStore.total.toFixed(2) }} </span>
          </li>
        </ul>

        <hr class="border-t-2 border-black" />

        <div class="flex flex-col items-center">
          <button
            @click="handleCheckout"
            class="bg-black text-white w-full max-w-[296px] text-[14px] font-semibold py-3 mt-6 mb-6 rounded-xl hover:bg-gray-800 transition-colors"
          >
            {{ $t('cart.checkout_btn') }}
          </button>
          <router-link
            to="/product-list"
            class="underline text-[12px] font-semibold text-gray-900 hover:text-gray-600 cursor-pointer"
          >
            {{ $t('common.continue_shopping') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
import QuantityInput from '@/components/QuantityInput.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const isAuthenticated = computed(() => !!authStore.user)

const {items, isLoading, error} = storeToRefs(cartStore);

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


console.log(items.value);
const handleCheckout = () => {
  if (!isAuthenticated.value) {
    alert(t('cart.alert_guest'))
    return
  }

  if (cartStore.items.length === 0) {
    alert(t('cart.alert_empty'))
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
