<template>
  <div class="min-h-screen">

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
        <div class="mt-3 mb-5 flex gap-2">
          <button v-if="selectedAddress && selectedAddress.id" @click="openEdit" class="px-4 py-2 bg-[#1A535C] text-white rounded">Edit Selected Address</button>
          <button @click="addNewAddress" class="px-4 py-2 border rounded">Add New Address</button>
        </div>

        <!-- Address Detail Section -->
        <h3 class="mb-4 text-2xl font-bold">Address Detail</h3>

        <div v-if="selectedAddress" class=" grid grid-cols-2 gap-4">

          <div>
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input v-model="selectedAddress.country" placeholder="Cambodia" type="text" class="mt-1 w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Province/City</label>
            <select v-model="selectedAddress.province" class="mt-1 w-full px-3 py-2 border rounded-md">
              <option value="">Select Province/City</option>
              <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
            </select>
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
            :price="computeShippingFor('standard')"
            :selected="selectedShipping === 'standard'"
            @select="selectedShipping = 'standard'"/>

          <ShippingOption
              label="Priority Shipping"
              description="1 - 2 Days"
              :price="computeShippingFor('priority')"
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
                  :key="item.productId"
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
                :disabled="isProcessing"
                class="w-full py-4 bg-[#1A535C] text-white font-bold rounded text-base disabled:opacity-60"
              >
                <span v-if="isProcessing">Processing...</span>
                <span v-else>Confirm & Pay ${{ total.toFixed(2) }}</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Address Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white w-full max-w-3xl p-6 rounded-lg">
      <AddressEdit :address="editingAddress" @save="onAddressSave" @cancel="closeEdit" />
    </div>
  </div>

  <!-- QR overlay shown after clicking Confirm & Pay -->
  <div v-if="showQR" class="fixed inset-0 z-50 flex items-center justify-center" :style="overlayBackground">
    <div class="bg-white p-12 rounded-3xl w-full max-w-2xl text-center shadow-2xl">
      <h3 class="text-2xl font-bold mb-6">Scan to Pay</h3>
      <img :src="QRImage" alt="QR" class="mx-auto mb-6 w-72 h-72 md:w-96 md:h-96 object-contain" />
      <div class="mt-4 flex justify-center">
        <button
          @click="handleDone"
          :disabled="isDoneProcessing"
          class="px-10 py-4 bg-[#1A535C] text-white rounded-xl text-lg shadow"
        >
          <span v-if="isDoneProcessing">Processing...</span>
          <span v-else>Done</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Success overlay shown after order is placed -->
  <div v-if="showSuccess" class="fixed inset-0 z-60 flex items-center justify-center" :style="overlayBackground">
    <div class="bg-white p-8 rounded-3xl w-full max-w-md text-center shadow-2xl">
      <div class="flex items-center justify-center mb-4">
        <div class="bg-green-100 text-green-700 rounded-full p-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <h3 class="text-2xl font-bold mb-2">Order placed successfully</h3>
      <p class="text-gray-600 mb-4">Thank you — your payment was received.</p>
      <p class="font-semibold mb-6">Total: ${{ successTotal.toFixed(2) }}</p>
      <div class="flex gap-3 justify-center">
        <button @click="goToOrders" class="px-6 py-3 bg-[#1A535C] text-white rounded-md font-medium">View Orders</button>
        <button @click="continueShopping" class="px-6 py-3 bg-gray-100 rounded-md">Continue Shopping</button>
      </div>
    </div>
  </div>

  <!-- Simple inline error banner -->
  <div v-if="errorMessage" class="fixed top-6 right-6 z-70">
    <div class="bg-red-600 text-white px-4 py-2 rounded shadow">{{ errorMessage }}</div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import ShippingOption from '@/components/ShippingOption.vue'
import PaymentOption from '@/components/PaymentOption.vue'
import AddressEdit from '@/components/profile/edit/AddressEdit.vue'
import { useCartStore } from '@/stores/cartStore'
import orderService from '@/services/orderService'
import authService from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

// photo import
import aba from '@/assets/images/aba.png'
import khqr from '@/assets/images/khqr.png'
import QRImage from '@/assets/images/QR.jpg'
import authBackground from '@/assets/images/auth_background.jpg'


//shipping and Payment option
const selectedShipping = ref('standard')
const selectedCardment = ref('default')

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  // Ensure cart is loaded from backend
  try {
    await cartStore.fetchCart()
  } catch (err) {
    console.error('Failed to load cart for checkout', err)
  }
  // Load addresses from backend
  await loadAddresses()
})


// Use cart store items directly for the order summary
const orderItems = computed(() => cartStore.items)

// Provinces list for dropdown
const provinces = [
  'Phnom Penh',
  'Kandal',
  'Siem Reap',
  'Battambang',
  'Banteay Meanchey',
  'Kampong Cham',
  'Kampong Chhnang',
  'Kampong Speu',
  'Kampong Thom',
  'Kampot',
  'Kep',
  'Kratie',
  'Mondulkiri',
  'Oddar Meanchey',
  'Pailin',
  'Preah Sihanouk',
  'Preah Vihear',
  'Prey Veng',
  'Pursat',
  'Ratanakiri',
  'Stung Treng',
  'Svay Rieng',
  'Tbong Khmum',
]

// Helper to compute shipping price for a given method based on selected address
function computeShippingFor(method: 'standard' | 'priority') {
  const province = (selectedAddress.value?.province || '').toString().toLowerCase()
  const isPhnomPenh = province.includes('phnom') || province.includes('phnom penh')

  if (isPhnomPenh) {
    return method === 'priority' ? 2.99 : 0
  }

  return method === 'priority' ? 4.99 : 2.99
}

