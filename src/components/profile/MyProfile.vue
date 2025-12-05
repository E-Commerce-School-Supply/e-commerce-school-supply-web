<script setup lang="ts">
import ProfileInfo from '@/components/profile/Info/ProfileInfo.vue'
import type { User } from '@/types/user'

const props = defineProps<{
  userDetail: User
}>()
</script>

<template>
  <div>
    <h1 class="font-bold mb-5">My Profile</h1>
    <ProfileInfo
      :name="props.userDetail.name"
      :role="props.userDetail.role"
      :email="props.userDetail.email"
      :phone-number="props.userDetail.phoneNumber"
      :avatar="props.userDetail.avatar"
    />
  </div>
</template>
