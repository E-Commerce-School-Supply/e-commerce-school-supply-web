<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import orderService from '@/services/orderService'

const route = useRoute()
const router = useRouter()
const order = ref<any | null>(null)
const loading = ref(false)
const id = route.params.id as string

onMounted(async () => {
  if (!id) {
    // no id provided, go back
    router.replace({ name: 'profile' })
    return
  }

  loading.value = true
  try {
    const res = await orderService.getOrder(id)
    order.value = res
  } catch (err) {
    console.error('Failed to load order', err)
    order.value = null
  } finally {
    loading.value = false
  }
})

// Helper to format address objects or strings into an array of lines
const formatAddress = (addr: any) => {
  if (!addr) return ['Not provided']
  if (typeof addr === 'string') return [addr]
  if (Array.isArray(addr)) return addr

  // common address fields fallback
  const lines: string[] = []
  const parts: Array<string | undefined> = []
  if (addr.setName) parts.push(addr.setName)
  if (addr.houseNumber) parts.push(addr.houseNumber)
  if (addr.street) parts.push(addr.street)
  if (addr.addressLine1) parts.push(addr.addressLine1)
  if (addr.addressLine2) parts.push(addr.addressLine2)
  if (addr.province) parts.push(addr.province)
  if (addr.zipCode) parts.push(addr.zipCode)
  if (addr.country) parts.push(addr.country)

  const primary = parts.filter(Boolean).join(', ')
  if (primary) lines.push(primary)

  // include any remaining raw fields that might be useful
  const other = Object.keys(addr)
    .filter((k) => !['setName', 'houseNumber', 'street', 'addressLine1', 'addressLine2', 'province', 'zipCode', 'country'].includes(k))
    .map((k) => `${k}: ${JSON.stringify(addr[k])}`)
  if (other.length && lines.length === 0) return other.slice(0, 3)
  return lines
}

// Helper to pick image url from order item
const itemImage = (it: any) => {
  return (
    it.imageURL || it.imageUrl || it.image || it.productImage || it.product?.imageUrl || 'https://via.placeholder.com/80'
  )
}
</script>

<template>
  <div class="p-6">
    <div v-if="loading">Loading order...</div>
    <div v-else-if="!order">Order not found.</div>
    <div v-else class="relative">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Order: {{ order.id || order.orderId }}</h1>
        <div>
          <button @click="$router.back()" class="px-4 py-2 border rounded-base">Back</button>
        </div>
      </div>

      <div class="border border-default rounded-base p-6 bg-white shadow-sm">
        <div class="grid grid-cols-2 gap-6">
          <!-- Left: summary -->
          <div class="col-span-1">
            <h2 class="font-medium mb-3">Summary</h2>
            <div class="text-sm text-[#6B6B6B]">
              <div class="mb-3"><strong>Status:</strong> <span class="ml-2">{{ order.status || order.orderStatus || '—' }}</span></div>
              <div class="mb-3"><strong>Total:</strong> <span class="ml-2">${{ (order.total || order.amount || 0).toFixed(2) }}</span></div>
              <div class="mb-3"><strong>Date:</strong> <span class="ml-2">{{ new Date(order.createdAt || order.date || Date.now()).toLocaleString() }}</span></div>
              <div class="mb-3"><strong>Payment:</strong> <span class="ml-2">{{ order.paymentMethod || order.method || '—' }}</span></div>
            </div>
          </div>

          <!-- Middle: shipping / billing (if available) -->
          <div class="col-span-1">
            <h2 class="font-medium mb-3">Addresses</h2>
            <div class="text-sm text-[#6B6B6B]">
              <div class="mb-2"><strong>Shipping:</strong></div>
              <div class="mb-4">
                <div v-for="(line, i) in formatAddress(order.shippingAddress || order.address)" :key="i">{{ line }}</div>
              </div>

              <div class="mb-2"><strong>Billing:</strong></div>
              <div>
                <div v-for="(line, i) in formatAddress(order.billingAddress || order.billing)" :key="i">{{ line }}</div>
              </div>
            </div>
          </div>


        </div>

        <div class="mt-6">
          <h3 class="font-medium mb-3">Items</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-sm bg-[#F7F7F7]">
                <tr>
                  <th class="px-4 py-3">Item</th>
                  <th class="px-4 py-3">Qty</th>
                  <th class="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(it, idx) in (order.items || order.orderItems || [])" :key="idx" class="border-t">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <img :src="itemImage(it)" alt="item" class="w-16 h-16 object-cover rounded-sm" />
                      <div>
                        <div class="font-medium">{{ it.name || it.productName }}</div>
                        <div class="text-xs text-[#6B6B6B]">{{ it.sku || it.productId || '' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-center">{{ it.quantity || it.qty || 1 }}</td>
                  <td class="px-4 py-3">${{ (it.price || it.unitPrice || 0).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
