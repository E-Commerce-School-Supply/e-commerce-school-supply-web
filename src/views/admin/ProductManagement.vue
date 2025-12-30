<script setup lang="ts">
import { ref, reactive, onMounted, computed, onBeforeUnmount } from 'vue'
import { IconDotsVertical } from '@tabler/icons-vue'
import { productService } from '@/services/productService'
import type { Product } from '@/types/product'
import BlankProfile from '@/assets/images/pfp_blank.jpeg'

const products = ref<Product[]>([])
const selectedProducts = ref<string[]>([])
const searchQuery = ref('')
const loading = ref(false)
const showAddForm = ref(false)
const isEditMode = ref(false)
const editingProductId = ref<string | null>(null)
const openDropdown = ref<string | null>(null)

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

// School product categories with subcategories
const categories = {
  'Writing Instruments': ['Pens', 'Pencils', 'Markers', 'Highlighters', 'Crayons', 'Chalk'],
  'Paper Products': ['Notebooks', 'Loose Leaf Paper', 'Sticky Notes', 'Index Cards', 'Construction Paper', 'Drawing Paper'],
  'Art & Craft Supplies': ['Paint', 'Brushes', 'Colored Pencils', 'Scissors', 'Glue', 'Tape', 'Clay', 'Craft Kits'],
  'Organization & Storage': ['Binders', 'Folders', 'Dividers', 'Pencil Cases', 'Organizers', 'Backpack Accessories'],
  'School Bags & Carriers': ['Backpacks', 'Messenger Bags', 'Lunch Bags', 'Pencil Pouches', 'Laptop Bags'],
  'Classroom & Teaching Supplies': ['Whiteboards', 'Bulletin Boards', 'Educational Posters', 'Classroom Decor', 'Teaching Aids'],
  'Books & Learning Materials': ['Textbooks', 'Workbooks', 'Reference Books', 'Educational Games', 'Flashcards', 'Study Guides'],
  'Technology & Electronics': ['Calculators', 'USB Drives', 'Headphones', 'Laptop Accessories', 'Batteries'],
  'Health & Safety': ['Hand Sanitizers', 'Masks', 'First Aid Supplies', 'Tissues', 'Wet Wipes'],
}

// Computed subcategories based on selected main category
const availableSubCategories = computed(() => {
  if (!productForm.mainCategory || !categories[productForm.mainCategory as keyof typeof categories]) {
    return []
  }
  return categories[productForm.mainCategory as keyof typeof categories]
})

// Load products from backend
const loadProducts = async () => {
  try {
    loading.value = true
    products.value = await productService.getAllProducts()
  } catch (error) {
    console.error('Failed to load products:', error)
  } finally {
    loading.value = false
  }
}

// Computed property for filtered products
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p =>
    p.name?.toLowerCase().includes(query) ||
    p.mainCategory?.toLowerCase().includes(query)
  )
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
  isEditMode.value = false
  editingProductId.value = null
}

const openAddForm = () => {
  resetForm()
  showAddForm.value = true
}

const openEditForm = (product: Product) => {
  isEditMode.value = true
  editingProductId.value = product.id || null
  productForm.name = product.name || ''
  productForm.description = product.description || ''
  productForm.mainCategory = product.mainCategory || ''
  productForm.subCategory = product.subCategory || ''
  productForm.type = product.type || ''
  productForm.size = product.size || ''
  productForm.color = product.color || ''
  productForm.material = product.material || ''
  productForm.brandName = product.brandName || ''
  productForm.stockQuantity = product.stockQuantity || 0
  productForm.salePrice = product.price || 0
  productForm.discount = product.discount || 0
  productForm.images = product.imageUrl ? [product.imageUrl] : []
  showAddForm.value = true
}

const closeAddForm = () => {
  showAddForm.value = false
}

const onFilesSelected = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  processFiles(input.files)
}

const processFiles = (files: FileList) => {
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload only image files')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') productForm.images.push(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer?.files) {
    processFiles(e.dataTransfer.files)
  }
}

const removeImage = (index: number) => {
  productForm.images.splice(index, 1)
}