const discountCode = ref('')
const discount = ref(0)
const isProcessing = ref(false)
const showQR = ref(false)
const isDoneProcessing = ref(false)
const showSuccess = ref(false)
const successTotal = ref(0)
const errorMessage = ref('')

// background for full-screen overlays — use `auth_background.jpg` from assets
const overlayBackground = {
  backgroundImage: `url('${authBackground}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

// Compute shipping cost based on selected address and selectedShipping option
const shippingCost = computed(() => computeShippingFor(selectedShipping.value === 'priority' ? 'priority' : 'standard'))

const Shipping = computed(() => (shippingCost.value === 0 ? 'Free' : `$${shippingCost.value.toFixed(2)}`))

const subtotal = computed(() => cartStore.subtotal)
const tax = computed(() => cartStore.tax)
const total = computed(() => subtotal.value + tax.value + shippingCost.value - discount.value)

function handleApplyDiscount() {
  if (discountCode.value === 'SAVE10') {
    discount.value = 0.1
  } else {
    discount.value = 0
  }
}

async function handleConfirmPayment() {
  if (cartStore.items.length === 0) {
    alert('Your cart is empty.')
    return
  }

  if (!selectedAddress.value || !selectedAddress.value.setName) {
    alert('Please select or enter a delivery address before confirming.')
    return
  }

  // Show QR and wait for user to click "Done" to finalize order
  showQR.value = true
}

async function handleDone() {
  if (isDoneProcessing.value) return
  isDoneProcessing.value = true

  try {
    const payload = {
      cartId: cartStore.cartId,
      address: selectedAddress.value,
      payment: selectedCard.value || null,
      paymentMethod: selectedCardment.value || (selectedCard.value ? 'card' : null),
      status: 'Paid',
      shipping: selectedShipping.value,
    }

    await orderService.createOrder(payload)

    // Clear cart locally (server already cleared it)
    try {
      await cartStore.clearCart()
    } catch (e) {
      console.warn('Failed to clear cart after order:', e)
    }

    // show success UI instead of alert
    successTotal.value = total.value
    showQR.value = false
    showSuccess.value = true
  } catch (err) {
    console.error('Failed to create order:', err)
    let message = 'Failed to place order. Please try again.'
    if (err && (err as Error).message) {
      message = (err as Error).message || message
    }
    // show a simple inline error notification by toggling QR off and logging
    // we can extend with an error modal if desired
    showQR.value = false
    // reuse isDoneProcessing to show a toast would be better; for now use console and a short local banner
    errorMessage.value = message
  } finally {
    isDoneProcessing.value = false
  }
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

const savedAddresses = ref<Address[]>([])

// Load addresses from backend
async function loadAddresses() {
  try {
    const res = await authService.getProfile()
    const profile = res.data
    if (profile && Array.isArray(profile.addresses) && profile.addresses.length) {
      savedAddresses.value = profile.addresses.map((a: any, idx: number) => ({
        id: a.id || Date.now() + idx,
        setName: a.label || a.setName || `Address ${idx + 1}`,
        country: a.country || '',
        province: a.city || a.province || '',
        houseNumber: a.houseNumber || '',
        street: a.street || '',
        addressLine1: a.addressLine || a.addressLine1 || '',
        addressLine2: a.addressLine2 || '',
        zipCode: a.zipCode || '',
      }))
    }
  } catch (err) {
    console.debug('Failed to load addresses:', err)
  }
}

// Edit modal state and helpers
import { reactive } from 'vue'
const showEditModal = ref(false)
const editingAddress = reactive({ ...(savedAddresses.value[0] ?? {}) })

function openEdit() {
  if (!selectedAddress.value) return
  Object.assign(editingAddress, { ...selectedAddress.value })
  showEditModal.value = true
}

function closeEdit() {
  showEditModal.value = false
}

function addNewAddress() {
  // open empty form for new address
  Object.assign(editingAddress, {
    id: Date.now(),
    setName: '',
    country: '',
    province: '',
    houseNumber: '',
    street: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
  })
  showEditModal.value = true
}

async function onAddressSave(addr: any) {
  // update or insert into savedAddresses
  const idx = savedAddresses.value.findIndex(a => a.id === addr.id)
  if (idx >= 0) {
    savedAddresses.value[idx] = { ...addr }
  } else {
    savedAddresses.value.push({ ...addr })
  }
  // set selectedAddress to updated address
  selectedAddress.value = { ...addr }
  showEditModal.value = false

  // Save to backend
  try {
    const toServer = savedAddresses.value.map(a => ({
      id: a.id,
      label: a.setName,
      country: a.country,
      city: a.province,
      houseNumber: a.houseNumber,
      street: a.street,
      addressLine: a.addressLine1,
      addressLine2: a.addressLine2,
      zipCode: a.zipCode,
      isDefault: false,
    }))
    await authStore.updateProfile({ addresses: toServer })
    // Refetch profile to update authStore user with latest addresses
    const res = await authService.getProfile()
    if (res.data) {
      authStore.user = { ...authStore.user, ...res.data }
    }
    // Reload addresses from backend to ensure sync
    await loadAddresses()
  } catch (err) {
    console.error('Failed to save address:', err)
    errorMessage.value = 'Failed to save address. Please try again.'
  }
}

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

// navigation helpers for success overlay
function goToOrders() {
  showSuccess.value = false
  router.push({ name: 'profile' })
}

function continueShopping() {
  showSuccess.value = false
  router.push({ name: 'home' })
}

</script>
