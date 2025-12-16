<template>
    <div class="col-start-5 col-end-7 rounded-md p-6 space-y-6 m-[50px] relative z-30">

        <!-- Product Name -->
        <h1 class="text-[36px] font-bold leading-tight">
            {{ product.name }}
        </h1>

        <!-- Rating + Reviews + Stock -->
        <div class="flex items-center gap-2 text-gray-600 text-sm">
            <div class="flex items-center mb-3 text-[#FF6B6B]">
                <span class="mr-2 font-semibold text-gray-800">{{ product.rating.toFixed(1) }}</span>
                <span class="text-[20px]">
                    <template v-for="n in 5" :key="n">
                        <span v-if="n <= Math.floor(product.rating)">★</span>
                        <span v-else-if="n - product.rating <= 0.9">⯪</span>
                        <span v-else>☆</span>
                    </template>
                </span>
                <span class="text-black">({{ product.reviews }} reviews)</span>
                <span class="mx-1 text-black">|</span>
                <span v-if="product.stock > 0" class="text-green-500 font-medium">{{product.stock}} In Stock</span>
                <span v-else class="text-red-500 font-medium">Out Of Stock</span> 
            </div>
        </div>

        <!-- Price Section -->
        <div class="flex items-stretch ...">
            <div class="text-[48px] text-[#FF383C] leading-none">
                ${{ getDiscountedPrice(product) }}
            </div>
            <div class="flex items-center gap-2 text-gray-500 text-[14px] self-end ml-4 ">
                <span v-if="product.discount !== null && product.discount > 0" class="line-through">${{ product.price.toFixed(2) }}</span>
                <span v-if="product.discount !== null && product.discount > 0" class="text-[#FF383C] font-medium">(-{{product.discount}}%)</span>
            </div>
        </div>

        <div class="w-[90%] h-[1.5px] bg-gray-300"></div>

        <!-- Product Info -->
        <ProductInfoComponent :info="productInfo" />

        <!-- Product Description -->
        <div class="space-y-1">
            <h2 class="text-[32px]">Description</h2>
            <p class="text-[#5E5B5B] text-[20px] leading-relaxed text-balance break-normal">
                {{ product.description }}
            </p>
        </div>

        <div class="w-[90%] h-[1.5px] bg-gray-300"></div>

        <!-- Colour Picker -->
        <div class="flex items-center space-x-3">
            <colour-picker-component :colors="productColors" />
        </div>

        <!-- Quantity + Favorite -->
        <div class="flex items-center w-[90%]">
            <div class="flex items-center">
                    <button
                    class="w-9 h-10 flex justify-center items-center border rounded-l-sm text-lg font-bold hover:bg-[#1A535C] hover:text-white hover:border-[#1A535C]"
                    @click="decrease"
                    >-</button>
                    <span class="h-10 w-15 flex justify-center items-center border-y text-lg font-semibold">{{ quantity }}</span>
                    <button
                    class="w-9 h-10 flex justify-center items-center border rounded-r-sm text-lg font-bold hover:bg-[#1A535C] hover:text-white hover:border-[#1A535C]"
                    @click="increase"
                    >+</button>
            </div>

            <!-- Favorite Button -->
            <button 
                class="w-10 h-10 ml-5 border p-1 rounded-md flex justify-center items-center"
                @click="toggleFavorite"
            >
                <img v-if="!isFavorite" src="/src/assets/images/Heart.png" alt="Favorite" />
                <img v-else src="/src/assets/images/Heart-fill.png" alt="Favorite" />
            </button>
        </div>

        <!-- Add to Cart -->
        <button
            v-if="product.stock > 0"
            @click="addToCart"
            class="w-full h-15 text-white font-semibold rounded-lg text-lg"
            >
            <div v-if="!isInCart" class="bg-[#1A535C] w-full h-full flex justify-center items-center rounded-sm">Add to Cart</div>
            <div v-else class="bg-[#df6868] w-full h-full flex justify-center items-center rounded-sm">Add another cart</div>
        </button>

        <!-- Buy Now -->
        <button v-if="product.stock > 0" class="w-full h-15 text-white font-semibold rounded-lg text-lg">
            <div class="bg-[#1A535C] w-full h-full flex justify-center items-center rounded-sm">Buy Now</div>
        </button>

        <div v-if="product.stock === 0" class="w-full justify-center flex text-[24px] mt-10 text-red-500">
            <h1>This product is out of our stock!!</h1>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import ColourPickerComponent from './colour-picker-component.vue'
    import ProductInfoComponent from './product-info-component.vue'

    export interface Product {
        name: string
        price: number
        rating: number
        reviews: number
        description: string
        discount: number | null
        stock: number
    }

    export default defineComponent({
        name: 'product-detail-card-component',
        components: { ColourPickerComponent, ProductInfoComponent },

        props: {
            product: { type: Object as () => Product, required: true },
            productInfo: { type: Array as () => { label: string; value: string }[], required: true },
            productColors: { type: Array as () => string[], required: true }
        },

        setup(props) {
            const quantity = ref(0)
            const isInCart = ref(false)
            const isFavorite = ref(false)

            const increase = () => {
                if (quantity.value < props.product.stock) quantity.value++
            }

            const decrease = () => {
                if (quantity.value > 0) quantity.value--
            }

            const getDiscountedPrice = (p: Product) => {
                if (!p.discount || p.discount <= 0) return p.price.toFixed(2)
                return (p.price - (p.price * p.discount) / 100).toFixed(2)
            }

            const addToCart = () => {
                if (quantity.value > 0) isInCart.value = true
            }

            const toggleFavorite = () => {
                isFavorite.value = !isFavorite.value
            }

            return {
                quantity, isInCart, isFavorite,
                increase, decrease, addToCart, toggleFavorite,
                getDiscountedPrice
            }
        }
    })
</script>
