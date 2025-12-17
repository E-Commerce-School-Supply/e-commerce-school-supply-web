<script setup lang="ts">
import ProfileInfo from '@/components/profile/Info/ProfileInfo.vue'
import type { UserProfile } from '@/types/user'

const props = defineProps<{
  userDetail: UserProfile
}>()
</script>

<template>
  <div>
    <h1 class="font-bold mb-5">My Profile</h1>
    <ProfileInfo
      :name="props.userDetail.username ?? props.userDetail.username ?? ''"
      :role="props.userDetail.role"
      :email="props.userDetail.email"
      :phone-number="props.userDetail.phoneNumber ?? props.userDetail.phoneNumber"
      :avatar="props.userDetail.avatarUrl ?? props.userDetail.avatarUrl ?? ''"
    />
  </div>
</template>
