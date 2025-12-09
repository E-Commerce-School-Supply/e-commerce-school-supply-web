<script setup lang="ts">
import { ref, reactive } from 'vue'
import { IconDotsVertical } from '@tabler/icons-vue'

interface Product {
  id: number
  name: string
  category: string
  stock: number
  price: number
  status: 'In Stock' | 'Out of stock'
  image: string
}

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 148,
    price: 29.99,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 0,
    price: 29.99,
    status: 'Out of stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 148,
    price: 29.99,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 0,
    price: 29.99,
    status: 'Out of stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 148,
    price: 29.99,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
  {
    id: 6,
    name: 'Ullamfullat Game 25L Backpack',
    category: 'School Bag & Cartten',
    stock: 0,
    price: 29.99,
    status: 'Out of stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
  },
])

const selectedProducts = ref<number[]>([])
const searchQuery = ref('')

// Drawer / form state
const showAddForm = ref(false)

const productForm = reactive({
  name: '',
  description: '',
  mainCategory: '',
  subCategory: '',
  type: '',
  size: '',
  color: '',
  material: '',
  brandName: '',
  stockQuantity: 0,
  salePrice: 0,
  discount: 0,
  images: [] as string[],
})

const resetForm = () => {
  productForm.name = ''
  productForm.description = ''
  productForm.mainCategory = ''
  productForm.subCategory = ''
  productForm.type = ''
  productForm.size = ''
  productForm.color = ''
  productForm.material = ''
  productForm.brandName = ''
  productForm.stockQuantity = 0
  productForm.salePrice = 0
  productForm.discount = 0
  productForm.images = []
}

const openAddForm = () => {
  resetForm()
  showAddForm.value = true
}

const closeAddForm = () => {
  showAddForm.value = false
}

const onFilesSelected = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  Array.from(input.files).forEach((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') productForm.images.push(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index: number) => {
  productForm.images.splice(index, 1)
}

const saveProduct = () => {
  // Simple local save to the products list for now
  const newId = products.value.length ? Math.max(...products.value.map((p) => p.id)) + 1 : 1
  const newProduct: Product = {
    id: newId,
    name: productForm.name || 'Untitled Product',
    category: productForm.mainCategory || 'Uncategorized',
    stock: productForm.stockQuantity,
    price: productForm.salePrice,
    status: productForm.stockQuantity > 0 ? 'In Stock' : 'Out of stock',
    image: productForm.images[0] || 'https://via.placeholder.com/100',
  }
  products.value.unshift(newProduct)
  closeAddForm()
}

const toggleSelectAll = () => {
  if (selectedProducts.value.length === products.value.length) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = products.value.map((p) => p.id)
  }
}

const toggleSelectProduct = (productId: number) => {
  const index = selectedProducts.value.indexOf(productId)
  if (index > -1) {
    selectedProducts.value.splice(index, 1)
  } else {
    selectedProducts.value.push(productId)
  }
}

const isSelected = (productId: number) => {
  return selectedProducts.value.includes(productId)
}
</script>

