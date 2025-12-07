<template>
  <div class="flex">

        <!-- Left side -->
        <div class= "w-[1324px] pt-[50px] pl-[70px] pr-[70px]">

            <div class="mb-8 text-lg">
                <span class="font-light">Home / </span>
                <span class="font-normal">Cart</span>
            </div>

            <p class="text-[32px] font-bold mt-12 mb-12">
                My Cart
            </p>
            <!-- Cart header -->
            <div class="sm:grid sm:grid-cols-5 mb-1 font-semibold">
                <div class="col-span-2"><span>Products</span></div>

                <div class="flex items-center justify-between col-span-2 ml-20">
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Total</span>
                </div>
            </div>
            <hr class=" mb-6">
            <!-- Cart Items -->
          <div class="space-y-6">
            <div
              v-for="item in items"
              :key="item.id"
              class="border-b border-neutral-black-100 pb-6 last:border-b-0"
            >

              <!-- Each product summery -->
              <div class="hidden sm:grid sm:grid-cols-5 gap-4 items-center">
                <!-- Product info with image -->
                <div class="col-span-2">
                  <div class="flex gap-10">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-24 h-24 object-cover rounded"/>

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
                                <span v-else-if = "i - item.rating <= 0.5">⯪</span>
                                <span v-else>☆</span>
                            </span>
                          </div>

                          <span>{{ item.rating.toFixed(1) }}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class=" flex items-center justify-between col-span-2 ml-20">
                  <!-- Price -->
                    <span>${{ item.price.toFixed(2) }}</span>
                  <!-- Quantity -->
                  <span>
                    <QuantityInput
                      :value="item.quantity"
                      @update:value="updateQuantity(item.id, $event)"/>
                  </span>
                  <!-- Total -->
                  <span>${{ (item.price * item.quantity).toFixed(2) }}</span>

                </div>

                <button @click="removeItem(item.id) " class="justify-self-end">
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
            <p class="text-[32px] font-bold">
                Order Summary
            </p>

            <hr class="border-3 border-black mt-5">

            <!-- Detail -->
            <ul class="text-[16px] font-semibold">
                <li class="flex justify-between mt-8">
                    <span class="text-[#5C5F6A]">Subtotal</span>
                    <span>
                      ${{ subtotal.toFixed(2) }}
                    </span></li>

                <li class="flex justify-between mt-8">
                    <span class="text-[#5C5F6A]">Shipping</span>
                    <span>
                      {{ shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` }}
                    </span></li>

                <li class="flex justify-between mt-8 mb-8">
                    <span class="text-[#5C5F6A]">Tax</span>
                    <span>
                      ${{ tax.toFixed(2) }}
                    </span></li>

                <hr class="border-3 border-black">

                <li class="flex justify-between mt-8 mb-8 text-[20px]">
                    <span>Total</span>
                    <span>
                      ${{ total.toFixed(2) }}
                    </span></li>
            </ul>

            <hr class="border-3 border-black">

            <!-- Button -->
            <div class="flex flex-col items-center">
                <button class="bg-black text-white w-[296px] text-[14px] font-semibold py-3 mt-6 mb-6 rounded-xl">
                    Checkout
                </button>
                <button class="underline text-[12px] font-semibold">
                    Continue Shopping
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuantityInput from '@/components/QuantityInput.vue';
import { ref, computed } from 'vue'

interface CartItem {
  id: string;
  name: string;
  itemNo: string;
  brand: string;
  color: string;
  rating: number;
  price: number;
  quantity: number;
  image: string;
}

const items = ref<CartItem[]>([
  {
    id: '1',
    name: 'SilverEdge Pen',
    itemNo: 'P100001',
    brand: 'RegalPen Co.',
    color: '#0088FF',
    rating: 4.0,
    price: 0.5,
    quantity: 2,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/69236cf9574e2a9eec18172993f33671e53e89c5?width=160',
  },
  {
    id: '2',
    name: 'UrbanTrail Classic 25L Backpack',
    itemNo: 'P200001',
    brand: 'UrbanPack Co.',
    color: '#00C0E8',
    rating: 4.5,
    price: 29.99,
    quantity: 1,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/52e0d5cf1d43449df0ded3ca817df84d455e1839?width=160',
  },
]);

const updateQuantity = (id: string, newQuantity: number) => {
  if (newQuantity > 0) {
    const item = items.value.find(i => i.id === id);
    if (item) {
      item.quantity = newQuantity;
    }
  }
};
const removeItem = (id: string) => {
  items.value = items.value.filter(item => item.id !== id);
};

const subtotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const shipping = 0;
const tax = 1.0;

const total = computed(() => subtotal.value + shipping + tax);

</script>
