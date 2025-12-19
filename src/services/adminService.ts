import apiClient from './apiClient'

export interface User {
  id: string
  username: string
  email: string
  status: 'Active' | 'Inactive'
  lastLoginDate: string
  avatarUrl?: string
  role?: string
  phoneNumber?: string
  createdAt?: string
}

const adminService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get('/api/admin/users')
      return response.data || []
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  getUserCount: async (): Promise<number> => {
    try {
      const response = await apiClient.get('/api/admin/users/count')
      return response.data || 0
    } catch (error) {
      console.error('Error fetching user count:', error)
      throw error
    }
  },

  refreshUsers: async (): Promise<User[]> => {
    return adminService.getAllUsers()
  },

  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/api/admin/dashboard/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0
      }
    }
  },

  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/api/admin/orders')
      return response.data || []
    } catch (error) {
      console.error('Error fetching all orders:', error)
      throw error
    }
  },
}

export default adminService
