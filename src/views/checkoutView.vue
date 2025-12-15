<template>

  <div class="flex justify-around p-10">

    <!-- Left side -->

    <div>
      <div class="w-5xl p-8 border rounded-2xl mb-5">

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Delivery Address</h2>

        <AddDropdown
          :addresses="savedAddresses"
          v-model="selectedAddress"
          class="mb-5"
        />

        <!-- Address Detail Section -->
        <h3 class="mb-4 text-2xl font-bold">Address Detail</h3>

        <div v-if="selectedAddress" class=" grid grid-cols-2 gap-4">

          <div>
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input v-model="selectedAddress.country" placeholder="Cambodia" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Province/City</label>
            <input v-model="selectedAddress.province" placeholder="Phnom Penh" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">House Number</label>
            <input v-model="selectedAddress.houseNumber" placeholder="#" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Street</label>
            <input v-model="selectedAddress.street" placeholder="St." type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input v-model="selectedAddress.addressLine1" placeholder="Address 1"  type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Address Line 2 (optional)</label>
            <input v-model="selectedAddress.addressLine2" placeholder="Address 2" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Zip Code</label>
            <input v-model="selectedAddress.zipCode" placeholder="000000" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

        </div>
      </div>

        <!-- Shipping option -->
        <div class="w-5xl border rounded-2xl p-8 mb-5">
          <div class="mb-4 text-2xl font-bold">
              Shipping Options
          </div>

          <div class="flex gap-6">
          <ShippingOption
            label="Standard Shipping"
            description="2 - 4 Days"
            :price="0"
            :selected="selectedShipping === 'standard'"
            @select="selectedShipping = 'standard'"/>

          <ShippingOption
              label="Priority Shipping"
              description="1 Days"
              :price="2.99"
              :selected="selectedShipping === 'priority'"
              @select="selectedShipping = 'priority'"/>

          </div>
        </div>

        <!-- Payment option -->
         <div class="w-5xl border rounded-2xl p-8">
          <div class="mb-4 text-2xl font-bold">
              Payment Method
          </div>

          <div class="flex flex-col gap-3">
            <PaymentOption
              label="ABA Pay"
              description="Pay with ABA bank"
              :image= "aba"
              :selected="selectedCardment === 'default'"
              @select="selectedCardment = 'default'"
            />
            <PaymentOption
              label="KHQR"
              description="Pay with other memeber bank"
              :image="khqr"
              :selected="selectedCardment === 'khqr'"
              @select="selectedCardment = 'khqr'"
            />
            <PaymentOption
              label="Credit Card"
              description="Pay via bank"
              :image="null"
              :selected="selectedCardment === 'card'"
              @select="selectedCardment = 'card'"
            />

            <PayDropdown
              :cards="savedCards"
              v-if="selectedCardment === 'card'"
              v-model="selectedCard"
            />

            <div v-if="selectedCardment === 'card' && selectedCard" class=" grid grid-cols-1 gap-4">

                <div>
                  <label class="block text-sm font-medium text-gray-700">Name on card</label>
                  <input v-model="selectedCard.name" placeholder="Your name" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Card number</label>
                  <input v-model="selectedCard.cardNum" placeholder="0000 0000 0000 0000" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
                </div>

                <div class="flex gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Expiration date</label>
                    <input v-model="selectedCard.expire" placeholder="00/00" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">CVV</label>
                    <input v-model="selectedCard.cvv" placeholder="000" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
                  </div>
                </div>
            </div>

          </div>
        </div>


    </div>


    <!-- Right side -->
    <div class="min-h-screen bg-white p-4">

      <div class="max-w-4xl">
        <div class="flex flex-col-reverse">
          <!-- Main content area -->
          <div class="flex-1"></div>

          <!-- Order Summary Card -->
          <div class="w-full">
              <!-- Title -->
              <h2 class="text-2xl font-bold mb-8">Order Summary</h2>

              <!-- Order Items -->
              <div class="space-y-6 pb-6">
                <div
                  v-for="item in orderItems"
                  :key="item.id"
                  class="flex gap-4"
                >
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-20 h-20 object-cover rounded"
                    />
                  </div>

                  <!-- Product Details -->
                  <div class="flex-grow">
                    <h3 class="text-lg font-semibold">
                      {{ item.name }}
                    </h3>
                    <p class="text-sm font-light mt-1">
                      {{ item.color }}
                    </p>
                  </div>

                  <!-- Price -->
                  <div class="flex-shrink-0 text-right">
                    <p class="text-base font-bold">
                      ${{ item.price.toFixed(2) }}
                    </p>
                    <p class="text-sm font-light text-gray-500">
                      x{{ item.quantity }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <hr class="border-2 mb-6" />

              <!-- Price Breakdown -->
              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center text-xl">
                  <span>Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>

                <div class="flex justify-between items-center text-xl">
                  <span>Discount</span>
                  <span>-${{ discount.toFixed(2) }}</span>
                </div>

                <div class="flex justify-between items-center text-xl">
                  <span>Shipping</span>
                  <span>{{ Shipping }}</span>
                </div>
              </div>

              <!-- Divider -->
              <hr class="border-2 mb-6" />

              <!-- Total -->
              <div class="flex justify-between items-center mb-8">
                <span class="text-2xl font-semibold ">Total</span>
                <span class="text-2xl font-semibold ">
                  ${{ total.toFixed(2) }}
                </span>
              </div>

              <!-- Discount Code Input -->
              <div class="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount Code"
                  v-model="discountCode"
                  class="flex-grow px-4 py-3 border border-black rounded text-base"
                />
                <button
                  @click="handleApplyDiscount"
                  class="px-6 py-3 bg-[#1A535C] text-white font-medium rounded"
                >
                  Apply
                </button>
              </div>

              <!-- Confirm & Pay Button -->
              <button
                @click="handleConfirmPayment"
                class="w-full py-4 bg-[#1A535C] text-white font-bold rounded text-base"
              >
                Confirm & Pay ${{ total.toFixed(2) }}
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ShippingOption from '@/components/ShippingOption.vue'
import PaymentOption from '@/components/PaymentOption.vue'

// photo import
import aba from '@/assets/images/aba.png'
import khqr from '@/assets/images/khqr.png'
import pen from '@/assets/images/pen.png'


//shipping and Payment option
const selectedShipping = ref('standard')
const selectedCardment = ref('default')


// Example data
const orderItems = ref([
  { id: 1, name: 'Pen', color: 'White', price: 0.5, quantity: 8, image: pen },
  { id: 2, name: 'Notebook', color: 'Blue', price: 2.0, quantity: 3, image: pen }

])

const discountCode = ref('')
const discount = ref(0)
const shipping = ref(0)
const Shipping = computed(() =>
  shipping.value === 0 ? 'Free' : `$${shipping.value.toFixed(2)}`
)

const subtotal = computed(() =>
  orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const total = computed(() => subtotal.value - discount.value + shipping.value)

function handleApplyDiscount() {
  if (discountCode.value === 'SAVE10') {
    discount.value = 0.1
  } else {
    discount.value = 0
  }
}

function handleConfirmPayment() {
  alert(`Payment confirmed: $${total.value.toFixed(2)}`)
}


//Address DropDown
import AddDropdown from '@/components/AddDropdown.vue'

type Address = {
id: number
setName: string
country: string
province: string
houseNumber: string
street: string
addressLine1: string
addressLine2?: string
zipCode: string
}

const selectedAddress = ref<Address>({
  id: 0,
  setName: '',
  country: '',
  province: '',
  houseNumber: '',
  street: '',
  addressLine1: '',
  addressLine2: '',
  zipCode: '',
})

const savedAddresses: Address[] = [
  {
    id: 1,
    setName: 'La Vireak',
    country: 'Cambodia',
    province: 'Phnom Penh',
    houseNumber: '#123',
    street: 'St. 123',
    addressLine1: '123 Monivong Boulevard',
    addressLine2: '',
    zipCode: '012345678',
  },
  {
    id: 2,
    setName: 'Office',
    country: 'Cambodia',
    province: 'Phnom Penh',
    houseNumber: '#456',
    street: 'St. 456',
    addressLine1: '456 Norodom Blvd',
    addressLine2: '',
    zipCode: '987654321',
  },
]


//Payment Dropdown
import PayDropdown from '@/components/PayDropdown.vue'

type Card = {
  id: number
  cardType: string
  name: string
  cardNum: string
  expire: string
  cvv: string
}

const selectedCard = ref<Card>({
  id: 0,
  cardType: '',
  name: '',
  cardNum: '',
  expire: '',
  cvv: '',
})

const savedCards: Card[] = [
  {
    id: 1,
    cardType: 'Visa',
    name: 'KITTY LIM',
    cardNum: '4111 1111 1111 1111',
    expire: '12/27',
    cvv: '123',
  },
  {
    id: 2,
    cardType: 'MasterCard',
    name: 'VIREAK',
    cardNum: '5500 0000 0000 0004',
    expire: '08/26',
    cvv: '456',
  },
]

</script>
