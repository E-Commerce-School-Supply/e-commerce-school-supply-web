<template>
  <div class="bg-white rounded shadow p-6">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h1 class="text-xl font-bold">Order Management</h1>
      </div>
      <div class="text-sm text-gray-500">All Orders / <span class="text-teal-700">Order Management</span></div>
    </div>

    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">All Orders</span>
          <span class="text-sm text-gray-500">257</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <input v-model="search" type="text" placeholder="search for customer" class="border rounded px-3 py-1.5 pr-8 text-sm w-64" />
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button class="border rounded px-3 py-1.5 text-sm flex items-center gap-1">🔽</button>
        </div>
      </div>

      <table class="w-full">
        <thead class="bg-gray-50 border-b text-xs text-gray-600">
          <tr>
            <th class="py-3 px-4 text-left w-12">
              <input type="checkbox" class="rounded" />
            </th>
            <th class="py-3 px-4 text-left">Order ID</th>
            <th class="py-3 px-4 text-left">Customer's Name</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Method</th>
            <th class="py-3 px-4 text-left">Paid</th>
            <th class="py-3 px-4 text-left">Date</th>
            <th class="py-3 px-4 text-left">Status</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="order in filtered" :key="order.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4"><input type="checkbox" class="rounded" /></td>
            <td class="py-3 px-4 font-medium">{{ order.id }}</td>
            <td class="py-3 px-4 text-gray-600">{{ order.customerName }}</td>
            <td class="py-3 px-4">${{ order.total.toFixed(2) }}</td>
            <td class="py-3 px-4 text-gray-600">{{ order.method }}</td>
            <td class="py-3 px-4">
              <span v-if="order.paid" class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Yes</span>
              <span v-else class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">No</span>
            </td>
            <td class="py-3 px-4 text-gray-600">{{ order.date }}</td>
            <td class="py-3 px-4">
              <span v-if="order.status === 'Completed'" class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
              <span v-else-if="order.status === 'Pending'" class="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span>
              <span v-else class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">{{ order.status }}</span>
            </td>
            <td class="py-3 px-4">
              <button class="text-gray-400 hover:text-gray-600"><IconDotsVertical :size="20" /></button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Simple pagination placeholder -->
      <div class="p-4 flex items-center justify-between text-sm text-gray-600">
        <div>Showing 1 to 7 of 257 entries</div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 border rounded">Previous</button>
          <button class="px-3 py-1 border rounded bg-gray-800 text-white">1</button>
          <button class="px-3 py-1 border rounded">2</button>
          <button class="px-3 py-1 border rounded">3</button>
          <button class="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IconDotsVertical } from '@tabler/icons-vue'

interface Order {
  id: string
  customerName: string
  total: number
  method: string
  paid: boolean
  date: string
  status: 'Completed' | 'Pending' | 'Cancelled' | string
}

const search = ref('')

const orders = ref<Order[]>([
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'ABA Pay', paid: true, date: '07-11-2025', status: 'Completed' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'CC', paid: false, date: '07-11-2025', status: 'Pending' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'ABA Pay', paid: true, date: '07-11-2025', status: 'Completed' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'ABA Pay', paid: true, date: '07-11-2025', status: 'Pending' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'CC', paid: false, date: '07-11-2025', status: 'Pending' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'ABA Pay', paid: true, date: '07-11-2025', status: 'Completed' },
  { id: '#ORDER1001', customerName: 'Luy Lyhor', total: 39.99, method: 'ABA Pay', paid: true, date: '07-11-2025', status: 'Pending' },
])

const filtered = computed(() => {
  if (!search.value) return orders.value
  const q = search.value.toLowerCase()
  return orders.value.filter((o) => o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))
})
</script>

<style scoped>
.text-accent { color: #e03b3b; }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
</style>
