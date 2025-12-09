<script setup lang="ts">
import MyProfile from '@/components/profile/MyProfile.vue'
import type { User } from '@/types/user'
import { ref } from 'vue'

// Admin user data
const adminData = ref<User>({
  name: 'Madami Furtna',
  role: 'Administration',
  email: 'admin@gmail.com',
  phoneNumber: '+855 12 345 678',
  avatar: 'https://i.pravatar.cc/150?img=33',
})

// Change password state
const showChangePassword = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const handleChangePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New password and confirm password do not match')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }

  // TODO: Implement API call to change password
  console.log('Changing password...', passwordForm.value)
  alert('Password changed successfully!')

  // Reset form
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  showChangePassword.value = false
}

const cancelChangePassword = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  showChangePassword.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 bg-white rounded shadow p-6">
      <MyProfile :user-detail="adminData" />

      <!-- Change Password Section -->
      <div class="mt-8 border-t pt-6">
        <button
          v-if="!showChangePassword"
          @click="showChangePassword = true"
          class="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition"
        >
          Change Password
        </button>

        <!-- Change Password Form -->
        <div v-if="showChangePassword" class="max-w-2xl">
          <h2 class="text-xl font-bold mb-6">Change Password</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                placeholder="Current Password"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="New Password"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div class="flex gap-3 mt-6">
              <button
                @click="handleChangePassword"
                class="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition"
              >
                Save Changes
              </button>
              <button
                @click="cancelChangePassword"
                class="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer is provided by AdminDashboard; removed duplicate Footer here -->
  </div>
</template>