const saveProduct = async () => {
  try {
    loading.value = true

    // Check if user is authenticated
    const token = sessionStorage.getItem('accessToken')
    if (!token) {
      alert('Please login first to ' + (isEditMode.value ? 'update' : 'add') + ' products')
      return
    }

    // Validate required fields
    if (!productForm.name || !productForm.salePrice) {
      alert('Please fill in product name and price')
      loading.value = false
      return
    }

    const productData = {
      name: productForm.name || 'Untitled Product',
      description: productForm.description,
      mainCategory: productForm.mainCategory,
      subCategory: productForm.subCategory,
      type: productForm.type,
      size: productForm.size,
      color: productForm.color,
      material: productForm.material,
      brandName: productForm.brandName,
      stockQuantity: productForm.stockQuantity,
      price: productForm.salePrice,
      discount: productForm.discount,
      imageUrl: productForm.images.length > 0 ? productForm.images[0] : BlankProfile,
    }

    if (isEditMode.value && editingProductId.value) {
      await productService.updateProduct(editingProductId.value, productData)
      alert('Product updated successfully!')
    } else {
      await productService.createProduct(productData)
      alert('Product added successfully!')
    }

    await loadProducts() // Reload products from backend
    closeAddForm()
  } catch (error: any) {
    console.error('Failed to save product:', error)
    if (error.response?.status === 403) {
      alert('Authentication failed. Please login again.')
    } else {
      alert('Failed to save product: ' + (error.response?.data?.message || error.message))
    }
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (productId: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return

  try {
    loading.value = true

    // Check if user is authenticated
    const token = sessionStorage.getItem('accessToken')
    if (!token) {
      alert('Please login first to delete products')
      return
    }

    await productService.deleteProduct(productId)
    await loadProducts() // Reload products from backend
  } catch (error: any) {
    console.error('Failed to delete product:', error)
    if (error.response?.status === 403) {
      alert('Authentication failed. Please login again.')
    } else {
      alert('Failed to delete product: ' + (error.response?.data?.message || error.message))
    }
  } finally {
    loading.value = false
  }
}

// Close dropdown on click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    openDropdown.value = null
  }
}

