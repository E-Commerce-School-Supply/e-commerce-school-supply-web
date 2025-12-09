import authService from '@/services/authService'
import type { LoginCredentials, RegisterUserData } from '@/types/auth'
import type { UserProfile } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  // STATE
  const user = ref<UserProfile | null>(JSON.parse(sessionStorage.getItem('user') || 'null'))
  const token = ref<string | null>(sessionStorage.getItem('accessToken'))

  const error = ref<string | null>(null)
  const isLoading = ref<boolean | null>(null)
  // GETTER

  // ACTION
  async function login(credentials: LoginCredentials) {
    error.value = null
    isLoading.value = true

    try {
      const response = await authService.login(credentials)
      user.value = {
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
        phoneNumber: response.data.phoneNumber || '',
        avatarUrl: '',
      }
      token.value = response.data.token

      sessionStorage.setItem('user', JSON.stringify(user.value))
      sessionStorage.setItem('accessToken', token.value)
    } catch (err: any) {
      error.value = err.message || 'Login Failed'
      console.log(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: RegisterUserData) {
    error.value = null
    isLoading.value = true
    try {
      await authService.register(userData)
    } catch (err: any) {
      error.value = err.message || 'An unknown error occurred. Please try again.'
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    login,
    register,
  }
})
