<template>

<aside class="col-span-1">
    <div class="bg-white rounded shadow p-4 mb-6">
        <h4 class="font-semibold mb-3">Manage My Account</h4>
        <ul v-if="isAdmin" class="text-sm space-y-2">
            <li
            @click="activeTab = 'dashboard'"
            :class="isActive('dashboard')  ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            Dashboard
            </li>
            <li
            @click="activeTab = 'profile'"
            :class="isActive('profile')  ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            My Profile
            </li>
        </ul>
        <ul v-else class="text-sm space-y-2">
            <li
            @click="activeTab = 'profile'"
            :class="isActive('profile') ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            My Profile
            </li>
            <li
            @click="activeTab = 'address'"
            :class="isActive('address') ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            Address
            </li>
            <li
            @click="activeTab = 'payment'"
            :class="isActive('payment') ? 'text-accent font-medium' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            Payment Options
            </li>
        </ul>
    </div>

    <div v-if="isAdmin" class="bg-white rounded shadow p-4">
        <h4 class="font-semibold mb-3">Management</h4>
        <ul class="text-sm space-y-2">
            <li 
            @click="activeTab = 'userManagement'" 
            :class="isActive('userManagement') ? 'text-accent font-medium' : 'cursor-pointer text-gray-600 hover:text-accent'">
            User Management
            </li>
            <li
            @click="activeTab = 'productManagement'"
            :class="isActive('productManagement') ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            Product Management
            </li>
            <li
            @click="activeTab = 'orderManagement'"
            :class="isActive('orderManagement') ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            Order Management
            </li>
        </ul>
    </div>

    <div v-else class="bg-white rounded shadow p-4">
        <h4 class="font-semibold mb-3">Shopping Activity</h4>
        <ul class="text-sm space-y-2">
            <li 
            @click="activeTab = 'orders'" 
            :class="isActive('orders') ? 'text-accent font-medium' : 'cursor-pointer text-gray-600 hover:text-accent'">
            My Orders
            </li>
            <li
            @click="activeTab = 'favorites'"
            :class="isActive('favorites') ? 'text-accent font-medium cursor-pointer' : 'text-gray-600 hover:text-accent cursor-pointer'"
            >
            My Favorites
            </li>
        </ul>
    </div>
</aside>

</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

import { computed, ref } from 'vue';


const activeTab = defineModel<string>({ required: true });
const authStore = useAuthStore();


const isAdmin = computed(() => authStore.user?.role === 'admin');
console.log(isAdmin.value);
const isActive = (tabName: string) => activeTab.value === tabName;
</script>