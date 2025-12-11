<template>
  <div class="product-list-view">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full">
      <div class="bg-[#114B5F] text-white text-2xs py-2 px-4 relative">
        <div class="max-w-screen-xl mx-auto flex justify-center items-center">
          <div class="text-center flex gap-2">
            <span class="opacity-95 font-light tracking-wide">Black Friday Sale For All Pen and Book - OFF 50%!</span>
            <router-link to="/product-list" class="font-bold underline hover:text-gray-200">ShopNow</router-link>
          </div>
        </div>
      </div>

      <nav class="bg-white border-b border-gray-200 w-full shadow-sm">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-6 lg:px-8">
          <router-link to="/" class="flex items-center text-2xl font-bold tracking-tight shrink-0">
            <span class="text-[#EF4444]">Tov</span><span class="text-gray-900">Rean</span>
          </router-link>
          <div class="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-gray-600 font-medium text-[16px]">
            <router-link to="/" class="hover:text-[#114B5F] transition-colors">Home</router-link>
            <router-link to="/product-list" class="text-[#114B5F] font-bold">Products</router-link>
            <a href="#promotion-section" class="hover:text-[#114B5F] transition-colors">Promotion</a>
            <router-link to="/product-list" class="hover:text-[#114B5F] transition-colors">Category</router-link>
          </div>
          <div class="flex items-center space-x-4 md:order-2">
            <div class="hidden md:flex relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                class="bg-gray-100 text-sm rounded-full px-5 py-2.5 w-64 focus:outline-none focus:ring-1 focus:ring-[#114B5F] border-none placeholder-gray-500"
              >
              <button class="absolute right-3 top-2.5 text-gray-500 hover:text-[#114B5F]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <button class="text-gray-800 hover:text-[#EF4444] transition hidden sm:block relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>

              <router-link to="/cart" class="text-gray-800 hover:text-[#114B5F] relative transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </router-link>

              <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span class="sr-only">Open user menu</span>
                <img class="w-9 h-9 rounded-full object-cover border border-gray-200" src="/Photo/MyProfile.JPG" alt="user photo">
              </button>
              <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44" id="user-dropdown">
                <div class="px-4 py-3">
                  <span class="block text-sm text-gray-900">{{ displayName }}</span>
                  <span class="block text-sm text-gray-500 truncate">{{ displayEmail }}</span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li><router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</router-link></li>
                  <li><router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</router-link></li>
                  <li><a @click.prevent="handleSignOut" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Sign out</a></li>
                </ul>
              </div>
              <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="hidden w-full md:hidden border-t border-gray-100" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 bg-gray-50 space-y-2">
            <li><router-link to="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">Home</router-link></li>
            <li><router-link to="/product-list" class="block py-2 px-3 text-white bg-[#EF4444] rounded" aria-current="page">Products</router-link></li>
            <li><a href="#promotion-section" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">Promotion</a></li>
            <li><router-link to="/product-list" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">Category</router-link></li>
            <li class="mt-2 pt-2 border-t border-gray-200">
              <input type="text" placeholder="What are you looking for?" class="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#114B5F] focus:border-[#114B5F] block p-2.5">
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Body -->
    <div class="flex ... pt-40">
    <!-- ✨ Added pt-40 so the header won’t cover content -->

    <div class="w-1/20"></div>

    <div class="w-18/20 relative ...">
      <div>
        <h1 class="text-[20px] my-10 ...">Home / Products</h1>
      </div>

      <div class="grid grid-cols-5 gap-4 ...">
        <!-- Category -->
        <div class="col-span-1 mb-20 ...">
          <div class="sticky top-50">
            <h1 class="text-[20px] font-semibold mb-5">Category</h1>

            <div class="text-base/8 text-[15px]">
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Writing Instruments</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Paper Products</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Art & Craft Supplies</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Organization & Storage</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">School Bags & Carriers</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Classroom & Teaching Supplies</p>
              </div>
              <div class="flex items-center">
                <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                <p class="ml-2 text-[15px]">Books & Learning Materials</p>
              </div>
            </div>

            <div class="pr-20">
              <h1 class="text-[20px] font-semibold my-5">Price</h1>

              <div class="flex justify-between">
                <p>Range</p>
                <p>$0-100</p>
              </div>

              <div class="my-2 relative">
                <div class="flex items-center justify-between w-full">
                  <div class="w-5 h-5 rounded-full bg-black z-10"></div>
                  <div class="w-5 h-5 rounded-full bg-black z-10"></div>
                </div>

                <div
                  class="w-full h-3 bg-[#E6E6E6] absolute top-1/2 transform rounded-full -translate-y-1/2"
                ></div>
              </div>
            </div>

            <div class="mb-10 mt-5">
              <h1 class="text-[20px] font-semibold mb-5">Customer Review</h1>
              <div class="text-base/8 text-[15px]">
                <div class="flex items-center">
                  <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    ★ ★ ★ ★ ★
                    <p class="ml-2 text-black text-[16px] font-light">5.0</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    ★ ★ ★ ★ ☆
                    <p class="ml-2 text-black text-[16px] font-light">4.0</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    ★ ★ ★ ☆ ☆
                    <p class="ml-2 text-black text-[16px] font-light">3.0</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    ★ ★ ☆ ☆ ☆
                    <p class="ml-2 text-black text-[16px] font-light">2.0</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="h-5 w-5 rounded-full border-2 border-black"></div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    ★ ☆ ☆ ☆ ☆
                    <p class="ml-2 text-black text-[16px] font-light">1.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product List -->
        <div class="col-start-2 col-end-6 ...">
          <div class="flex justify-between mb-10 items-baseline">
            <h1 class="text-[20px]">School Products</h1>
            <p class="text-[16px] font-light">{{ allProducts.length }} items</p>
          </div>
          <div class="flex flex-wrap gap-5 justify-between">
            <product-card-component :products="products" />
          </div>

          <div v-if="totalPages() > 1" class="flex justify-end my-20 items-center gap-6 text-[16px]">
            <!-- Previous -->
            <div
              @click="previousPage"
              :class="currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#757575] cursor-pointer hover:text-black'"
            >
              &larr; Previous
            </div>

            <!-- Page Numbers -->
            <div class="flex items-center gap-2">
              <div
                v-for="page in totalPages()"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'h-10 w-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors',
                  currentPage === page
                    ? 'text-white bg-[#2C2C2C]'
                    : 'hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </div>
            </div>

            <!-- Next -->
            <div
              @click="nextPage"
              :class="currentPage === totalPages() ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:text-black'"
            >
              Next &rarr;
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/20"></div>
  </div>

  <!-- Footer -->
  <Footer />
</div>
</template>

<script lang="ts">
import ProductCardComponent from '@/components/product/product-card-component.vue'
import Footer from '@/components/Footer.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { onMounted, ref, computed } from 'vue'
import { initFlowbite } from 'flowbite'

export default {
  name: 'product-list-view',

  components: {
    ProductCardComponent,
    Footer,
  },

  data() {
    return {
      authStore: useAuthStore(),
    }
  },

  computed: {
    displayName() {
      if (this.authStore.user) return this.authStore.user.username || this.authStore.user.email || 'User'
      return 'Not signed in'
    },
    displayEmail() {
      if (this.authStore.user) return this.authStore.user.email || 'Signed in'
      return 'Please sign in'
    },
  },

  methods: {
    handleSignOut() {
      this.authStore.logout()
    },
  },

  setup() {
    const productStore = useProductStore()
    const allProducts = ref<any[]>([])
    const products = ref<any[]>([])
    const loading = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 5

    const loadProducts = async () => {
      loading.value = true
      try {
        await productStore.fetchProducts()
        // Map backend products to match the component's expected format
        allProducts.value = productStore.products.map((product) => ({
          id: product.id,
          imageURL: product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image',
          name: product.name,
          price: product.price,
          rating: 4.5,
          discount: product.discount || null,
        }))
        updatePaginatedProducts()
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        loading.value = false
      }
    }

    const updatePaginatedProducts = () => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      products.value = allProducts.value.slice(start, end)
    }

    const totalPages = () => {
      return Math.ceil(allProducts.value.length / itemsPerPage)
    }

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages()) {
        currentPage.value = page
        updatePaginatedProducts()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        goToPage(currentPage.value - 1)
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages()) {
        goToPage(currentPage.value + 1)
      }
    }

    onMounted(() => {
      initFlowbite()
      loadProducts()
    })

    return {
      products,
      loading,
      currentPage,
      totalPages,
      goToPage,
      previousPage,
      nextPage,
      allProducts,
    }
  },
}
</script>
