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
      // Try admin endpoint first
      const response = await apiClient.get('/api/admin/orders')
      console.log('getAllOrders response:', response.data)
      return response.data || []
    } catch (error) {
      console.error('Error fetching all orders from /api/admin/orders:', error)
      // If admin endpoint doesn't exist, return empty array
      return []
    }
  },

  // Get all orders for admin dashboard (alternative endpoint if /api/admin/orders doesn't exist)
  getAllOrdersAlternative: async () => {
    try {
      // This is a fallback that tries different endpoints
      const endpoints = [
        '/api/orders/all',
        '/api/orders',
        '/api/admin/orders'
      ]
      
      for (const endpoint of endpoints) {
        try {
          const response = await apiClient.get(endpoint)
          if (response.data && (Array.isArray(response.data) || response.data.data)) {
            console.log(`Successfully fetched orders from ${endpoint}:`, response.data)
            return Array.isArray(response.data) ? response.data : response.data.data || []
          }
        } catch (e) {
          console.log(`Endpoint ${endpoint} failed, trying next...`)
          continue
        }
      }
      return []
    } catch (error) {
      console.error('All order endpoints failed:', error)
      return []
    }
  },
}

export default adminService
