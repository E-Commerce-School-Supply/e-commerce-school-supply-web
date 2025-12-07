<script setup lang="ts">
import Banner from '@/assets/images/banner.jpg'
import { ref, type Component } from 'vue'
import InfoCard from './InfoCard.vue'
import {
  IconDotsVertical,
  IconMailFilled,
  IconPhoneFilled,
  IconUserCog,
  IconUserFilled,
} from '@tabler/icons-vue'

interface Props {
  name: string
  role: string
  email: string
  phoneNumber: string
  avatar?: string // Optional image
}

interface InfoItem {
  label: string
  value: string
  icon: Component
}

const props = defineProps<Props>()

const userDetail = ref<InfoItem[]>([
  { label: 'Name', value: props.name, icon: IconUserFilled },
  { label: 'Role', value: props.role, icon: IconUserCog },
  { label: 'Email', value: props.email, icon: IconMailFilled },
  { label: 'Phone Number', value: props.phoneNumber, icon: IconPhoneFilled },
])
</script>

<template>
  <div class="border border-default border-dashed rounded-base">
    <div
      class="relative w-full h-48 bg-cover bg-center rounded-base"
      :style="{ backgroundImage: `url(${Banner})` }"
    >
      <img
        :src="props.avatar"
        alt="profile"
        class="absolute -bottom-14 left-10 w-36 h-auto rounded-circle rounded-full border-5 border-white"
      />
    </div>
    <button
      id="dropdownMenuIconButton"
      data-dropdown-toggle="dropdownDots"
      class="float-end mr-5 mt-2 text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
      type="button"
    >
      <IconDotsVertical />
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdownDots"
      class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
    >
      <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownMenuIconButton">
        <li>
          <a
            href="#"
            class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >Edit Profile</a
          >
        </li>
        <li>
          <a
            href="#"
            class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >Change Password</a
          >
        </li>
      </ul>
    </div>
    <div class="w-full mt-20 px-16 pb-10">
      <h1 class="font-bold mt-5 text-xl">Account Information</h1>
      <div class="flex flex-wrap gap-5 w-full justify-between items-center mt-5">
        <InfoCard
          v-for="detail in userDetail"
          :label="detail.label"
          :value="detail.value"
          :icon="detail.icon"
        />
      </div>
    </div>
  </div>
</template>
