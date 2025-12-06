<template>
    <h3 class="text-xl font-bold mb-4">Rating</h3>

    <!-- Rating Bars -->
    <div class="space-y-1">

        <!-- 5 Stars -->
        <div class="flex items-center gap-3">
            <span class="w-3 text-sm font-medium">5</span>
            <span class="text-[#FF6B6B] text-[20px]">★</span>
            <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
                <div class="h-full bg-[#FF6B6B] rounded-md w-[90%]"></div>
            </div>
            <span class="w-8 text-right text-sm">130</span>
        </div>

        <!-- 4 Stars -->
        <div class="flex items-center gap-3">
            <span class="w-3 text-sm font-medium">4</span>
            <span class="text-[#FF6B6B] text-[20px]">★</span>
            <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
                <div class="h-full bg-[#FF6B6B] rounded-md" style="width: 7%;"></div>
            </div>
            <span class="w-8 text-right text-sm">10</span>
        </div>

        <!-- 3 Stars -->
        <div class="flex items-center gap-3">
            <span class="w-3 text-sm font-medium">3</span>
            <span class="text-[#FF6B6B] text-[20px]">★</span>
            <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
                <div class="h-full bg-[#FF6B6B] rounded-md" style="width: 3%;"></div>
            </div>
            <span class="w-8 text-right text-sm">5</span>
        </div>

        <!-- 2 Stars -->
        <div class="flex items-center gap-3">
            <span class="w-3 text-sm font-medium">2</span>
            <span class="text-[#FF6B6B] text-[20px]">★</span>
            <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
                <div class="h-full bg-[#FF6B6B] rounded-md" style="width: 100%;"></div>
            </div>
            <span class="w-8 text-right text-sm">0</span>
        </div>

        <!-- 1 Star -->
        <div class="flex items-center gap-3">
            <span class="w-3 text-sm font-medium">1</span>
            <span class="text-[#FF6B6B] text-[20px]">★</span>
            <div class="flex-1 h-4 bg-gray-300 rounded-md overflow-hidden">
                <div class="h-full bg-[#FF6B6B] rounded-md" style="width: 3%;"></div>
            </div>
            <span class="w-8 text-right text-sm">5</span>
        </div>

    </div>
</template>

<script lang="ts">
    export default{
        name: "rating-graph-component"
    }
</script>