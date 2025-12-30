<script setup lang="ts">
import MyProfile from '@/components/profile/MyProfile.vue'
import { useAuthStore } from '@/stores/authStore';
import type { UserProfile } from '@/types/user'

import { onMounted, ref } from 'vue'

// Admin user data
const adminData = ref<UserProfile>();

const authStore = useAuthStore();

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <div v-if="authStore.user" class="flex-1 bg-white rounded shadow p-6">
      <MyProfile :user-detail="authStore.user" />
    </div>

    <!-- Footer is provided by AdminDashboard; removed duplicate Footer here -->
  </div>
</template>
