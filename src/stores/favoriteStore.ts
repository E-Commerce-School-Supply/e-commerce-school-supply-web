import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

const STORAGE_KEY = 'favorites'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<Product[]>([])

  function load() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) favorites.value = JSON.parse(raw)
      else favorites.value = []
    } catch (e) {
      favorites.value = []
    }
  }

  function save() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  function isFavorited(id?: string) {
    if (!id) return false
    return favorites.value.some(f => f.id === id)
  }

  function toggleFavorite(product: Product) {
    const id = product.id || product.name
    const idx = favorites.value.findIndex(p => (p.id || p.name) === id)
    if (idx === -1) {
      favorites.value.unshift(product)
    } else {
      favorites.value.splice(idx, 1)
    }
    save()
  }

  function removeById(id?: string) {
    if (!id) return
    const idx = favorites.value.findIndex(p => p.id === id)
    if (idx !== -1) favorites.value.splice(idx, 1)
    save()
  }

  load()

  const count = computed(() => favorites.value.length)

  return { favorites, load, save, toggleFavorite, isFavorited, removeById, count }
})
