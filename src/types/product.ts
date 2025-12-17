export interface Product {
  id?: string
  name: string
  description?: string
  mainCategory?: string
  subCategory?: string
  type?: string
  size?: string
  color?: string
  material?: string
  brandName?: string
  stockQuantity?: number
  price: number
  discount?: number | null
  imageUrl?: string
  status?: 'In Stock' | 'Out of stock'
  rating: number | 0
  imageURL?: string // For backward compatibility
}