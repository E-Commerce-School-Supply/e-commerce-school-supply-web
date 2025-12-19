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
        avatarUrl: response.data.avatarUrl || '',
      }
      token.value = response.data.token
      // Persist user with avatar immediately
      sessionStorage.setItem('user', JSON.stringify(user.value))

      // Clear guest browsing flag when a real session starts
      sessionStorage.removeItem('guestMode')

      sessionStorage.setItem('user', JSON.stringify(user.value))
      sessionStorage.setItem('accessToken', token.value)
    } catch (err: unknown) {
      const error_message = err instanceof Error ? err.message : 'Login Failed'
      error.value = error_message
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
    } catch (err: unknown) {
      const error_message = err instanceof Error ? err.message : 'An unknown error occurred. Please try again.'
      error.value = error_message
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('guestMode')
    router.push({ name: 'signin' })
  }

  async function updateProfile(partial: Partial<UserProfile>) {
    if (!user.value) return
    try {
      await authService.updateProfile(partial)
      // Refetch profile from server to get the updated data in correct format
      const res = await authService.getProfile()
      if (res.data) {
        user.value = res.data
        sessionStorage.setItem('user', JSON.stringify(user.value))
      } else {
        user.value = { ...user.value, ...partial }
        sessionStorage.setItem('user', JSON.stringify(user.value))
      }
    } catch (err) {
      console.error('Failed to update profile on server', err)
      throw err
    }
  }

  async function uploadAvatar(file: File) {
    if (!user.value) throw new Error('Not authenticated')
    try {
      const res = await authService.uploadAvatar(file)
      const avatarUrl = res.data.avatarUrl
      user.value = { ...user.value, avatarUrl }
      sessionStorage.setItem('user', JSON.stringify(user.value))

      // Refresh profile from server to ensure all fields (and absolute avatar URL) are up-to-date
      try {
        const profileRes = await authService.getProfile()
        if (profileRes?.data) {
          user.value = profileRes.data
          sessionStorage.setItem('user', JSON.stringify(user.value))
        }
      } catch (e) {
        // ignore profile refresh errors
      }

      return avatarUrl
    } catch (err) {
      console.error('Failed to upload avatar', err)
      throw err
    }
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      const res = await authService.changePassword(oldPassword, newPassword)
      return res.data
    } catch (err) {
      console.error('Failed to change password', err)
      throw err
    }
  }

  return {
    user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    uploadAvatar,
  }
})
