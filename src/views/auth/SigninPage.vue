<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import type { LoginCredentials } from '@/types/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const toast = useToastStore()
const router = useRouter()

const form = ref<LoginCredentials>({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    await authStore.login({ email: form.value.email, password: form.value.password })

    // 1. Call the global toast
    toast.showToast('Welcome back! Redirecting...', 'success')

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } catch (error: any) {
    const msg = error.message || 'Invalid email or password.'

    // 2. Call the global toast for error
    toast.showToast(msg, 'error')
  }
}
</script>

<template>
  <div
    class="bg-cover bg-no-repeat bg-[url('../assets/images/auth_background.jpg')] min-h-screen object-fit bg-black/25 bg-blend-darken flex justify-center items-center"
  >
    <form
      @submit.prevent="handleLogin"
      class="w-full h-auto max-w-xl mx-auto bg-white/50 border-white/30 backdrop-blur-lg shadow-lg px-10 py-10 rounded-3 rounded lg:px-20"
    >
      <h1 class="font-bold text-2xl"><span class="text-accent">Tov</span>Rean</h1>
      <p class="font-extralight text-lg">Prepare smarter. Study better. Start here.</p>
      <p class="font-bold text-3xl w-full text-center my-5">Welcome back!</p>
      <div class="flex flex-col justify-center items-center gap-3 w-full">
        <div class="mb-5 w-full">
          <label for="email" class="block mb-2 text-sm font-medium text-heading">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="bg-primary border border-default-medium text-heading text-sm rounded-base focus:ring-secondary focus:border-secondary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5 w-full">
          <label for="password" class="block mb-2 text-sm font-medium text-heading">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="bg-primary border border-default-medium text-heading text-sm rounded-base focus:ring-secondary focus:border-secondary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="flex justify-between items-start mb-5 w-full">
          <label for="remember" class="flex items-center w-1/2">
            <input id="remember" type="checkbox" class="w-4 h-4 border accent-accent rounded-xs" />
            <p class="ms-2 text-sm font-medium text-heading select-none">Remember me</p>
          </label>

          <router-link to="/forget" class="text-sm w-1/2 text-end hover:underline"
            >Forget Password?</router-link
          >
        </div>
        <div class="w-full mb-10">
          <button
            type="submit"
            class="w-full text-white bg-secondary box-border border border-transparent hover:bg-secondary/80 focus:ring-4 focus:ring-secondary/25 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Sign in
          </button>
          <span class="text-extralight text-sm"
            >Don’t have account?
            <router-link to="/signup" class="text-accent hover:underline"
              >Sign up</router-link
            ></span
          >
        </div>
      </div>
    </form>
  </div>
</template>
