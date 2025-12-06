<template>
    <!-- Overall Rating (4.0 + Stars + Reviews) -->
    <div class="flex flex-col justify-start space-y-1 m-5">
        <h2 class="text-[20px]">Overall product rating</h2>
        <div class="flex items-center">
            <h2 class="text-[96px]">4.0</h2>

            <div class="ml-5">
                <!-- Stars Row -->
                <div class="flex text-[#FF6B6B] text-2xl">
                    ★★★★☆
                </div>

                <!-- Reviews Count -->
                <span class="text-gray-600 text-sm">150 reviews</span>                 
            </div>

           
        </div>

        <!-- Recommendation Line -->
        <span class="text-gray-600 text-[14px] mt-1">
            140 out of 150 recommend this product
        </span>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'product-rating-component',
    }
</script>