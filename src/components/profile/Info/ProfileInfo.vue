<script setup lang="ts">
import Banner from '@/assets/images/banner.jpg'
import { ref, type Component, reactive } from 'vue'
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

import { useAuthStore } from '@/stores/authStore'
const props = defineProps<Props>()
const authStore = useAuthStore()

const DEFAULT_AVATAR = '/Photo/MyProfile.JPG'

const isEditing = ref(false)
const showPasswordForm = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const form = reactive({
  name: props.name || '',
  email: props.email || '',
  phoneNumber: props.phoneNumber || '',
  avatar: props.avatar || DEFAULT_AVATAR,
})

const selectedFile = ref<File | null>(null)

function onFileChange(e: Event) {
  const el = e.target as HTMLInputElement
  if (!el.files || el.files.length === 0) {
    selectedFile.value = null
    return
  }
  selectedFile.value = el.files[0]
}

async function uploadSelectedFile() {
  if (!selectedFile.value) {
    alert('Please choose a file first')
    return
  }
  try {
    const url = await authStore.uploadAvatar(selectedFile.value)
    form.avatar = url
    alert('Avatar uploaded')
  } catch (err) {
    console.error('Upload failed', err)
    alert('Upload failed')
  }
}

const userDetail = ref<InfoItem[]>([
  { label: 'Name', value: form.name, icon: IconUserFilled },
  { label: 'Role', value: props.role, icon: IconUserCog },
  { label: 'Email', value: form.email, icon: IconMailFilled },
  { label: 'Phone Number', value: form.phoneNumber, icon: IconPhoneFilled },
])

function startEdit() {
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  // reset form to props
  form.name = props.name || ''
  form.email = props.email || ''
  form.phoneNumber = props.phoneNumber || ''
  form.avatar = props.avatar || DEFAULT_AVATAR
}

async function saveEdit() {
  try {
    await authStore.updateProfile({ username: form.name, email: form.email, phoneNumber: form.phoneNumber, avatarUrl: form.avatar })
    // update displayed details
    userDetail.value = [
      { label: 'Name', value: form.name, icon: IconUserFilled },
      { label: 'Role', value: props.role, icon: IconUserCog },
      { label: 'Email', value: form.email, icon: IconMailFilled },
      { label: 'Phone Number', value: form.phoneNumber, icon: IconPhoneFilled },
    ]
    isEditing.value = false
    alert('Profile updated')
  } catch (err) {
    console.error('Failed to save profile', err)
    alert('Failed to save profile')
  }
}

async function submitPasswordChange() {
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match')
    return
  }
  try {
    await authStore.changePassword(oldPassword.value, newPassword.value)
    alert('Password changed successfully')
    showPasswordForm.value = false
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    console.error('Password change failed', err)
    alert('Password change failed')
  }
}
</script>

<template>
  <div class="border border-default border-dashed rounded-base">
    <div
      class="relative w-full h-48 bg-cover bg-center rounded-base"
      :style="{ backgroundImage: `url(${Banner})` }"
    >
      <img
        :src="form.avatar || DEFAULT_AVATAR"
        alt="profile"
        class="absolute -bottom-14 left-10 w-36 h-auto rounded-circle rounded-full border-5 border-white"
      />
      <div class="absolute top-4 right-4 flex gap-2">
        <button @click="startEdit" class="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none">
          Edit
        </button>
        <button @click="showPasswordForm = !showPasswordForm" class="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none">
          Change Password
        </button>
      </div>
    </div>
    <div class="w-full mt-20 px-16 pb-10">
      <h1 class="font-bold mt-5 text-xl">Account Information</h1>
      <div v-if="!isEditing" class="flex flex-wrap gap-5 w-full justify-between items-center mt-5">
        <InfoCard
          v-for="detail in userDetail"
          :key="detail.label"
          :label="detail.label"
          :value="detail.value"
          :icon="detail.icon"
        />
      </div>

      <div v-else class="mt-5 max-w-3xl">
        <form @submit.prevent="saveEdit" class="space-y-4">
          <div>
            <label class="block text-sm text-body mb-1">Name</label>
            <input v-model="form.name" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-body mb-1">Email</label>
            <input v-model="form.email" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-body mb-1">Phone Number</label>
            <input v-model="form.phoneNumber" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-body mb-1">Avatar URL</label>
            <input v-model="form.avatar" class="w-full p-2 border rounded" />
            <p class="text-xs text-gray-500 mt-1">Or keep default profile picture.</p>
          </div>
          <div>
            <label class="block text-sm text-body mb-1">Upload Avatar</label>
            <input type="file" accept="image/*" @change="onFileChange" class="w-full p-2" />
            <div class="flex gap-2 mt-2">
              <button type="button" @click="uploadSelectedFile" class="px-4 py-2 bg-[#1A535C] text-white rounded">Upload</button>
              <p class="text-xs text-gray-500 flex items-center">Or provide an Avatar URL above.</p>
            </div>
          </div>
          <div class="flex gap-2 justify-end">
            <button type="button" @click="cancelEdit" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-[#1A535C] text-white rounded">Save</button>
          </div>
        </form>
      </div>

      <div v-if="showPasswordForm" class="mt-6 max-w-md">
        <h3 class="font-semibold mb-3">Change Password</h3>
        <form @submit.prevent="submitPasswordChange" class="space-y-3">
          <div>
            <label class="block text-sm text-body mb-1">Old Password</label>
            <input v-model="oldPassword" type="password" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-body mb-1">New Password</label>
            <input v-model="newPassword" type="password" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-body mb-1">Confirm New Password</label>
            <input v-model="confirmPassword" type="password" class="w-full p-2 border rounded" />
          </div>
          <div class="flex gap-2 justify-end">
            <button type="button" @click="showPasswordForm = false" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-[#1A535C] text-white rounded">Change</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
