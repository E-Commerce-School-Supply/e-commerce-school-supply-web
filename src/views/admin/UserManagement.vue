<script setup lang="ts">
import { ref } from 'vue'
import { IconDotsVertical } from '@tabler/icons-vue'

interface User {
  id: number
  username: string
  email: string
  status: 'Active' | 'Inactive'
  lastLoginDate: string
  avatar: string
}

const users = ref<User[]>([
  {
    id: 1,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Active',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Inactive',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Active',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Inactive',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Active',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    username: 'Kamlado Ayaka',
    email: 'ayaka@gmail.com',
    status: 'Inactive',
    lastLoginDate: 'Jul 13, 2025',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
])

const selectedUsers = ref<number[]>([])

const toggleSelectAll = () => {
  if (selectedUsers.value.length === users.value.length) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = users.value.map((u) => u.id)
  }
}

const toggleSelectUser = (userId: number) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}

const isSelected = (userId: number) => {
  return selectedUsers.value.includes(userId)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 bg-white rounded shadow p-6">
      <h1 class="text-xl font-bold mb-6">User Management</h1>

      <!-- Users Table -->
      <div class="border rounded-lg overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">All Users</span>
            <span class="text-sm text-gray-500">{{ users.length }}</span>
          </div>
          <button
            class="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
        </div>

        <!-- Table -->
        <table class="w-full">
          <thead class="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th class="px-4 py-3 text-left font-medium">
                <input
                  type="checkbox"
                  :checked="selectedUsers.length === users.length"
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 cursor-pointer"
                />
              </th>
              <th class="px-4 py-3 text-left font-medium">Username</th>
              <th class="px-4 py-3 text-left font-medium">Email</th>
              <th class="px-4 py-3 text-left font-medium">Status</th>
              <th class="px-4 py-3 text-left font-medium">Last Login Date</th>
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
                  <img :src="user.avatar" :alt="user.username" class="w-10 h-10 rounded-full" />
                  <span class="text-sm font-medium">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600',
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">{{ user.lastLoginDate }}</td>
              <td class="px-4 py-3">
                <button class="p-1 hover:bg-gray-200 rounded transition">
                  <IconDotsVertical class="w-5 h-5 text-gray-600" />
                </button>
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
