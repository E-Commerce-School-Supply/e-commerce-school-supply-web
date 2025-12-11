<template>
  <div class="min-h-screen bg-gray-100 text-sm text-gray-800">
    <!-- Top promo bar -->
    <div class="bg-teal-800 text-white text-center text-xs py-2">Black Friday Sale! Shop now — Up to 50% off</div>

    <!-- Top navigation -->
    <header class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="text-2xl font-bold text-accent">Tov<span class="text-black">Rean</span></div>
          <nav class="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a class="hover:underline">Home</a>
            <a class="hover:underline">New</a>
            <a class="hover:underline">Promotion</a>
            <a class="hover:underline">Top Sales</a>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <input placeholder="What are you looking for?" class="hidden md:block border rounded px-3 py-2 w-80 text-sm" />
          <div class="flex items-center gap-3">
            <div class="text-sm text-gray-500">Welcome! <span class="text-accent font-medium">Admin</span></div>
            <button @click="handleSignOut" class="text-sm bg-accent text-white px-4 py-2 rounded hover:bg-red-600 transition">Sign Out</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb + content -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <div class="text-xs text-gray-500 mb-4">Home / My Account</div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <aside class="col-span-1">
          <div class="bg-white rounded shadow p-4 mb-6">
            <h4 class="font-semibold mb-3">Manage My Account</h4>
            <ul class="text-sm space-y-2">
              <li
                @click="activeTab = 'dashboard'"
                :class="activeTab === 'dashboard' ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
              >
                Dashboard
              </li>
              <li
                @click="activeTab = 'profile'"
                :class="activeTab === 'profile' ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
              >
                My Profile
              </li>
            </ul>
          </div>

          <div class="bg-white rounded shadow p-4">
            <h4 class="font-semibold mb-3">Management</h4>
            <ul class="text-sm space-y-2">
              <li
                @click="activeTab = 'userManagement'"
                :class="activeTab === 'userManagement' ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
              >
                User Management
              </li>
              <li
                @click="activeTab = 'productManagement'"
                :class="activeTab === 'productManagement' ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
              >
                Product Management
              </li>
              <li
                @click="activeTab = 'orderManagement'"
                :class="activeTab === 'orderManagement' ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
              >
                Order Management
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main content -->
        <main class="col-span-3 space-y-6">
          <!-- Show Admin Profile when profile tab is active -->
          <AdminProfile v-if="activeTab === 'profile'" />

          <!-- Show User Management when userManagement tab is active -->
          <UserManagement v-else-if="activeTab === 'userManagement'" />

          <!-- Show Product Management when productManagement tab is active -->
          <ProductManagement v-else-if="activeTab === 'productManagement'" />

          <!-- Show Order Management when orderManagement tab is active -->
          <OrderManagement v-else-if="activeTab === 'orderManagement'" />

          <!-- Show Dashboard content when dashboard tab is active -->
          <template v-else>
          <!-- Top cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded shadow p-4 flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-500">Total Sales</div>
                <div class="text-2xl font-bold">$168.69</div>
              </div>
              <div class="text-gray-400">📈</div>
            </div>

            <div class="bg-white rounded shadow p-4 flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-500">Total Orders</div>
                <div class="text-2xl font-bold">3,543</div>
              </div>
              <div class="text-gray-400">🛒</div>
            </div>

            <div class="bg-white rounded shadow p-4 flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-500">Total Products</div>
                <div class="text-2xl font-bold">15,674</div>
              </div>
              <div class="text-gray-400">📦</div>
            </div>
          </div>

          <!-- Charts row -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section class="lg:col-span-2 bg-white rounded shadow p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium">Monthly Sales Trend</h3>
                <div class="text-xs text-gray-500">Updated: Today</div>
              </div>
              <div class="h-56 bg-gray-50 rounded border flex items-center justify-center text-gray-400">[Line chart placeholder]</div>
            </section>

            <aside class="bg-white rounded shadow p-4">
              <h3 class="font-medium mb-3">Total Product by Category</h3>
              <div class="h-56 flex items-center justify-center text-gray-400">[Pie chart placeholder]</div>
            </aside>
          </div>

          <!-- Lower content: table and low stock -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section class="lg:col-span-2 bg-white rounded shadow p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium">Top Sale Products</h3>
                <button class="text-xs text-gray-600 border px-3 py-1 rounded">Filter</button>
              </div>
              <table class="w-full text-left text-sm">
                <thead class="text-xs text-gray-500">
                  <tr>
                    <th class="py-2">Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-t">
                    <td class="py-3">Pen</td>
                    <td>Writing Instruments</td>
                    <td>$0.5</td>
                    <td>2.0</td>
                    <td class="text-green-600">In Stock</td>
                  </tr>
                  <tr class="border-t">
                    <td class="py-3">Pencil</td>
                    <td>Writing Instruments</td>
                    <td>$0.3</td>
                    <td>2.0</td>
                    <td class="text-green-600">In Stock</td>
                  </tr>
                  <tr class="border-t">
                    <td class="py-3">Notebook</td>
                    <td>Stationery</td>
                    <td>$1.5</td>
                    <td>4.0</td>
                    <td class="text-green-600">In Stock</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <aside class="bg-white rounded shadow p-4">
              <h3 class="font-medium mb-3">Low Stock Alert</h3>
              <div class="text-sm text-gray-600">No critical alerts</div>
              <div class="mt-4">
                <div class="text-xs text-gray-500">Pen</div>
                <div class="w-full bg-red-100 rounded h-2 mt-1">
                  <div class="bg-red-500 h-2 rounded" style="width:20%"></div>
                </div>
              </div>
            </aside>
          </div>

          </template>

          </main>
      </div>
      <!-- Footer is full-width; render outside the centered container -->
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import AdminProfile from './AdminProfile.vue'
import UserManagement from './UserManagement.vue'
import ProductManagement from './ProductManagement.vue'
import OrderManagement from './OrderManagement.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const activeTab = ref<'dashboard' | 'profile' | 'userManagement' | 'productManagement' | 'orderManagement'>('dashboard')
const authStore = useAuthStore()
const router = useRouter()

const handleSignOut = () => {
  authStore.logout()
  router.push({ name: 'signin' })
}
</script>

<style scoped>
.text-accent { color: #e03b3b; }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
</style>
