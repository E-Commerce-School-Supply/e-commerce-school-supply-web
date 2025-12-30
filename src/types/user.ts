export interface Address {
  label: string
  country: string
  city: string
  addressLine: string
  isDefault: boolean
}

export interface SavedCard {
  cardName: string
  cardNumber: string
  CVV: string
  expiryDate: any
}

export interface UserProfile {
  id?: string
  username: string
  role: string
  email: string
  phoneNumber: string
  addresses?: Address[]
  savedCards?: SavedCard[]
  wishlistProductIds?: string[]
  avatarUrl: string // Make it non-optional with default empty string
}
