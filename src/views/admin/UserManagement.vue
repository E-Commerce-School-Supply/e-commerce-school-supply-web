<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconDotsVertical } from '@tabler/icons-vue'
import adminService, { type User } from '@/services/adminService'

const users = ref<User[]>([])
const selectedUsers = ref<string[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch users from backend
const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await adminService.getAllUsers()
    users.value = data.map((user) => ({
      ...user,
      // Provide fallback avatar using initials or gravatar
      avatarUrl: user.avatarUrl || `https://i.pravatar.cc/150?u=${user.email}`,
    }))
  } catch (err) {
    console.error('Failed to fetch users:', err)
    error.value = 'Failed to load users'
  } finally {
    loading.value = false
  }
}

// Refresh users every 30 seconds for real-time updates
onMounted(() => {
  fetchUsers()
  const interval = setInterval(fetchUsers, 30000)
  return () => clearInterval(interval)
})

const toggleSelectAll = () => {
  if (selectedUsers.value.length === users.value.length) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = users.value.map((u) => u.id)
  }
}

const toggleSelectUser = (userId: string) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}

const isSelected = (userId: string) => {
  return selectedUsers.value.includes(userId)
}

const formatDateTime = (value?: string) => {
  if (!value) return 'N/A'

  // Try ISO or timestamp first
  const direct = tryParseDate(value)
  if (direct) return format(direct)

  // Try relative strings like "2 days ago"
  const relative = parseRelativeDate(value)
  if (relative) return format(relative)

  return value
}

const tryParseDate = (val: string) => {
  // Numeric timestamp
  if (/^\d+$/.test(val.trim())) {
    const num = Number(val)
    const d = new Date(num)
    return Number.isNaN(d.getTime()) ? null : d
  }
  const d = new Date(val)
  return Number.isNaN(d.getTime()) ? null : d
}

const parseRelativeDate = (val: string) => {
  const match = val.trim().match(/^(\d+)\s+(minute|hour|day|week|month|year)s?\s+ago$/i)
  if (!match) return null
  const amount = Number(match[1])
  const unit = match[2].toLowerCase()
  if (Number.isNaN(amount)) return null

  const now = Date.now()
  const unitMs: Record<string, number> = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  }
  const delta = unitMs[unit]
  if (!delta) return null
  return new Date(now - amount * delta)
}

const format = (date: Date) => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 bg-white rounded shadow p-6">
      <h1 class="text-xl font-bold mb-6">User Management</h1>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
        <button @click="fetchUsers" class="ml-2 underline font-semibold">Retry</button>
      </div>

      <!-- Users Table -->
      <div class="border rounded-lg overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">All Users</span>
            <span class="text-sm text-gray-500">{{ users.length }}</span>
          </div>
          <button
            @click="fetchUsers"
            class="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg
              :class="['w-4 h-4', loading ? 'animate-spin' : '']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {{ loading ? 'Refreshing...' : 'Refresh' }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading && users.length === 0" class="p-8 text-center text-gray-500">
          <div class="inline-block">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            Loading users...
          </div>
        </div>

        <!-- Table -->
        <table v-else class="w-full">
          <thead class="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th class="px-4 py-3 text-left font-medium">
                <input
                  type="checkbox"
                  :checked="selectedUsers.length === users.length && users.length > 0"
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 cursor-pointer"
                  :disabled="users.length === 0"
                />
              </th>
              <th class="px-4 py-3 text-left font-medium">Username</th>
              <th class="px-4 py-3 text-left font-medium">Email</th>
              <th class="px-4 py-3 text-left font-medium">Last Login</th>
              <th class="px-4 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition">
              <td class="px-4 py-3">
                <input
                  type="checkbox"
                  :checked="isSelected(user.id)"
                  @change="toggleSelectUser(user.id)"
                  class="rounded border-gray-300 cursor-pointer"
                />
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="user.avatarUrl"
                    :alt="user.username"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <span class="text-sm font-medium">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ formatDateTime(user.lastLoginDate) }}</td>
              <td class="px-4 py-3">
                <button class="p-1 hover:bg-gray-200 rounded transition">
                  <IconDotsVertical class="w-5 h-5 text-gray-600" />
                </button>
              </td>
            </tr>
            <!-- Empty State -->
            <tr v-if="users.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer is provided by AdminDashboard; removed duplicate Footer here -->
  </div>
</template>

<style scoped>
input[type='checkbox'] {
  cursor: pointer;
}
</style>
