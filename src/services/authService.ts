// import { ref } from 'vue'

import type { AuthResponse, LoginCredentials, RegisterUserData } from '@/types/auth'
import type { AxiosResponse } from 'axios'
import apiClient from './apiClient'

// const API_URL = 'http://localhost:8080/api/auth'

// export const authService = {
//   async register(user: any) {
//     const response = await fetch(`${API_URL}/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Registration failed')
//     }

//     return response.json()
//   },

//   async login(credentials: any) {
//     const response = await fetch(`${API_URL}/signin`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || 'Login failed')
//     }

//     return response.json()
//   },
// }

export default {
  /**
   * @param {RegisterUserData}
   * @returns {Promise<AxiosResponse<AuthResponse>>}
   */
  async register(userData: RegisterUserData): Promise<AxiosResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/api/auth/signup', userData)
  },

  /**
   * @param {LoginCredentials}
   * @returns {Promise<AxiosResponse<AuthResponse>>}
   */
  async login(credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/api/auth/signin', credentials)
  },
}
