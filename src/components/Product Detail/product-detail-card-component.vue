<template>
    <div class="col-start-5 col-end-7 rounded-md p-6 space-y-6 m-[50px] relative z-30">

        <!-- Product Name -->
        <h1 class="text-[36px] font-bold leading-tight">
            Pen that make you come to buy
        </h1>

        <!-- Rating + Reviews + Stock -->
        <div class="flex items-center gap-2 text-gray-600 text-sm">
            <!-- Stars -->
            <div class="flex text-[20px] text-[#FF6B6B]">
                ★ ★ ★ ★ ★
            </div>

            <span>(150 reviews)</span>
            <span class="mx-1">|</span>
            <span class="text-green-500 font-medium">In Stock</span>
        </div>

        <!-- Price Section -->
        <div class="flex items-stretch ...">
            <div class="text-[48px] text-[#FF383C] leading-none">
                $12.99
            </div>

            <div class="flex items-center gap-2 text-gray-500 text-[14px] self-end ml-4 ">
                <span class="line-through">$25.99</span>
                <span class="text-[#FF383C] font-medium">(-50%)</span>
            </div>
        </div>

        <!-- Divider Line -->
        <div class="w-[90%] h-[1.5px] bg-gray-300"></div>

        <!-- Product Info -->
        <div class="space-y-2 text-[16px] leading-tight">
            <h2 class="text-[32px]">Product Info</h2>
            <div class="flex">
                <span class="font-semibold w-32">Pen type:</span>
                <span>Ballpoint</span>
            </div>
            <div class="flex">
                <span class="font-semibold w-32">Tip size:</span>
                <span>0.5 mm</span>
            </div>
            <div class="flex">
                <span class="font-semibold w-32">Ink type:</span>
                <span>Gel Ink</span>
            </div>
        </div>

        <!-- Product Description -->
        <div class="space-y-1">
            <h2 class="text-[32px]">Description</h2>
            <p class="text-[#5E5B5B] text-[20px] leading-relaxed text-balance break-normal">
                This high-quality ballpoint pen features smooth,
                consistent ink flow and a comfortable grip,
                making it perfect for everyday writing.
                Designed with a durable tip and quick-dry ink,
                it helps prevent smudging and ensures clean, neat handwriting.
                Ideal for students, office workers, and anyone who writes regularly.
            </p>
        </div>

        <!-- Divider Line -->
        <div class="w-[90%] h-[1.5px] bg-gray-300"></div>

        <!-- Colour Picker -->
        <div class="flex items-center space-x-3">
            <colour-picker-component :colors="productColors" />
        </div>

        <!-- Quantity + Favorite -->
        <div class="flex items-center w-[90%]">

            <!-- Amount Selector -->
    <div class="flex items-center">
        <!-- Minus Button -->
        <button
            class="w-9 h-10 flex justify-center items-center border rounded-l-sm text-lg font-bold hover:bg-[#1A535C] hover:text-white hover:border-[#1A535C]"
            @click="decrease"
        >
            -
        </button>

        <!-- Number Display -->
        <span
            class="h-10 w-15 flex justify-center items-center border-y-1 text-lg font-semibold"
        >
            {{ quantity }}
        </span>

        <!-- Plus Button -->
        <button
            class="w-9 h-10 flex justify-center items-center border rounded-r-sm text-lg font-bold hover:bg-[#1A535C] hover:text-white hover:border-[#1A535C]"
            @click="increase"
        >
            +
        </button>
    </div>

            <!-- Favorite Button -->
            <button class="w-10 h-10 ml-5">
                <img src="/src/assets/images/add to favorite.png" alt="">
            </button>
        </div>

        <!-- Add to Cart -->
        <button class="w-full py-3 bg-[#1A535C] text-white font-semibold rounded-lg text-lg">
            Add to Cart
        </button>

        <!-- Buy Now -->
        <button class="w-full py-3 bg-[#1A535C] text-white font-semibold rounded-lg text-lg">
            Buy Now
        </button>

    </div>
</template>

<script lang="ts">
    
    import { ref } from 'vue';
    import ColourPickerComponent from './colour-picker-component.vue';

    export default{
        name: "product-info-component",
        components: {
            ColourPickerComponent
        },
        data() {
            return{
                productColors: ["#1E90FF", "#FF0000", "#000000"]
            }
        },

        setup() {
            const quantity = ref(1);

            const increase = () => {
                quantity.value++;
            };

            const decrease = () => {
                if (quantity.value > 1) {
                    quantity.value--;
                }
            };

            return {
                quantity,
                increase,
                decrease
            };
        }
    }
</script>