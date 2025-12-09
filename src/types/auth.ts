export interface AuthResponse {
  token: string
  id: string
  username: string
  email: string
  role: string
  phoneNumber: string | null
  avatarUrl?: string
}
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterUserData {
  username: string
  email: string
  password: string
}
