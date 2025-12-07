<template>
    <div class="flex ...">
        <div class="w-1/20"></div>
        <div class="w-18/20">
            <product-card-component :products="products" />
        </div>
        <div class="1/20"></div>
    </div>

</template>


<script lang="ts">
    import productCardComponent from '@/components/product-card-component.vue';
    export default {
        name: "HomeView",
        components: {
            ProductCardComponent: productCardComponent
        },

        setup(){
            const products = [
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/668/original/backpack-transparent-background-with-ai-generative-free-png.png",
                name: "UrbanTrail Classic 25L Backpack",
                price: 39.99,
                rating: 2.8,
                discount: null
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://i.pinimg.com/originals/a4/b0/2d/a4b02dd9c6ec52fe882845b2866c5f2e.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: null
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 39.99,
                rating: 4.5,
                discount: 80
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/661/original/backpack-bag-transparent-background-ai-generative-free-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30
            }
            ];
            
            return {
                products
            }
        }
    }
</script>