// Load products on component mount
onMounted(() => {
  loadProducts()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleSelectAll = () => {
  if (selectedProducts.value.length === filteredProducts.value.length) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = filteredProducts.value.map((p) => p.id!)
  }
}

const toggleSelectProduct = (productId: string) => {
  const index = selectedProducts.value.indexOf(productId)
  if (index > -1) {
    selectedProducts.value.splice(index, 1)
  } else {
    selectedProducts.value.push(productId)
  }
}

const isSelected = (productId: string) => {
  return selectedProducts.value.includes(productId)
}

const toggleDropdown = (productId: string) => {
  if (openDropdown.value === productId) {
    openDropdown.value = null
  } else {
    openDropdown.value = productId
  }
}

const closeDropdown = () => {
  openDropdown.value = null
}

const isDropdownOpen = (productId: string) => {
  return openDropdown.value === productId
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
          <span class="text-sm text-gray-500">{{ products.length }}</span>
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

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8 text-gray-500">
        Loading products...
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-8 text-gray-500">
        No products found
      </div>

      <!-- Table -->
      <table v-else class="w-full">
        <thead class="bg-gray-50 border-b text-xs text-gray-600">
          <tr>
            <th class="py-3 px-4 text-left w-12">
              <input
                type="checkbox"
                :checked="selectedProducts.length === filteredProducts.length && filteredProducts.length > 0"
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
            v-for="product in filteredProducts"
            :key="product.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-4">
              <input
                type="checkbox"
                :checked="isSelected(product.id!)"
                @change="toggleSelectProduct(product.id!)"
                class="rounded"
              />
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  :src="product.imageUrl && product.imageUrl.trim() !== '' ? product.imageUrl : BlankProfile"
                  :alt="product.name"
                  @error="(e) => (e.target as HTMLImageElement).src = BlankProfile"
                  class="w-10 h-10 rounded object-cover bg-gray-100"
                />
                <span class="font-medium">{{ product.name }}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-gray-600">{{ product.mainCategory || 'N/A' }}</td>
            <td class="py-3 px-4 text-gray-600">{{ product.stockQuantity || 0 }}</td>
            <td class="py-3 px-4 font-medium">${{ product.price?.toFixed(2) || '0.00' }}</td>
            <td class="py-3 px-4">
              <span
                v-if="(product.stockQuantity ?? 0) > 0"
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
              <div class="relative">
                <button
                  @click.stop="toggleDropdown(product.id!)"
                  class="text-gray-400 hover:text-gray-600 p-1"
                >
                  <IconDotsVertical :size="20" />
                </button>
                <div
                  v-if="isDropdownOpen(product.id!)"
                  class="absolute right-0 bottom-full mb-1 bg-white border rounded shadow-lg z-50 w-36 overflow-hidden"
                >
                  <button
                    @click="openEditForm(product); closeDropdown()"
                    class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2"
                  >
                    <span>✏️</span> Edit
                  </button>
                  <button
                    @click="deleteProduct(product.id!); closeDropdown()"
                    class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2 border-t"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
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
            <h2 class="text-lg font-bold">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
            <button class="text-gray-500 hover:text-gray-700" @click="closeAddForm">✕</button>
          </div>

          <div class="space-y-5">
            <!-- Basic Information -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Name <span class="text-red-500">*</span></label>
                <input v-model="productForm.name" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter product name" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea v-model="productForm.description" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter product description"></textarea>
              </div>
            </div>

            <!-- Category Information -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 border-b pb-2">Category & Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Main Category <span class="text-red-500">*</span></label>
                  <select
                    v-model="productForm.mainCategory"
                    @change="productForm.subCategory = ''"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select Category</option>
                    <option v-for="(subs, category) in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    v-model="productForm.subCategory"
                    :disabled="!productForm.mainCategory"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Sub Category</option>
                    <option v-for="sub in availableSubCategories" :key="sub" :value="sub">
                      {{ sub }}
                    </option>
                  </select>
                  <p v-if="!productForm.mainCategory" class="text-xs text-gray-500 mt-1">Select main category first</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <input v-model="productForm.type" placeholder="e.g., Ballpoint, Spiral, Canvas" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input v-model="productForm.size" placeholder="e.g., A4, Small, 15 inch" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input v-model="productForm.color" placeholder="e.g., Blue, Multicolor, Black" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <input v-model="productForm.material" placeholder="e.g., Paper, Plastic, Canvas" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input v-model="productForm.brandName" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Enter brand name" />
              </div>
            </div>

            <!-- Pricing & Inventory -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 border-b pb-2">Pricing & Inventory</h3>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity <span class="text-red-500">*</span></label>
                  <input v-model.number="productForm.stockQuantity" type="number" min="0" placeholder="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sale Price ($) <span class="text-red-500">*</span></label>
                  <input v-model.number="productForm.salePrice" type="number" step="0.01" min="0" placeholder="0.00" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input v-model.number="productForm.discount" type="number" min="0" max="100" placeholder="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
              </div>
            </div>

            <!-- Product Images -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 border-b pb-2">Product Images</h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <div
                  @dragover="onDragOver"
                  @drop="onDrop"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors"
                >
                  <div class="space-y-2">
                    <div class="text-gray-400">
                      <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div class="text-sm text-gray-600">
                      <label class="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-700">
                        <span>Click to upload</span>
                        <input type="file" multiple accept="image/*" @change="onFilesSelected" class="sr-only" />
                      </label>
                      <span class="text-gray-500">or drag and drop</span>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                <div v-if="productForm.images.length > 0" class="flex gap-3 mt-4 flex-wrap">
                  <div v-for="(img, idx) in productForm.images" :key="idx" class="relative group">
                    <img :src="img" class="w-24 h-24 object-cover rounded-lg border-2 border-gray-200" />
                    <button @click.prevent="removeImage(idx)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600">×</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-6 border-t">
              <button @click="closeAddForm" class="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button @click="saveProduct" :disabled="loading" class="px-6 py-2.5 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <span v-if="loading">{{ isEditMode ? 'Updating...' : 'Saving...' }}</span>
                <span v-else>{{ isEditMode ? 'Update Product' : 'Save Product' }}</span>
              </button>
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
