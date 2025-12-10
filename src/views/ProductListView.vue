<template>
    <!-- Header --> 
    <div class="h-40 border-b fixed top-0 w-full z-50 bg-white"></div>

    <!-- Body -->
    <div class="flex ... pt-40"> 
        <!-- ✨ Added pt-40 so the header won’t cover content -->

        <div class="w-1/20"></div>

        <div class="w-18/20 relative ...">

            <div>
                <h1 class="text-[20px] my-5 ...">
                    Home / Products
                </h1>
            </div>

            <div class="grid grid-cols-5 gap-4 ...">

                <!-- Category -->
                <div class="col-span-1 mb-20 ...">
                    <div class="sticky top-50">

                        <h1 class="text-[20px] font-semibold mb-5">Category</h1>
                        <!-- Category component -->
                        <CategoryComponent :categories="categories" @update="onCategoryChange"/>

                        <!-- Price Range -->
                        <PriceRangeSlider :products="products" @update:maxPrice="onPriceChange"/>

                        <div class="mb-10 mt-5">
                            <h1 class="text-[20px] font-semibold mb-5">Customer Review</h1>
                            <star-category-component :rating-options="ratingOptions" @update="onRatingChange" />
                        </div>
                    </div>

                </div>

                <!-- Product List -->
                <div class="col-start-2 col-end-6 ...">

                    <div class="flex justify-between mb-10 items-baseline">
                        <h1 class="text-[20px]"><a class="text-[#FF6B6B] font-semibold">{{selectedCategory || ''}}</a> This is what you’re looking for.</h1>
                        <p class="text-[16px] font-light">{{ filteredProducts.length }} items</p>
                    </div>

                    <div class="min-h-[70%] flex justify-center items-center">
                        <!-- Show message if no products found -->
                        <div v-if="filteredProducts.length === 0" class="text-center">
                            <img src="/src/assets/images/no-product-found.png" alt="No products" class="mx-auto w-[430px] h-[430px] mb-4" />
                            <p class="text-[24px] font-medium text-[#BFBFBF]">Oops! No items match your search.</p>
                        </div>

                        <!-- Show products if available -->
                        <product-card-component v-else :products="paginatedProducts" />                        
                    </div>

                    <!-- Pagination: only show if there are products -->
                    <Pagination v-if="totalPages > 0" v-model:current="page" :total="totalPages" />

                </div>


            </div>
        </div>

        <div class="w-1/20"></div>
    </div>
    <!-- Footer -->
    <div class="h-[455px] bg-[#1A535C]  w-full"></div>
</template>


<script lang="ts">
import CategoryComponent from '@/components/Product LIst/category-component.vue';
import Pagination from '@/components/Product LIst/pagination.vue';
import PriceRangeSlider from '@/components/Product LIst/price-range-slider.vue';
import StarCategoryComponent from '@/components/Product LIst/star-category-component.vue';
import ProductCardComponent from '@/components/product-card-component.vue';
import { ref, computed } from "vue";

