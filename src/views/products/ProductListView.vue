<template>
  <div class="product-list-view">
    <!-- Header -->
    <div class="h-40 border-b fixed top-0 w-full z-50 bg-white"></div>

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
            <h1 class="text-[20px]">“Backpack” this is what you’re looking for</h1>
            <p class="text-[16px] font-light">168 items</p>
          </div>
          <div class="flex flex-wrap gap-5 justify-between">
            <product-card-component :products="products" />
          </div>

          <div class="flex justify-end my-20 items-center gap-6 text-[16px]">
            <!-- Previous -->
            <div class="cursor-pointer text-[#757575]">&larr; Previous</div>

            <!-- Page Numbers -->
            <div class="flex items-center gap-2">
              <div
                class="h-10 w-10 text-white bg-[#2C2C2C] rounded-lg flex items-center justify-center"
              >
                1
              </div>
              <div class="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
                2
              </div>
              <div class="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
                3
              </div>
              <div class="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
                ...
              </div>
              <div class="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
                64
              </div>
              <div class="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
                65
              </div>
            </div>

            <!-- Next -->
            <div class="cursor-pointer">Next &rarr;</div>
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

export default {
  name: 'product-list-view',

  components: {
    ProductCardComponent,
    Footer,
  },

  data() {
    return {}
  },

  setup() {
    const products = [
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/668/original/backpack-transparent-background-with-ai-generative-free-png.png',
        name: 'UrbanTrail Classic 25L Backpack',
        price: 39.99,
        rating: 2.8,
        discount: null,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL: 'https://i.pinimg.com/originals/a4/b0/2d/a4b02dd9c6ec52fe882845b2866c5f2e.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: null,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 1111149.99,
        rating: 4.5,
        discount: 99.99,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
      {
        imageURL:
          'https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png',
        name: 'Comfort Sneakers',
        price: 40.0,
        rating: 4.5,
        discount: 30,
      },
    ]

    return {
      products,
    }
  },
}
</script>
