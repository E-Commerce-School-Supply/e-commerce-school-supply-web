<template>
    <!-- Header --> 
    <div class="h-40 border-b fixed top-0 w-full z-50 bg-white"></div>
    <!-- Body -->
    <div class="flex pt-40 ...">
        <div class="w-1/20 ..."></div>
        <div class="w-18/20">
            <div>
                <h1 class="text-[20px] my-5 ...">
                    Home / Pen
                </h1>
            </div>
            
            <div class="grid grid-cols-6 gap-4 relative ...">
                <!-- Left sid product -->
                <div class=" grid grid-flow-col grid-rows-4 grid-cols-8 gap-4 col-start-1 col-end-5 h-[600px] sticky top-50 w-25/22 ...">
                    <productImageComponent :images="productImages"/>
                </div>
                
                <!-- right side product -->
                <div class="col-start-5 col-end-7 bg-[#F5F5F5] rounded-md ...">
                    <product-detail-card-component :product="product" :product-info="productInfo" :product-colors="productColors"/>
                </div>
            </div>

            <!-- Review Section -->
            <div class="my-10">
                <h1 class="text-[36px]">Review</h1>
                <h3 class="text-[14px]">Check what our customers think of this product</h3>            
            </div>


            <div class="grid grid-cols-6 gap-4 relative ...">

                <!-- left side review =========================================================================================== -->
                <div class="grid grid-flow-col grid-rows-4 grid-cols-8 col-start-1 col-end-3 h-[600px] sticky top-50">

                    <!-- Top Review Summary -->
                    <div class="row-span-2 row-start-1 col-start-1 col-end-9 bg-[#F5F5F5] rounded-t-md p-6 ">
                        <ProductRatingComponent :rating="product.rating" :reviews="product.reviews" :recommend="product.recommended" />
                    </div>

                    <!-- Bottom Rating Distribution Section -->
                    <div class="row-span-2 row-start-3 col-start-1 col-end-9 bg-[#1A535C] rounded-b-md p-10 text-white ">
                        <rating-graph-component :ratings="ratingData"/>
                    </div>
                </div>


                <!-- right side review -->
                <div class="col-start-3 col-end-7 grid gap-4 ...">
                    <!-- TOP: Write a Review -->
                    <div class="bg-[#F5F5F5] w-full rounded-md p-6 space-y-5">
<write-review-component
  :userReview="userReview"
  :currentUserName="currentUser.name"
  @submit-review="handleSubmitReview"
  @delete-review="handleDeleteReview"
/>
                    </div>

                    <!-- User comment-->
                    <div>
                        <ReviewsComponent :reviews="productReviews" :initial-visible-count="6"/>
                    </div>

                </div>
            </div>

            <div>
                <div class="flex justify-between items-baseline text-[20px]">
                    <h1 class="text-[36px] my-15">More product you may like!!</h1>
                    <p>See All</p>
                </div>
                
                <product-card-component :products="products" />
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
    <!-- Footer -->
    <div class="h-[455px] bg-[#1A535C]  w-full"></div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from "vue";

    import productCardComponent from '@/components/product-card-component.vue';
    import productImageComponent from "@/components/Product Detail/product-image-component.vue";
    import productDetailCardComponent from '@/components/Product Detail/product-detail-card-component.vue';
    import productRatingComponent from '@/components/Product Detail/product-rating-component.vue';
    import ratingGraphComponent, { type RatingItem } from '@/components/Product Detail/rating-graph-component.vue';
    import writeReviewComponent from '@/components/Product Detail/write-review-component.vue';
    import reviewsComponent from '@/components/Product Detail/reviews-component.vue';

    interface Review {
        id: number;
        profile: string;
        name: string;
        title: string;
        body: string;
        rating: number;
        recommend: boolean;
        verified: boolean;
        date: string;
    }

    export default {
        name: "product-detail-view",
        components: {
            ProductCardComponent: productCardComponent,
            ProductImageComponent: productImageComponent,
            ProductDetailCardComponent: productDetailCardComponent,
            ProductRatingComponent: productRatingComponent,
            RatingGraphComponent: ratingGraphComponent,
            WriteReviewComponent: writeReviewComponent,
            ReviewsComponent: reviewsComponent,
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

            // Right side product info, color
            const product = {
                name: 'Pen that make you come to buy',
                price: 25.99,
                rating: 3.23,
                reviews: 150,
                description: 'This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth This high-quality ballpoint pen features smooth',
                discount: 50,
                stock: 10,
                recommended: 140
            }

            const productInfo = [
                { label: 'Author', value: 'George Orwell' },
                { label: 'Pages', value: '328' },
                { label: 'Language', value: 'English' },
                { label: 'ISBN', value: '978-0451524935' }
            ]

            const productColors = ['#1E90FF', '#FF0000', '#000000']

            // Product Images Distplay
            const productImages = [
                '/src/assets/images/image6.png',
                '/src/assets/images/image 7.png',
                '/src/assets/images/image 8.png'
            ]

            // Rating Graph
            const ratingData: RatingItem[] = [
                { stars: 5, count: 130, percentage: 90 },
                { stars: 4, count: 10, percentage: 7 },
                { stars: 3, count: 5, percentage: 3 },
                { stars: 2, count: 0, percentage: 0 },
                { stars: 1, count: 5, percentage: 3 }
            ]

            // Reviews
            const productReviews = ref([
            {
                id: 1,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Lim Kitty",
                rating: 4,
                date: "2025-12-03 11:11",
                title: "Amazing pen!",
                body: "This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!This pen writes very smoothly and feels premium. I love the ink flow and the grip is very comfortable. Highly recommended!",
                recommend: true,
                verified: true
            },
            {
                id: 2,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smiths",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: false,
                verified: true
            },
            {
                id: 3,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 4,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 5,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 6,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 7,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 8,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 9,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 10,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 13:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 11,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 12,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 13,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 14,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 15,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 16,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            {
                id: 17,
                profile: "https://i.pinimg.com/736x/e5/e6/ad/e5e6add55f04938dd8dcf271fab0b8d0.jpg",
                name: "Jane Smith",
                rating: 5,
                date: "2025-12-02 14:22",
                title: "Excellent product!",
                body: "I love this pen! Great quality and writes perfectly.",
                recommend: true,
                verified: true
            },
            // Add as many reviews as needed
            ]);

            const currentUser = {
                name: "Yagami"
            };

            const userReview = ref<Review | null>(null);

            const handleSubmitReview = (review: Review) => {
                userReview.value = review;
            };

            const handleDeleteReview = () => {
                userReview.value = null;
            };
            
            return {
                products,
                product,
                productInfo,
                productColors,
                productImages,
                ratingData,
                productReviews,
                handleSubmitReview,
                handleDeleteReview,
                currentUser,
                userReview

            }
        }
    }
</script>