<template>
  <div class="product-list-view w-full flex justify-center items-center">

    <div class="w-18/20 relative ...">
      <div>
        <h1 class="text-[20px] my-10 ...">Home / Products</h1>
      </div>

      <div class="grid grid-cols-5 gap-4 ...">
        <!-- Category -->
        <div class="col-span-1 mb-20 ...">
          <div class="sticky top-32">
            <h1 class="text-[20px] font-semibold mb-5">Category</h1>

            <div class="text-base/8 text-[15px]">
              <div
                v-for="cat in categories"
                :key="cat"
                class="flex items-center cursor-pointer select-none"
                @click="selectCategory(cat)"
              >
                <div
                  class="h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center"
                  :class="selectedCategory === cat ? 'border-[#1A535C] ring-2 ring-offset-2 ring-[#1A535C]' : 'border-black'"
                >
                  <div v-if="selectedCategory === cat" class="h-2.5 w-2.5 rounded-full bg-[#1A535C]"></div>
                </div>
                <p class="ml-2 text-[15px]">{{ cat }}</p>
              </div>
            </div>

            <div class="pr-20">
              <h1 class="text-[20px] font-semibold my-5">Price</h1>

              <div class="flex justify-between">
                <p>Range</p>
                <p>${{ Math.round(priceMin) }}-{{ Math.round(priceMax) }}</p>
              </div>

              <div class="my-3 relative h-6">
                <div class="absolute top-1/2 -translate-y-1/2 w-full h-3 bg-[#E6E6E6] rounded-full"></div>
                <div
                  class="absolute top-1/2 -translate-y-1/2 h-3 bg-black rounded-full"
                  :style="{ left: minPercent + '%', width: Math.max(0, maxPercent - minPercent) + '%' }"
                ></div>

                <div
                  class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black z-10"
                  :style="{ left: 'calc(' + minPercent + '% - 10px)' }"
                ></div>
                <div
                  class="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black z-10"
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
              <h1 class="text-[20px] font-semibold mb-5">Customer Review</h1>
              <div class="text-base/8 text-[15px]">
                <div
                  v-for="r in ratingOptions"
                  :key="r"
                  class="flex items-center cursor-pointer select-none"
                  @click="selectMinRating(r)"
                >
                  <div
                    class="h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center"
                    :class="selectedMinRating === r ? 'border-[#1A535C] ring-2 ring-offset-2 ring-[#1A535C]' : 'border-black'"
                  >
                    <div v-if="selectedMinRating === r" class="h-2.5 w-2.5 rounded-full bg-[#1A535C]"></div>
                  </div>
                  <div class="ml-2 text-[#FF6B6B] text-[24px] flex items-baseline">
                    <template v-for="n in 5" :key="n">
                      <span>{{ n <= r ? '★' : '☆' }}</span>
                    </template>
                    <p class="ml-2 text-black text-[16px] font-light">{{ r.toFixed(1) }}</p>
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
            <p class="text-[16px] font-light">{{ filteredAllProducts.length }} items</p>
          </div>
          <div v-if="loading">
            <Spinner/>
          </div>
          <div v-else class="flex flex-wrap gap-5 justify-between">
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
    const allProducts = ref<Product[]>([])
    const products = ref<Product[]>([])
    const currentPage = ref(1)
    const itemsPerPage =10

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
          rating: product.averageRating || product.rating || 0,
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
      return allProducts.value.filter((p) => {
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
          const rating = Number(p.rating ?? 0)
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

    watch([selectedCategory, priceMin, priceMax, selectedMinRating], () => {
      currentPage.value = 1
      updatePaginatedProducts()
    })

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
