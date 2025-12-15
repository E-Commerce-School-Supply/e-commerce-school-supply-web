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
</script>

<template>
  <div class="p-6">
    <div v-if="loading">Loading order...</div>
    <div v-else-if="!order">Order not found.</div>
    <div v-else>
      <h1 class="text-xl font-semibold mb-4">Order: {{ order.id || order.orderId }}</h1>
      <p class="mb-2"><strong>Status:</strong> {{ order.status || order.orderStatus || '—' }}</p>
      <p class="mb-2"><strong>Total:</strong> ${{ (order.total || order.amount || 0).toFixed(2) }}</p>
      <p class="mb-2"><strong>Date:</strong> {{ new Date(order.createdAt || order.date || Date.now()).toLocaleString() }}</p>

      <div class="mt-4">
        <h2 class="font-medium mb-2">Items</h2>
        <ul>
          <li v-for="(it, idx) in (order.items || order.orderItems || [])" :key="idx">
            {{ it.name || it.productName }} — x{{ it.quantity || it.qty || 1 }} — ${{ (it.price || it.unitPrice || 0).toFixed(2) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
