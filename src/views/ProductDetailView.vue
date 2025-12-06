<template>
    <div class="flex ...">
        <div class="w-1/20 ..."></div>
        <div class="w-18/20">
            <div>
                <h1 class="text-[20px] my-15 ...">
                    Home / Pen
                </h1>
            </div>
            
            <div class="grid grid-cols-6 gap-4 relative ...">
                <!-- Left sid product -->
                <div class=" grid grid-flow-col grid-rows-4 grid-cols-8 gap-4 col-start-1 col-end-5 h-[600px] sticky top-0 w-25/22 ...">
                    <productImageComponent :images="images"/>
                </div>
                
                <!-- right side product -->
                <div class="col-start-5 col-end-7 bg-[#F5F5F5] rounded-md ...">
                    <product-detail-card-component />
                </div>
            </div>

            <!-- Review Section -->
            <div class="my-10">
                <h1 class="text-[36px]">Review</h1>
                <h3 class="text-[14px]">Check what our customers think of this product</h3>            
            </div>


            <div class="grid grid-cols-6 gap-4 relative ...">

                <!-- left side review =========================================================================================== -->
                <div class="grid grid-flow-col grid-rows-4 grid-cols-8 col-start-1 col-end-3 h-[600px] sticky top-0">

                    <!-- Top Review Summary -->
                    <div class="row-span-2 row-start-1 col-start-1 col-end-9 bg-[#F5F5F5] rounded-t-md p-6 ">
                        <product-rating-component />
                    </div>

                    <!-- Bottom Rating Distribution Section -->
                    <div class="row-span-2 row-start-3 col-start-1 col-end-9 bg-[#1A535C] rounded-b-md p-10 text-white ">
                        <rating-graph-component />
                    </div>
                </div>


                <!-- right side review -->
                <div class="col-start-3 col-end-7 grid gap-4 ...">
                    <!-- TOP: Write a Review -->
                    <div class="bg-[#F5F5F5] w-full rounded-md p-6 space-y-5">
                        <write-review-component />
                    </div>

                    <!-- User comment-->
                    <div>
                        <ReviewsComponent />
                    </div>

                </div>
            </div>

            <div>
                <h1 class="text-[36px] my-15">More product you may like!!</h1>

                <div class="flex flex-wrap gap-12">
                    <!-- Use your ProductCard component -->
                    <product-card-component :products="products" />
                </div>                 
            </div>

            <!-- Contact -->
            <div class="flex flex-col items-center my-20 ...">
                <h1 class="text-[24px] text-[#1A535C] mb-10">Have any problem with this product?</h1>
                <button class="w-[216px] h-[60px] bg-[#1A535C] rounded-sm text-white text-[16px]">
                    Contact
                </button>
            </div>
   
        </div>
        <div class="w-1/20 ..."></div>
    </div>

</template>

<script lang="ts">

    import productCardComponent from '@/components/product-card-component.vue';
    import productImageComponent from "@/components/Product Detail/product-image-component.vue";
    import productDetailCardComponent from '@/components/Product Detail/product-detail-card-component.vue';
    import productRatingComponent from '@/components/Product Detail/product-rating-component.vue';
    import ratingGraphComponent from '@/components/Product Detail/rating-graph-component.vue';
    import writeReviewComponent from '@/components/Product Detail/write-review-component.vue';
    import reviewsComponent from '@/components/Product Detail/reviews-component.vue';

    export default {
        name: "product-detail-view",
        components: {
            ProductCardComponent: productCardComponent,
            ProductImageComponent: productImageComponent,
            ProductDetailCardComponent: productDetailCardComponent,
            ProductRatingComponent: productRatingComponent,
            RatingGraphComponent: ratingGraphComponent,
            WriteReviewComponent: writeReviewComponent,
            ReviewsComponent: reviewsComponent
        },

        data() {
            return{
                images:[
                    '/src/assets/images/image6.png',
                    '/src/assets/images/image 7.png',
                    '/src/assets/images/image 8.png'
                ]
            }
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
                price: 1111149.99,
                rating: 4.5,
                discount: 99.99
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