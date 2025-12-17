<template>
  <div class="product-list-view">
    <Header />

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
import Header from '@/components/layout/Header.vue'
import ProductCardComponent from '@/components/product/product-card-component.vue'
import Footer from '@/components/Footer.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { onMounted, ref, computed } from 'vue'
import { initFlowbite } from 'flowbite'

export default {
  name: 'product-list-view',

  components: {
    Header,
    ProductCardComponent,
    Footer,
  },

  data() {
    return {
      authStore: useAuthStore(),
    }
  },

  computed: {},
  methods: {},

  setup() {
    const productStore = useProductStore()
    const allProducts = ref<any[]>([])
    const products = ref<any[]>([])
    const loading = ref(false)
    const currentPage = ref(1)

    const itemsPerPage = 8

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
          stockQuantity: product.stockQuantity ?? 0,
          status: product.status || (product.stockQuantity && product.stockQuantity > 0 ? 'In Stock' : 'Out of stock'),
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
