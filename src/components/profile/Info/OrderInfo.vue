<script setup lang="ts">
import { ref, onMounted } from 'vue'
import orderService from '@/services/orderService'
import { useAuthStore } from '@/stores/authStore'

const orders = ref<any[]>([])
const loading = ref(false)
const authStore = useAuthStore()

onMounted(async () => {
  loading.value = true
  try {
    const res = await orderService.getOrders()
    // expecting backend to return orders for authenticated user
    orders.value = Array.isArray(res) ? res : []
  } catch (err) {
    console.error('Error loading orders', err)
    orders.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="border border-default border-dashed rounded-base p-5">
    <h1 class="mb-5">My Orders <span class="text-gray-400">{{ orders.length }}</span></h1>

    <div v-if="loading" class="text-sm text-gray-500">Loading orders...</div>
    <div v-else>
      <div v-if="orders.length === 0" class="text-sm text-gray-500">No orders found.</div>
      <div v-else class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" class="p-4">Order ID</th>
              <th scope="col" class="px-3 py-3 font-medium">Method</th>
              <th scope="col" class="px-3 py-3 font-medium">Total</th>
              <th scope="col" class="px-3 py-3 font-medium">Date</th>
              <th scope="col" class="px-3 py-3 font-medium">Status</th>
              <th scope="col" class="px-3 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in orders" :key="o.id" class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
              <th class="px-3 py-4 font-medium text-heading whitespace-nowrap">{{ o.id || o.orderId }}</th>
              <td class="px-3 py-4">{{ o.paymentMethod || o.method || '—' }}</td>
              <td class="px-3 py-4">${{ (o.total || o.amount || 0).toFixed(2) }}</td>
              <td class="px-3 py-4">{{ new Date(o.createdAt || o.date || Date.now()).toLocaleDateString() }}</td>
              <td class="px-3 py-4">{{ o.status || o.orderStatus || '—' }}</td>
              <td class="px-3 py-4">
                <router-link
                  :to="{ name: 'order-detail', params: { id: o.id || o.orderId } }"
                  class="font-medium text-accent hover:underline"
                >
                  View
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