export default {
    name: 'product-list-view',

    components: {
        ProductCardComponent,
        CategoryComponent,
        StarCategoryComponent,
        Pagination,
        PriceRangeSlider
    },

    data() {
        return {

        };
    },

    setup(){
        const products = [
            {
                image: "https://pngimg.com/d/pen_PNG7404.png",
                name: "UrbanTrail Classic 25L Backpack",
                price: 39.99,
                rating: 2.8,
                discount: null,
                group: "Writing Instruments"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/045/649/636/original/blue-notebook-on-transparent-background-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30,
                group: "Paper Products"
            },
            {
                image: "https://cdn.pixabay.com/photo/2018/09/21/17/05/pens-3693522_960_720.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Art & Craft Supplies"
            },
            {
                image: "https://th.bing.com/th/id/R.5420809975318eff018f4ada0099571c?rik=2fntAFhFGHmSOA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f04%2fBackpack-PNG.png&ehk=5dco3F7ACS81%2bzR3aMjW3QN3Vz%2frB41ORW21GBZZFMM%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Organization & Storage"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/668/large_2x/backpack-transparent-background-with-ai-generative-free-png.png",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "School Bags & Carriers"
            },
            {
                image: "https://th.bing.com/th/id/R.fa8dc10ff326af8f103506d6dc342352?rik=j4ULR70wcQ0ecA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fscissors-hd-png-scissors-png-image-2747.png&ehk=x5UBSsR62ca7d2NHGa4a8dPTNXMAA0R9C4gbEQQc7N0%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Classroom & Teaching Supplies"
            },
            {
                image: "https://pictures.abebooks.com/inventory/31813701922.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Books & Learning Materials"
            },
            {
                image: "https://pngimg.com/d/pen_PNG7404.png",
                name: "UrbanTrail Classic 25L Backpack",
                price: 39.99,
                rating: 2.8,
                discount: null,
                group: "Writing Instruments"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/045/649/636/original/blue-notebook-on-transparent-background-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30,
                group: "Paper Products"
            },
            {
                image: "https://cdn.pixabay.com/photo/2018/09/21/17/05/pens-3693522_960_720.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Art & Craft Supplies"
            },
            {
                image: "https://th.bing.com/th/id/R.5420809975318eff018f4ada0099571c?rik=2fntAFhFGHmSOA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f04%2fBackpack-PNG.png&ehk=5dco3F7ACS81%2bzR3aMjW3QN3Vz%2frB41ORW21GBZZFMM%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Organization & Storage"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/668/large_2x/backpack-transparent-background-with-ai-generative-free-png.png",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "School Bags & Carriers"
            },
            {
                image: "https://th.bing.com/th/id/R.fa8dc10ff326af8f103506d6dc342352?rik=j4ULR70wcQ0ecA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fscissors-hd-png-scissors-png-image-2747.png&ehk=x5UBSsR62ca7d2NHGa4a8dPTNXMAA0R9C4gbEQQc7N0%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Classroom & Teaching Supplies"
            },
            {
                image: "https://pictures.abebooks.com/inventory/31813701922.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Books & Learning Materials"
            },
            {
                image: "https://pngimg.com/d/pen_PNG7404.png",
                name: "UrbanTrail Classic 25L Backpack",
                price: 39.99,
                rating: 2.8,
                discount: null,
                group: "Writing Instruments"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/045/649/636/original/blue-notebook-on-transparent-background-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30,
                group: "Paper Products"
            },
            {
                image: "https://cdn.pixabay.com/photo/2018/09/21/17/05/pens-3693522_960_720.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Art & Craft Supplies"
            },
            {
                image: "https://th.bing.com/th/id/R.5420809975318eff018f4ada0099571c?rik=2fntAFhFGHmSOA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f04%2fBackpack-PNG.png&ehk=5dco3F7ACS81%2bzR3aMjW3QN3Vz%2frB41ORW21GBZZFMM%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Organization & Storage"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/668/large_2x/backpack-transparent-background-with-ai-generative-free-png.png",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "School Bags & Carriers"
            },
            {
                image: "https://th.bing.com/th/id/R.fa8dc10ff326af8f103506d6dc342352?rik=j4ULR70wcQ0ecA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fscissors-hd-png-scissors-png-image-2747.png&ehk=x5UBSsR62ca7d2NHGa4a8dPTNXMAA0R9C4gbEQQc7N0%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Classroom & Teaching Supplies"
            },
            {
                image: "https://pictures.abebooks.com/inventory/31813701922.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Books & Learning Materials"
            },
            {
                image: "https://pngimg.com/d/pen_PNG7404.png",
                name: "UrbanTrail Classic 25L Backpack",
                price: 39.99,
                rating: 2.8,
                discount: null,
                group: "Writing Instruments"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/045/649/636/original/blue-notebook-on-transparent-background-png.png",
                name: "Comfort Sneakers",
                price: 40.0,
                rating: 4.5,
                discount: 30,
                group: "Paper Products"
            },
            {
                image: "https://cdn.pixabay.com/photo/2018/09/21/17/05/pens-3693522_960_720.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Art & Craft Supplies"
            },
            {
                image: "https://th.bing.com/th/id/R.5420809975318eff018f4ada0099571c?rik=2fntAFhFGHmSOA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f04%2fBackpack-PNG.png&ehk=5dco3F7ACS81%2bzR3aMjW3QN3Vz%2frB41ORW21GBZZFMM%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Organization & Storage"
            },
            {
                image: "https://static.vecteezy.com/system/resources/previews/026/792/668/large_2x/backpack-transparent-background-with-ai-generative-free-png.png",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "School Bags & Carriers"
            },
            {
                image: "https://th.bing.com/th/id/R.fa8dc10ff326af8f103506d6dc342352?rik=j4ULR70wcQ0ecA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fscissors-hd-png-scissors-png-image-2747.png&ehk=x5UBSsR62ca7d2NHGa4a8dPTNXMAA0R9C4gbEQQc7N0%3d&risl=&pid=ImgRaw&r=0",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Classroom & Teaching Supplies"
            },
            {
                image: "https://pictures.abebooks.com/inventory/31813701922.jpg",
                name: "Laptop Bag",
                price: 50.0,
                rating: 4.2,
                discount: 10,
                group: "Books & Learning Materials"
            }
        // ...add category/group to every product
        ];

        const categories = [
            "Writing Instruments",
            "Paper Products",
            "Art & Craft Supplies",
            "Organization & Storage",
            "School Bags & Carriers",
            "Classroom & Teaching Supplies",
            "Books & Learning Materials",
        ];

        const ratingOptions = [
            { stars: "★ ★ ★ ★ ★", value: 5.0 },
            { stars: "★ ★ ★ ★ ☆", value: 4.0 },
            { stars: "★ ★ ★ ☆ ☆", value: 3.0 },
            { stars: "★ ★ ☆ ☆ ☆", value: 2.0 },
            { stars: "★ ☆ ☆ ☆ ☆", value: 1.0 },
        ];

        const selectedCategory = ref<string>("");
        const page = ref<number>(1);
        const pageSize = 20;

        function onCategoryChange(cat: string | null) {
            if (cat) {
                selectedCategory.value = cat;
            } else {
                selectedCategory.value = ""; // show all products when unselect
            }
            page.value = 1; // reset pagination
        }

        const selectedRating = ref<number | null>(null);

        function onRatingChange(value: number | null) {
            selectedRating.value = value;
            page.value = 1; // reset pagination
        }

        // Filtered products including rating
    const filteredProducts = computed(() => {
        return products.filter(p => {
            const effectivePrice = p.discount ? p.price * (1 - p.discount / 100) : p.price;

            const matchesCategory = selectedCategory.value === "" || p.group === selectedCategory.value;

            const matchesRating = selectedRating.value === null
            ? true
            : (selectedRating.value === 5
                ? p.rating === 5
                : p.rating >= selectedRating.value && p.rating < selectedRating.value + 1);

            const matchesPrice = maxPrice.value === null ? true : effectivePrice <= maxPrice.value;

            return matchesCategory && matchesRating && matchesPrice;
        });
    });

        // Price Range

        const maxPrice = ref<number | null>(null);

        function onPriceChange(value: number) {
            maxPrice.value = value;
            page.value = 1; // reset pagination
        }

        // Pagination
        const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize));

        const paginatedProducts = computed(() => {
            const start = (page.value - 1) * pageSize;
            const end = start + pageSize;
            return filteredProducts.value.slice(start, end);
        });
        
        return {
            products,
            paginatedProducts,
            page,
            totalPages,
            categories,
            ratingOptions,
            onCategoryChange,
            filteredProducts,
            selectedCategory,
            onRatingChange,
            onPriceChange
        }
    }
}
</script>