<template>
  <div class="bg-white rounded shadow p-6">
    <!-- Header Section -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h1 class="text-xl font-bold">Product Management</h1>
        <button @click="openAddForm" class="bg-teal-700 text-white px-4 py-2 rounded text-sm hover:bg-teal-800 flex items-center gap-2">
          <span class="text-lg">+</span> Add New Product
        </button>
      </div>
      <div class="text-sm text-gray-500">
        Product Management / <span class="text-teal-700">Add New Product</span>
      </div>
    </div>

    <!-- Table Container -->
    <div class="border rounded-lg overflow-hidden">
      <!-- Table Controls -->
      <div class="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">All Product</span>
          <span class="text-sm text-gray-500">257</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Product..."
              class="border rounded px-3 py-1.5 pr-8 text-sm w-64"
            />
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <button class="border rounded px-3 py-1.5 text-sm flex items-center gap-1">
            <span>⚙️</span>
          </button>
        </div>
      </div>

      <!-- Table -->
      <table class="w-full">
        <thead class="bg-gray-50 border-b text-xs text-gray-600">
          <tr>
            <th class="py-3 px-4 text-left w-12">
              <input
                type="checkbox"
                :checked="selectedProducts.length === products.length"
                @change="toggleSelectAll"
                class="rounded"
              />
            </th>
            <th class="py-3 px-4 text-left">Product</th>
            <th class="py-3 px-4 text-left">Category</th>
            <th class="py-3 px-4 text-left">Stock</th>
            <th class="py-3 px-4 text-left">Price</th>
            <th class="py-3 px-4 text-left">Status</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4">
              <input
                type="checkbox"
                :checked="isSelected(product.id)"
                @change="toggleSelectProduct(product.id)"
                class="rounded"
              />
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-10 h-10 rounded object-cover"
                />
                <span class="font-medium">{{ product.name }}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-gray-600">{{ product.category }}</td>
            <td class="py-3 px-4 text-gray-600">{{ product.stock }}</td>
            <td class="py-3 px-4 font-medium">${{ product.price.toFixed(2) }}</td>
            <td class="py-3 px-4">
              <span
                v-if="product.status === 'In Stock'"
                class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                In Stock
              </span>
              <span
                v-else
                class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                Out of stock
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-gray-400 hover:text-gray-600">
                <IconDotsVertical :size="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Drawer -->
    <transition name="fade">
      <div
        v-if="showAddForm"
        class="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 bg-white shadow-xl border-l z-50 overflow-auto"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Add New Product</h2>
            <button class="text-gray-500" @click="closeAddForm">✕</button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600">Product Name</label>
              <input v-model="productForm.name" type="text" class="w-full border rounded px-3 py-2 mt-1" placeholder="Type name here" />
            </div>

            <div>
              <label class="block text-sm text-gray-600">Description</label>
              <textarea v-model="productForm.description" rows="4" class="w-full border rounded px-3 py-2 mt-1" placeholder="Type Description here"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600">Main Category</label>
                <select v-model="productForm.mainCategory" class="w-full border rounded px-3 py-2 mt-1">
                  <option value="">Select Product Category</option>
                  <option>School Bag & Cartten</option>
                  <option>Clothing</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600">Sub Category</label>
                <select v-model="productForm.subCategory" class="w-full border rounded px-3 py-2 mt-1">
                  <option value="">Select Product Category</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <input v-model="productForm.type" placeholder="Type" class="border rounded px-3 py-2" />
              <input v-model="productForm.size" placeholder="Size" class="border rounded px-3 py-2" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <input v-model="productForm.color" placeholder="Color" class="border rounded px-3 py-2" />
              <input v-model="productForm.material" placeholder="Material" class="border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm text-gray-600">Brand Name</label>
              <input v-model="productForm.brandName" type="text" class="w-full border rounded px-3 py-2 mt-1" placeholder="Type brand name here" />
            </div>

            <div class="grid grid-cols-3 gap-4">
              <input v-model.number="productForm.stockQuantity" type="number" placeholder="Stock Quantity" class="border rounded px-3 py-2" />
              <input v-model.number="productForm.salePrice" type="number" step="0.01" placeholder="Sale Price" class="border rounded px-3 py-2" />
              <input v-model.number="productForm.discount" type="number" placeholder="Discount (Optional)" class="border rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1">Product Images</label>
              <div class="border-dashed border-2 border-gray-200 rounded p-4 text-center">
                <input type="file" multiple accept="image/*" @change="onFilesSelected" />
                <div class="flex gap-2 mt-3 flex-wrap">
                  <div v-for="(img, idx) in productForm.images" :key="idx" class="relative">
                    <img :src="img" class="w-20 h-20 object-cover rounded" />
                    <button @click.prevent="removeImage(idx)" class="absolute top-0 right-0 bg-black text-white rounded-full text-xs w-5 h-5">×</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 mt-4">
              <button @click="closeAddForm" class="px-4 py-2 border rounded text-sm">Cancel</button>
              <button @click="saveProduct" class="px-4 py-2 bg-teal-700 text-white rounded text-sm">Save Product</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
input[type='checkbox'] {
  cursor: pointer;
}
</style>
