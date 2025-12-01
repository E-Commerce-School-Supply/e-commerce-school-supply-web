<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. Create reactive variables for the form data
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

// 2. Helper to check if password is valid (for styling the hint text)
const isPasswordShort = computed(() => {
  return form.value.password.length > 0 && form.value.password.length < 8
})

const isPasswordValid = computed(() => {
  return form.value.password.length >= 8
})

// 3. Helper to check if passwords match
const passwordsMismatch = computed(() => {
  return form.value.confirmPassword.length > 0 && form.value.password !== form.value.confirmPassword
})

// 4. Handle Form Submission
const handleRegister = () => {
  // Double check validation before sending
  if (form.value.password.length < 8) {
    alert('Password is too short!')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // If validation passes:
  console.log('Form Submitted:', form.value)
  alert('Account created successfully!')
}
</script>

<template>
  <div
    class="bg-cover bg-no-repeat bg-[url('../assets/images/auth_background.jpg')] min-h-screen object-fit bg-black/25 bg-blend-darken flex justify-center items-center"
  >
    <form
      @submit.prevent="handleRegister"
      class="w-full h-auto max-w-xl mx-auto bg-white/50 border-white/30 backdrop-blur-lg shadow-lg px-10 py-10 rounded-3 rounded lg:px-20"
    >
      <h1 class="font-bold text-2xl"><span class="text-accent">Tov</span>Rean</h1>
      <p class="font-extralight text-lg">Prepare smarter. Study better. Start here.</p>
      <p class="font-bold text-3xl w-full text-center my-5">Create your account</p>

      <div class="flex flex-col justify-center items-center gap-3 w-full">
        <div class="mb-2 w-full">
          <label for="name" class="block mb-2 text-sm font-medium text-heading">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="name"
            class="bg-primary border border-default-medium text-heading text-sm rounded-base focus:ring-secondary focus:border-secondary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="UserName001"
            required
          />
        </div>

        <div class="mb-2 w-full">
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

        <div class="mb-2 w-full">
          <label for="password" class="block mb-2 text-sm font-medium text-heading">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            :class="{
              'border-red-500 focus:ring-red-500 focus:border-red-500': isPasswordShort,
              'border-green-500 focus:border-green-500 focus:ring-green-500': isPasswordValid,
            }"
            class="bg-primary border border-default-medium text-heading text-sm rounded-base focus:ring-secondary focus:border-secondary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            required
          />
          <p
            class="text-xs mt-1"
            :class="
              isPasswordShort
                ? 'text-red-500 font-medium'
                : isPasswordValid
                  ? 'text-green-600'
                  : 'text-body'
            "
          >
            Must be at least 8 characters long
          </p>
        </div>

        <div class="mb-2 w-full">
          <label for="confirmpassword" class="block mb-2 text-sm font-medium text-heading"
            >Confirm Password</label
          >
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmpassword"
            :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': passwordsMismatch }"
            class="bg-primary border border-default-medium text-heading text-sm rounded-base focus:ring-secondary focus:border-secondary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            required
          />
          <p v-if="passwordsMismatch" class="text-xs text-red-500 mt-1 font-medium">
            Passwords do not match
          </p>
        </div>

        <div class="flex justify-between items-start mb-5 w-full">
          <label for="remember" class="flex items-center w-full cursor-pointer">
            <input
              v-model="form.agree"
              id="remember"
              type="checkbox"
              class="w-4 h-4 border accent-accent rounded-xs"
              required
            />
            <p class="ms-2 text-sm font-medium text-heading select-none">
              I agree with the
              <a href="#" class="text-accent hover:underline">terms and conditions</a>.
            </p>
          </label>
        </div>

        <div class="w-full mb-10">
          <button
            type="submit"
            class="w-full text-white bg-secondary box-border border border-transparent hover:bg-secondary/80 focus:ring-4 focus:ring-secondary/25 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Sign up
          </button>
          <span class="text-extralight text-sm">
            Already have an account?
            <a href="/signin" class="text-accent hover:underline">Sign in</a>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>
