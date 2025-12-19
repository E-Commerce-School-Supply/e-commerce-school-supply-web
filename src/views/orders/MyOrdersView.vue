<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-heading">My Orders</h1>
      <p class="text-body mt-2">View and track all your orders</p>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="text-gray-600">Loading orders...</div>
    </div>

    <div v-else>
      <div v-if="orders.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
        <div class="text-gray-500 mb-4">No orders found.</div>
        <router-link
          to="/products"
          class="inline-block px-6 py-3 bg-accent text-white rounded-base hover:bg-accent/90"
        >
          Start Shopping
        </router-link>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-body">
            <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium">Order ID</th>
                <th scope="col" class="px-6 py-4 font-medium">Method</th>
                <th scope="col" class="px-6 py-4 font-medium">Total</th>
                <th scope="col" class="px-6 py-4 font-medium">Date</th>
                <th scope="col" class="px-6 py-4 font-medium">Status</th>
                <th scope="col" class="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                :key="order.id"
                class="bg-white border-b border-default hover:bg-neutral-secondary-medium"
              >
                <td class="px-6 py-4 font-medium text-heading">
                  {{ order.id || order.orderId }}
                </td>
                <td class="px-6 py-4">
                  {{ order.paymentMethod || order.method || '—' }}
                </td>
                <td class="px-6 py-4">
                  ${{ (order.total || order.amount || 0).toFixed(2) }}
                </td>
                <td class="px-6 py-4">
                  {{ formatDate(order.createdAt || order.date) }}
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(order.status || order.orderStatus)"
                  >
                    {{ order.status || order.orderStatus || '—' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <router-link
                    :to="{ name: 'order-detail', params: { id: order.id || order.orderId } }"
                    class="font-medium text-accent hover:underline"
                  >
                    View Details
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import orderService from '@/services/orderService'

const orders = ref<any[]>([])
const loading = ref(false)

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString || Date.now())
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status: string) => {
  const statusLower = (status || '').toLowerCase()
  if (statusLower.includes('delivered') || statusLower.includes('completed')) {
    return 'bg-green-100 text-green-800'
  }
  if (statusLower.includes('processing') || statusLower.includes('pending')) {
    return 'bg-yellow-100 text-yellow-800'
  }
  if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-gray-100 text-gray-800'
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await orderService.getOrders()
    orders.value = Array.isArray(res) ? res : []
  } catch (err) {
    console.error('Error loading orders', err)
    orders.value = []
  } finally {
    loading.value = false
  }
})
</script>
