<script setup lang="ts">
import MyAddress from '@/components/profile/MyAddress.vue'
import MyCard from '@/components/profile/MyCard.vue'
import MyFavorite from '@/components/profile/MyFavorite.vue'
import MyOrders from '@/components/profile/MyOrders.vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import type { UserProfile } from '@/types/user'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Sidebar from '@/components/layout/Sidebar.vue'
import Spinner from '@/components/ui/Spinner.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
const authStore = useAuthStore()
const favStore = useFavoriteStore();

// 2. The fake user data
// const userData = ref<UserProfile>({
//   username: 'Sok Dara',
//   role: 'User',
//   email: 'sok.dara@example.com',
//   phoneNumber: '+855 12 345 678',
//   avatarUrl: 'https://i.pravatar.cc/150?img=11', // Free fake profile image service
// })

const currentTab = ref('profile');
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
    <Sidebar v-model="currentTab"/>

    <div class="col-span-3">
      <div v-if="currentTab  === 'profile' && authStore.user">
        <MyProfile :user-detail="authStore.user" />
      </div>
      <div v-else-if="currentTab === 'address'">
        <MyAddress />
      </div>
      <div v-else-if="currentTab === 'payment'">
        <MyCard />
      </div>
      <div v-else-if="currentTab === 'orders'">
        <MyOrders />
      </div>
      <div v-else-if="currentTab === 'favorites'">
        <MyFavorite :fav-product="favStore.favProduct"/>
      </div>
    </div>
  </div>
</template>
