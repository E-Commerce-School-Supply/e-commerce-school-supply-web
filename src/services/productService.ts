import apiClient from './apiClient'
import type { Product } from '@/types/product'

export const productService = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get('/api/products')
    return response.data
  },

  // Create a new product
  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await apiClient.post('/api/products', product)
    return response.data
  },

  // Update a product
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await apiClient.put(`/api/products/${id}`, product)
    return response.data
  },

  // Delete a product
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/api/products/${id}`)
  },
}
