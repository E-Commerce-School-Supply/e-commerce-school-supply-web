<template>
  <div class="product-list-view w-full flex justify-center items-center bg-white dark:bg-gray-900 transition-colors">

    <div class="w-18/20 relative ...">
      <div>
        <h1 class="text-[20px] my-10 text-gray-900 dark:text-white ...">{{ $t('productList.breadcrumb') }}</h1>
      </div>

      <div class="grid grid-cols-5 gap-4 ...">
        <!-- Category -->
        <div class="col-span-1 mb-20 ...">
          <div class="sticky top-32">
            <h1 class="text-[20px] font-semibold mb-5 text-gray-900 dark:text-white">{{ $t('productList.category') }}</h1>

            <div class="text-base/8 text-[15px] text-gray-700 dark:text-gray-300">
              <div
                v-for="cat in categories"
                :key="cat"
                class="flex items-center cursor-pointer select-none"
                @click="selectCategory(cat)"
              >
                <div
                  class="h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center"
                  :class="selectedCategory === cat ? 'border-[#1A535C] dark:border-[#4EB8D4]' : 'border-black dark:border-gray-400'"
                >
                  <div v-if="selectedCategory === cat" class="h-2.5 w-2.5 rounded-full bg-[#1A535C] dark:bg-cyan-300"></div>
                </div>
                <p class="ml-2 text-[15px]">{{ cat }}</p>
              </div>
            </div>

            <div class="pr-20">
              <h1 class="text-[20px] font-semibold my-5 text-gray-900 dark:text-white">{{ $t('productList.price') }}</h1>

              <div class="flex justify-between text-gray-700 dark:text-gray-300">
                <p>{{ $t('productList.range') }}</p>
                <p>${{ Math.round(priceMin) }}-{{ Math.round(priceMax) }}</p>
              </div>

              <div class="my-3 relative h-6">
                <div class="absolute top-1/2 -translate-y-1/2 w-full h-3 bg-[#E6E6E6] dark:bg-gray-700 rounded-full"></div>
                <div
                  class="absolute top-1/2 -translate-y-1/2 h-3 bg-black dark:bg-cyan-300 rounded-full"
                  :style="{ left: minPercent + '%', width: Math.max(0, maxPercent - minPercent) + '%' }"
                ></div>

                <div
                  class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black dark:bg-cyan-300 z-10"
                  :style="{ left: 'calc(' + minPercent + '% - 10px)' }"
                ></div>
                <div
                  class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black dark:bg-cyan-300 z-10"
                  :style="{ left: 'calc(' + maxPercent + '% - 10px)' }"
                ></div>

                <input
                  type="range"
                  class="absolute inset-0 w-full opacity-0 cursor-pointer"
                  :min="priceMinLimit"
                  :max="priceMaxLimit"
                  v-model.number="priceMin"
                  @input="onPriceMinInput"
                />
                <input
                  type="range"
                  class="absolute inset-0 w-full opacity-0 cursor-pointer"
                  :min="priceMinLimit"
                  :max="priceMaxLimit"
                  v-model.number="priceMax"
                  @input="onPriceMaxInput"
                />
              </div>
            </div>

            <div class="mb-10 mt-5">
              <h1 class="text-[20px] font-semibold mb-5 text-gray-900 dark:text-white">{{ $t('productList.customer_review') }}</h1>
              <div class="text-base/8 text-[15px] text-gray-700 dark:text-gray-300">
                <div
                  v-for="r in ratingOptions"
                  :key="r"
                  class="flex items-center cursor-pointer select-none"
                  @click="selectMinRating(r)"
                >
                  <div
                    class="h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center"
                    :class="selectedMinRating === r ? 'border-[#1A535C] dark:border-[#4EB8D4] ring-2 ring-offset-2 ring-[#1A535C] dark:ring-[#4EB8D4] dark:ring-offset-gray-900' : 'border-black dark:border-gray-400'"
                  >
                    <div v-if="selectedMinRating === r" class="h-2.5 w-2.5 rounded-full bg-[#1A535C] dark:bg-cyan-300"></div>
                  </div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    <template v-for="n in 5" :key="n">
                      <span>{{ n <= r ? '★' : '☆' }}</span>
                    </template>
                    <p class="ml-2 text-black dark:text-white text-[16px] font-light">{{ r.toFixed(1) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product List -->
        <div class="col-start-2 col-end-6 ...">
          <div class="flex justify-between mb-10 items-baseline">
            <h1 class="text-[20px] text-gray-900 dark:text-white">{{ selectedCategory ? `'${selectedCategory}'` : $t('productList.school_products') }}</h1>
            <p class="text-[16px] font-light text-gray-600 dark:text-gray-400">{{ $t('productList.items_count', { count: filteredAllProducts.length }) }}</p>
          </div>
          <div v-if="loading">
            <Spinner/>
          </div>
          <div v-else-if ="filteredAllProducts.length === 0" class="text-center">
              <img src="/src/assets/images/empty.png" alt="No products" class="mx-auto w-[430px] h-[430px] mb-4" />
              <p class="text-[24px] font-medium text-[#BFBFBF]">{{ $t('productList.no_items') }}</p>
          </div>
          <div v-else class="flex flex-wrap gap-5">
            <product-card-component :products="products" />
          </div>

          <div v-if="totalPages() > 0" class="flex justify-end my-20 items-center gap-6 text-[16px] text-gray-700 dark:text-gray-300">
            <!-- Previous -->
            <div
              @click="previousPage"
              :class="currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-[#757575] dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white'"
            >
              &larr; {{ $t('productList.previous') }}
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
                    ? 'text-white bg-[#2C2C2C] dark:bg-[#1A535C] dark:text-gray-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
              >
                {{ page }}
              </div>
            </div>

            <!-- Next -->
            <div
              @click="nextPage"
              :class="currentPage === totalPages() ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'cursor-pointer hover:text-black dark:hover:text-white'"
            >
              {{ $t('productList.next') }} &rarr;
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/20"></div>
  </div>
</template>

<script lang="ts">
import ProductCardComponent from '@/components/product/product-card-component.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { onMounted, ref, computed, watch } from 'vue'
import { initFlowbite } from 'flowbite'
import Spinner from '@/components/ui/Spinner.vue'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'
import { useRoute } from 'vue-router'

export default {
  name: 'product-list-view',

  components: {
    ProductCardComponent,
    Spinner,
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
    const route = useRoute()
    const allProducts = ref<Product[]>([])
    const products = ref<Product[]>([])
    const currentPage = ref(1)
    const itemsPerPage =12
    const searchQuery = ref('')
    
    const categories = ref<string[]>([
      'Writing Instruments',
      'Paper Products',
      'Art & Craft Supplies',
      'Organization & Storage',
      'School Bags & Carriers',
      'Classroom & Teaching Supplies',
      'Books & Learning Materials',
    ])

    const selectedCategory = ref<string | null>(null)

    const priceMinLimit = 0
    const priceMaxLimit = ref(100)
    const priceMin = ref(0)
    const priceMax = ref(100)

    const ratingOptions = ref<number[]>([5, 4, 3, 2, 1])
    const selectedMinRating = ref<number | null>(null)

    const minPercent = computed(() => {
      const max = priceMaxLimit.value || 1
      return (priceMin.value / max) * 100
    })

    const maxPercent = computed(() => {
      const max = priceMaxLimit.value || 1
      return (priceMax.value / max) * 100
    })

    const {loading, error} = storeToRefs(productStore);
    const loadProducts = async () => {
      productStore.loading = true
      try {
        await productStore.fetchProducts()
        // Map backend products to match the component's expected format
        allProducts.value = productStore.products.map((product) => ({
          id: product.id,
          imageUrl: product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image',
          name: product.name,
          price: product.price,
          averageRating: product.averageRating || 0,
          discount: product.discount || null,
          stockQuantity: product.stockQuantity ?? 0,
          status: (product.stockQuantity ?? 0) > 0 ? 'In Stock' : 'Out of stock',
          mainCategory: product.mainCategory,
          subCategory: product.subCategory,
          type: product.type,
        }))

        const computedMax = Math.max(
          100,
          ...allProducts.value.map((p) => Number(p.price ?? 0)),
        )
        priceMaxLimit.value = Math.ceil(computedMax)
        priceMin.value = 0
        priceMax.value = priceMaxLimit.value

        updatePaginatedProducts()
      } catch (err: unknown) {
        console.error('Failed to load products:', err)
        const message = err instanceof Error ? err.message : 'Failed to Fetch Data.'
        productStore.error = message
      } finally {
        productStore.loading = false;
      }
    }

    const updatePaginatedProducts = () => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      products.value = filteredAllProducts.value.slice(start, end)
    }

    const filteredAllProducts = computed(() => {
      const selected = selectedCategory.value?.toLowerCase() || null
      const search = searchQuery.value.toLowerCase().trim()
      
      return allProducts.value.filter((p) => {
        // Search filter
        if (search) {
          const name = String(p?.name ?? '').toLowerCase()
          const brand = String(p?.mainCategory ?? '').toLowerCase()
          const subCat = String(p?.subCategory ?? '').toLowerCase()
          const matchSearch = name.includes(search) || brand.includes(search) || subCat.includes(search)
          if (!matchSearch) return false
        }
        
        if (selected) {
          const main = String(p?.mainCategory ?? '').toLowerCase()
          const sub = String(p?.subCategory ?? '').toLowerCase()
          const type = String(p?.type ?? '').toLowerCase()
          const matchCategory = main === selected || sub === selected || type === selected
          if (!matchCategory) return false
        }

        const price = Number(p.price ?? 0)
        if (price < priceMin.value || price > priceMax.value) return false

        if (selectedMinRating.value != null) {
          const rating = Number(p.averageRating ?? 0)
          if (rating < selectedMinRating.value) return false
        }

        return true
      })
    })

    const totalPages = () => {
      return Math.ceil(filteredAllProducts.value.length / itemsPerPage)
    }

    const selectCategory = (category: string) => {
      selectedCategory.value = selectedCategory.value === category ? null : category
      currentPage.value = 1
      updatePaginatedProducts()
    }

    const onPriceMinInput = () => {
      if (priceMin.value > priceMax.value) priceMin.value = priceMax.value
    }

    const onPriceMaxInput = () => {
      if (priceMax.value < priceMin.value) priceMax.value = priceMin.value
    }

    const selectMinRating = (rating: number) => {
      selectedMinRating.value = selectedMinRating.value === rating ? null : rating
    }

    watch([selectedCategory, priceMin, priceMax, selectedMinRating, searchQuery], () => {
      currentPage.value = 1
      updatePaginatedProducts()
    })

    // Watch for search query from route
    watch(
      () => route.query.search,
      (newSearch) => {
        searchQuery.value = typeof newSearch === 'string' ? newSearch : ''
      },
      { immediate: true }
    )

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages()) {
        currentPage.value = page
        updatePaginatedProducts()
        window.scrollTo({ top: 0, behavior: 'auto' })
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
      error,
      currentPage,
      totalPages,
      goToPage,
      previousPage,
      nextPage,
      allProducts,
      filteredAllProducts,
      categories,
      selectedCategory,
      selectCategory,
      priceMinLimit,
      priceMaxLimit,
      priceMin,
      priceMax,
      minPercent,
      maxPercent,
      onPriceMinInput,
      onPriceMaxInput,
      ratingOptions,
      selectedMinRating,
      selectMinRating,
    }
  },
}
</script>
