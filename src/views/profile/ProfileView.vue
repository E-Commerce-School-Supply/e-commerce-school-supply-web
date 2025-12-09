<script setup lang="ts">
import MyAddress from '@/components/profile/MyAddress.vue'
import MyCard from '@/components/profile/MyCard.vue'
import MyFavorite from '@/components/profile/MyFavorite.vue'
import MyOrders from '@/components/profile/MyOrders.vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import type { UserProfile } from '@/types/user'
import { ref } from 'vue'

// 2. The fake user data
// const userData = ref<UserProfile>({
//   username: 'Sok Dara',
//   role: 'User',
//   email: 'sok.dara@example.com',
//   phoneNumber: '+855 12 345 678',
//   avatarUrl: 'https://i.pravatar.cc/150?img=11', // Free fake profile image service
// })
</script>

<template>
  <button
    data-drawer-target="separator-sidebar"
    data-drawer-toggle="separator-sidebar"
    aria-controls="separator-sidebar"
    type="button"
    class="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
        d="M5 7h14M5 12h14M5 17h10"
      />
    </svg>
  </button>

  <aside
    id="separator-sidebar"
    class="fixed top-0 left-0 z-40 w-64 p-5 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
      <h1 class="font-bold mb-5">Manage My Account</h1>
      <ul class="flex-column space-y space-y-4 text-sm font-medium text-body md:me-4 mb-4 md:mb-0">
        <li>
          <a
            href="#"
            class="inline-flex items-center px-4 text-accent rounded-base active w-full"
            aria-current="page"
          >
            My Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            class="inline-flex items-center px-4 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"
          >
            Address
          </a>
        </li>
        <li>
          <a
            href="#"
            class="inline-flex items-center px-4 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"
          >
            Payment Options
          </a>
        </li>
      </ul>

      <h1 class="font-bold my-5">Shopping Activity</h1>
      <ul class="flex-column space-y space-y-4 text-sm font-medium text-body md:me-4 mb-4 md:mb-0">
        <li>
          <a
            href="#"
            class="inline-flex items-center px-4 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"
          >
            My Orders
          </a>
        </li>
        <li>
          <a
            href="#"
            class="inline-flex items-center px-4 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"
          >
            My Favorites
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-5 sm:ml-64">
    <!-- <MyAddress /> -->
    <!-- <MyCard /> -->
    <!-- <MyOrders /> -->
    <MyFavorite />
  </div>
</template>
