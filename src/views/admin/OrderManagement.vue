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
          <span class="text-sm text-gray-500">{{ orders.length }}</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <input v-model="search" type="text" placeholder="search for customer" class="border rounded px-3 py-1.5 pr-8 text-sm w-64" />
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button @click="toggleEmailSort" class="border rounded px-3 py-1.5 text-sm">
            Sort email: {{ emailSort === 'asc' ? 'A–Z' : emailSort === 'desc' ? 'Z–A' : 'Off' }}
          </button>
        </div>
      </div>

      <table class="w-full">
        <thead class="bg-gray-50 border-b text-xs text-gray-600">
          <tr>
            <th class="py-3 px-4 text-left w-12">
              <input type="checkbox" class="rounded" />
            </th>
            <th class="py-3 px-4 text-left">Order ID</th>
            <th class="py-3 px-4 text-left">Customer's Email</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Method</th>
            <th class="py-3 px-4 text-left">Date</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="order in paginatedOrders" :key="order.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4"><input type="checkbox" class="rounded" /></td>
            <td class="py-3 px-4 font-medium">{{ order.id }}</td>
            <td class="py-3 px-4 text-gray-600">{{ order.customerEmail || order.customerName }}</td>
            <td class="py-3 px-4">${{ order.total.toFixed(2) }}</td>
            <td class="py-3 px-4 text-gray-600">{{ order.method }}</td>
            <td class="py-3 px-4 text-gray-600">{{ order.date }}</td>
            <td class="py-3 px-4">
              <button @click="open(order)" class="text-teal-700 hover:underline">View</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="p-4 flex items-center justify-between text-sm text-gray-600">
        <div>Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ sorted.length }} entries</div>
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
            class="px-3 py-1 border rounded">Previous</button>
          <button
            v-for="page in displayPages"
            :key="page"
            @click="goToPage(page)"
            :class="page === currentPage ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'"
            class="px-3 py-1 border rounded">{{ page }}</button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
            class="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetail" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Order Details</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div v-if="selected" class="space-y-2 text-sm">
          <div><span class="font-medium">Order ID:</span> {{ selected.id }}</div>
          <div><span class="font-medium">Customer:</span> {{ selected.customerEmail || selected.customerName }}</div>
          <div><span class="font-medium">Total:</span> ${{ selected.total.toFixed(2) }}</div>
          <div><span class="font-medium">Method:</span> {{ selected.method }}</div>
          <div><span class="font-medium">Date:</span> {{ selected.date }}</div>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="close" class="px-4 py-2 bg-gray-800 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import adminService from '@/services/adminService'

interface Order {
  id: string
  customerName: string
  customerEmail?: string
  total: number
  method: string
  date: string
  rawId: string | number
}

const search = ref('')
const orders = ref<Order[]>([])
const loading = ref(false)
const emailSort = ref<'none' | 'asc' | 'desc'>('none')
const showDetail = ref(false)
const selected = ref<Order | null>(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch orders from backend
const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await adminService.getAllOrders()
    orders.value = response.map((order: any) => {
      // robust total calculation
      const itemTotal = Array.isArray(order.items || order.orderItems)
        ? (order.items || order.orderItems).reduce((sum: number, it: any) => {
            const price = Number(it.price ?? it.unitPrice ?? 0)
            const qty = Number(it.quantity ?? 1)
            return sum + price * qty
          }, 0)
        : 0

      const rawId = order.id ?? order.orderId ?? order._id
      const totalNum = Number(order.totalAmount ?? order.total ?? order.amount ?? itemTotal ?? 0)
      const method = (order.paymentMethod ?? order.payment?.method ?? order.payment?.type ?? order.method ?? 'N/A') as string
      const niceMethod = typeof method === 'string' ? method.charAt(0).toUpperCase() + method.slice(1) : 'N/A'

      return {
        id: `#ORDER${rawId}`,
        rawId,
        customerName: order.user?.username || order.user?.email || order.userId || 'Unknown User',
        customerEmail: order.user?.email || order.email || undefined,
        total: isFinite(totalNum) ? totalNum : 0,
        method: niceMethod,
        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
          : 'N/A',
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    loading.value = false
  }
}

const filtered = computed(() => {
  if (!search.value) return orders.value
  const q = search.value.toLowerCase()
  return orders.value.filter((o) =>
    (o.customerEmail || o.customerName).toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
  )
})

const sorted = computed(() => {
  const arr = [...filtered.value]
  if (emailSort.value === 'none') return arr
  const dir = emailSort.value === 'asc' ? 1 : -1
  return arr.sort((a, b) => {
    const ea = (a.customerEmail || a.customerName || '').toLowerCase()
    const eb = (b.customerEmail || b.customerName || '').toLowerCase()
    if (ea < eb) return -1 * dir
    if (ea > eb) return 1 * dir
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sorted.value.length / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, sorted.value.length))

const paginatedOrders = computed(() => {
  return sorted.value.slice(startIndex.value, endIndex.value)
})

const displayPages = computed(() => {
  const pages: number[] = []
const total = totalPages.value
  const current = currentPage.value

  // Show max 5 page numbers
let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)

  // Adjust start if we're near the end
  if (end - start < 4) {
  start = Math.max(1, end - 4)
  }

  for (let i = start; i <= end; i++) {
  pages.push(i)
  }

  return pages
})

onMounted(() => {
  fetchOrders()
})

function toggleEmailSort() {
  emailSort.value = emailSort.value === 'none' ? 'asc' : emailSort.value === 'asc' ? 'desc' : 'asc'
  currentPage.value = 1 // Reset to first page when sorting
}

function open(order: Order) {
  selected.value = order
  showDetail.value = true
}

function close() {
  showDetail.value = false
  selected.value = null
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.text-accent { color: #e03b3b; }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
</style>
