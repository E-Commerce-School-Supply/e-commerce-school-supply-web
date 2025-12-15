<script setup>
import { onMounted, ref, computed, nextTick } from 'vue' // Added nextTick
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

// --- AUTH STORE ---
const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

// --- STATE MANAGEMENT ---
const cartCount = ref(0);
const wishlistCount = ref(0);
const activeFilter = ref('All');
const searchQuery = ref('');
const headerEmail = ref('');
const footerEmail = ref('');
const isSearchFocused = ref(false);
const guestMode = ref(sessionStorage.getItem('guestMode') === 'true');
const showAuthPrompt = ref(false);
const activeAuthTab = ref('signin');

// --- AUTH HELPERS ---
const isAuthenticated = computed(() => !!authStore.user)
const displayName = computed(() => {
    if (isAuthenticated.value && authStore.user) return authStore.user.username || authStore.user.email || 'User'
    if (guestMode.value) return 'Guest'
    return 'Not signed in'
})
const displayEmail = computed(() => {
    if (isAuthenticated.value && authStore.user) return authStore.user.email || 'Signed in'
    if (guestMode.value) return 'Browsing as guest'
    return 'Please sign in'
})

const handleSignOut = () => {
    authStore.logout()
    guestMode.value = false
}

const navigateToCart = () => {
    router.push({ name: 'cart' })
}

const addToCart = async (product) => {
    if (!isAuthenticated.value) {
        // Prompt sign-in/register for guests and signed-out users
        activeAuthTab.value = 'signin'
        showAuthPrompt.value = true
        return
    }

    try {
        await cartStore.addToCart({
            productId: product.id,
            name: product.name,
            itemNo: product.id,
            brand: product.brand || 'TovRean',
            color: 'Standard',
            rating: product.rating || 4.5,
            price: parseFloat(product.price.replace('$', '')),
            quantity: 1,
            image: product.image,
        });
        cartCount.value++;
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

const addToWishlist = () => {
    wishlistCount.value++;
};

const setFilter = (filterName) => {
    activeFilter.value = filterName;
};

const goToAuthPage = (tab = 'signin') => {
    activeAuthTab.value = tab
    router.push({ name: tab === 'signup' ? 'signup' : 'signin' })
}

const closeAuthPrompt = () => {
    showAuthPrompt.value = false
}

const handleShopNavigation = (event) => {
    if (!isAuthenticated.value) {
        event.preventDefault()
        activeAuthTab.value = 'signin'
        showAuthPrompt.value = true
    }
}

// --- DATA: PRODUCTS FROM BACKEND ---
const salesProducts = ref([]);
const carouselProducts = ref([]);
const loading = ref(false);

const loadProducts = async () => {
    loading.value = true;
    try {
        await productStore.fetchProducts();
        const backendProducts = productStore.products;

        // Map first 5 products for sales section
                salesProducts.value = backendProducts.slice(0, 5).map((product, index) => ({
            id: product.id || (100 + index),
            name: product.name,
            brand: product.brandName || 'TovRean',
                    price: `$${product.price.toFixed(2)}`,
            oldPrice: product.discount ? `$${(product.price / (1 - product.discount / 100)).toFixed(2)}` : null,
            image: product.imageUrl || '/Photo/ourproduct.png',
            type: index === 2 ? 'featured' : 'grid',
            desc: index === 2 ? product.description : undefined
                    ,
                    stockQuantity: product.stockQuantity ?? 0,
                    status: product.status || (product.stockQuantity && product.stockQuantity > 0 ? 'In Stock' : 'Out of stock')
        }));

        // Map products for carousel section
                carouselProducts.value = backendProducts.slice(0, 5).map((product, index) => ({
            id: product.id || (index + 1),
            name: product.name,
                    price: `$${product.price.toFixed(2)}`,
            image: product.imageUrl || '/Photo/ourproduct.png',
            rating: 4 + (index % 2), // Alternating 4 and 5 star ratings
            tags: index % 2 === 0 ? ['popular', 'latest'] : ['latest']
                    ,
                    stockQuantity: product.stockQuantity ?? 0,
                    status: product.status || (product.stockQuantity && product.stockQuantity > 0 ? 'In Stock' : 'Out of stock')
        }));
    } catch (error) {
        console.error('Failed to load products:', error);
        // Keep empty arrays if failed
    } finally {
        loading.value = false;
    }
};

// --- SEARCH & NAVIGATION LOGIC ---
const allProducts = computed(() => [...salesProducts.value, ...carouselProducts.value]);

const searchResults = computed(() => {
    if (!searchQuery.value) return [];
    const query = searchQuery.value.toLowerCase();
    return allProducts.value.filter(product =>
        product.name.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query))
    );
});

const goToProduct = async (product) => {
    // 1. Close the search dropdown
    isSearchFocused.value = false;
    searchQuery.value = ''; // Optional: Clear text

    // 2. If it's a carousel product, ensure filters don't hide it
    const isCarouselItem = carouselProducts.value.some(p => p.id === product.id);
    if (isCarouselItem) {
        activeFilter.value = 'All';
        // Wait for Vue to update the DOM (re-render the list)
        await nextTick();
    }

    // 3. Find the element by ID and Scroll to it
    const elementId = `product-${product.id}`;
    const element = document.getElementById(elementId);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 4. Add a temporary highlight effect (Red ring flash)
        element.classList.add('ring-4', 'ring-[#EF4444]', 'transition-all', 'duration-500');
        setTimeout(() => {
            element.classList.remove('ring-4', 'ring-[#EF4444]');
        }, 2000); // Remove effect after 2 seconds
    }
};

// --- SUBSCRIPTION LOGIC ---
const handleFooterSubscribe = () => {
    if (!footerEmail.value || !footerEmail.value.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }
    alert(`Thank you! ${footerEmail.value} has been subscribed to our newsletter.`);
    footerEmail.value = '';
};

const handleHeaderSubscribe = () => {
    if (!headerEmail.value || !headerEmail.value.includes('@')) {
        alert("Please enter a valid email address.");
        return;
    }
    alert(`Discount code sent to ${headerEmail.value}!`);
    headerEmail.value = '';
};

// --- CAROUSEL SCROLL LOGIC ---
const productScrollContainer = ref(null);

const scrollLeft = () => {
    if (productScrollContainer.value) {
        productScrollContainer.value.scrollBy({ left: -320, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (productScrollContainer.value) {
        productScrollContainer.value.scrollBy({ left: 320, behavior: 'smooth' });
    }
};

// --- FILTERING LOGIC ---
const filteredProducts = computed(() => {
    if (activeFilter.value === 'All') {
        return carouselProducts.value;
    } else if (activeFilter.value === 'Latest') {
        return carouselProducts.value.filter(product => product.tags.includes('latest'));
    } else if (activeFilter.value === 'Popular') {
        return carouselProducts.value.filter(product => product.tags.includes('popular'));
    }
    return carouselProducts.value;
});

// --- TEXT CONTENT ---
const text = {
    announcement: "Black Friday Sale For All Pen and Book - OFF 50%!",
    shopNow: "ShopNow",
    home: "Home",
    new: "New",
    promotion: "Promotion",
    category: "Category",
    searchPlaceholder: "What are you looking for?",
    dashboard: "Dashboard",
    settings: "Settings",
    signOut: "Sign out",
    heroTitle: "Everything You Need for a Successful School Year",
    heroSubtitle: "Quality school supplies designed to support learning, creativity, and everyday classroom needs.",
    heroButton: "Shop Now",
    sectionTitle: "Discover Best Sale Product",
    featureTitle: "FlexiNote Spiral Notebook",
    featureDesc: "A durable spiral notebook with smooth, bleed-resistant pages. Perfect for school, office, or daily notes.",
    featureBrand: "Made By NoteMaster",
    featurePrice: "Only $2.99",
    featureButton: "Shop Now",
    ourProductTitle: "Our Product",
    filterAll: "All",
    filterLatest: "Latest",
    filterPopular: "Popular"
};

onMounted(() => {
    initFlowbite();
    loadProducts();
})
</script>

<template>
    <div class="font-sans antialiased text-gray-900 bg-white" @click="isSearchFocused = false">

        <header class="sticky top-0 z-50 w-full">
            <div class="bg-[#114B5F] text-white text-[10px] md:text-xs py-2 px-4 relative">
                <div class="max-w-screen-xl mx-auto flex justify-center items-center">
                    <div class="text-center flex gap-2">
                        <span class="opacity-95 font-light tracking-wide">{{ text.announcement }}</span>
                        <a href="/product-list" @click="handleShopNavigation" class="font-bold underline hover:text-gray-200 cursor-pointer">{{ text.shopNow }}</a>
                    </div>
                </div>
            </div>

            <nav class="bg-white border-b border-gray-200 w-full shadow-sm">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-6 lg:px-8">
                    <router-link to="/" class="flex items-center text-2xl font-bold tracking-tight shrink-0">
                        <span class="text-[#EF4444]">Tov</span><span class="text-gray-900">Rean</span>
                    </router-link>
                    <div class="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-gray-600 font-medium text-[16px]">
                        <router-link to="/" class="text-[#114B5F] font-bold">{{ text.home }}</router-link>
                        <a href="#carousel-section" class="hover:text-[#114B5F] transition-colors cursor-pointer">{{ text.new }}</a>
                        <a href="#promotion-section" class="hover:text-[#114B5F] transition-colors">{{ text.promotion }}</a>
                        <a href="/product-list" @click="handleShopNavigation" class="hover:text-[#114B5F] transition-colors cursor-pointer">{{ text.category }}</a>
                    </div>
                    <div class="flex items-center space-x-4 md:order-2">

                        <div class="hidden md:flex relative" @click.stop>
                            <input
                                type="text"
                                v-model="searchQuery"
                                @focus="isSearchFocused = true"
                                :placeholder="text.searchPlaceholder"
                                class="bg-gray-100 text-sm rounded-full px-5 py-2.5 w-64 focus:outline-none focus:ring-1 focus:ring-[#114B5F] border-none placeholder-gray-500"
                            >
                            <button class="absolute right-3 top-2.5 text-gray-500 hover:text-[#114B5F]">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>

                            <div v-if="isSearchFocused && searchQuery" class="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                                <ul v-if="searchResults.length > 0" class="max-h-60 overflow-y-auto">
                                    <li
                                        v-for="item in searchResults"
                                        :key="item.id"
                                        @click="goToProduct(item)"
                                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                                    >
                                        <img :src="item.image" class="w-8 h-8 object-contain">
                                        <div>
                                            <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                                            <p class="text-xs text-gray-500">{{ item.price }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
                                    No products found.
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center space-x-3">
                            <button @click="addToWishlist" class="text-gray-800 hover:text-[#EF4444] transition hidden sm:block relative">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">{{ wishlistCount }}</span>
                            </button>

                            <button @click="navigateToCart" class="text-gray-800 hover:text-[#114B5F] relative transition">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">{{ cartCount }}</span>
                            </button>

                            <div class="hidden md:block text-right leading-tight mr-2">
                                <p class="text-[11px] text-gray-500">Currently</p>
                                <p class="text-sm font-semibold text-gray-800">{{ displayName }}</p>
                            </div>

                            <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-9 h-9 rounded-full object-cover border border-gray-200" src="/Photo/MyProfile.JPG" alt="user photo">
                            </button>
                            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44" id="user-dropdown">
                                <div class="px-4 py-3">
                                    <span class="block text-sm text-gray-900">{{ displayName }}</span>
                                    <span class="block text-sm text-gray-500 truncate">{{ displayEmail }}</span>
                                </div>
                                <ul class="py-2" aria-labelledby="user-menu-button">
                                    <template v-if="isAuthenticated">
                                        <li><router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ text.dashboard }}</router-link></li>
                                        <li><router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ text.settings }}</router-link></li>
                                        <li><a @click.prevent="handleSignOut" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{{ text.signOut }}</a></li>
                                    </template>
                                    <template v-else>
                                        <li><button @click="goToAuthPage('signin')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign in</button></li>
                                        <li><button @click="goToAuthPage('signup')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</button></li>
                                    </template>
                                </ul>
                            </div>
                            <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="hidden w-full md:hidden border-t border-gray-100" id="navbar-user">
                    <ul class="flex flex-col font-medium p-4 bg-gray-50 space-y-2">
                        <li><router-link to="/" class="block py-2 px-3 text-white bg-[#EF4444] rounded" aria-current="page">{{ text.home }}</router-link></li>
                        <li><a href="#carousel-section" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer">{{ text.new }}</a></li>
                        <li><a href="#promotion-section" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">{{ text.promotion }}</a></li>
                        <li><a href="/product-list" @click="handleShopNavigation" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer">{{ text.category }}</a></li>
                        <li class="mt-2 pt-2 border-t border-gray-200">
                            <input type="text" v-model="searchQuery" :placeholder="text.searchPlaceholder" class="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#114B5F] focus:border-[#114B5F] block p-2.5">
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <section class="bg-gray-50 py-4 lg:py-9 overflow-hidden relative">
            <div class="grid max-w-screen-xl px-4 mx-auto lg:gap-16 xl:gap-24 lg:grid-cols-12 items-center">
                <div class="mr-auto place-self-center lg:col-span-6 z-10 text-center lg:text-left">
                    <h1 class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-tight md:text-3xl xl:text-4xl text-[#114B5F]">
                        {{ text.heroTitle }}
                    </h1>
                    <p class="max-w-xl mb-6 font-light text-gray-600 text-sm md:text-base leading-relaxed mx-auto lg:mx-0">
                        {{ text.heroSubtitle }}
                    </p>
                    <a href="/product-list" @click="handleShopNavigation" class="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-center text-white rounded-lg bg-[#114B5F] hover:bg-[#0d3a4b] focus:ring-4 focus:ring-blue-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer">
                        {{ text.heroButton }}
                    </a>
                </div>
                <div class="hidden lg:mt-0 lg:col-span-6 lg:flex justify-end relative">
                    <div class="absolute bg-white rounded-full h-[500px] w-[500px] -z-10 top-1/2 right-0 transform -translate-y-1/2 scale-90 opacity-50 shadow-sm"></div>
                    <img src="/Photo/Logo.JPG" alt="School Supplies" class="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl rounded-xl">
                </div>
                 <div class="lg:hidden mt-8 flex justify-center relative w-full">
                     <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="School Supplies" class="relative z-10 w-full max-w-md rounded-lg shadow-lg">
                </div>
            </div>
        </section>

        <section class="pt-12 pb-8 bg-white">
            <div class="max-w-screen-xl mx-auto px-4 text-center">
                <h2 class="text-2xl md:text-3xl font-bold text-[#114B5F] mb-3">{{ text.sectionTitle }}</h2>
                <div class="w-20 h-1 bg-[#EF4444] mx-auto rounded-full"></div>
            </div>
        </section>

        <section class="pb-16 bg-white">
            <div class="max-w-screen-xl mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                    <div class="space-y-6 flex flex-col justify-between">
                        <div v-for="product in salesProducts.slice(0, 2)" :key="product.id" :id="'product-'+product.id" class="relative bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100">
                            <div v-if="(product.stockQuantity ?? 0) <= 0" class="absolute top-3 left-3 bg-red-600 text-white text-[12px] px-2 py-1 rounded">Out of stock</div>
                            <div class="bg-gray-100 rounded-lg p-6 mb-4 flex justify-center">
                                <img :src="product.image" :alt="product.name" class="h-32 object-contain mix-blend-multiply">
                            </div>
                            <h3 class="font-bold text-gray-900 text-sm mb-1">{{ product.name }}</h3>
                            <p class="text-xs text-gray-500 mb-2">{{ product.brand }}</p>
                            <p class="font-bold text-gray-900 text-sm">{{ product.price }}</p>
                        </div>
                    </div>

                    <div v-if="salesProducts[2]" :id="'product-'+salesProducts[2].id" class="relative bg-white rounded-xl p-6 shadow-lg border-2 border-blue-400 flex flex-col h-full">
                        <div v-if="(salesProducts[2].stockQuantity ?? 0) <= 0" class="absolute top-4 left-4 bg-red-600 text-white text-[12px] px-3 py-1 rounded">Out of stock</div>
                        <div class="bg-gray-100 rounded-lg p-8 mb-6 flex-grow flex items-center justify-center">
                            <img :src="salesProducts[2].image" :alt="salesProducts[2].name" class="h-64 object-contain mix-blend-multiply transform -rotate-12">
                        </div>
                        <div class="mt-auto">
                            <h3 class="font-bold text-gray-900 text-lg mb-1">{{ salesProducts[2].name }}</h3>
                            <p class="text-xs text-gray-500 mb-3">{{ salesProducts[2].brand }}</p>
                            <p class="text-sm text-gray-600 mb-4 leading-relaxed">{{ salesProducts[2].desc }}</p>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-xl text-gray-900">{{ salesProducts[2].price }}</span>
                                <span class="text-sm text-gray-400 line-through">{{ salesProducts[2].oldPrice }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6 flex flex-col justify-between">
                        <div v-for="product in salesProducts.slice(3, 5)" :key="product.id" :id="'product-'+product.id" class="relative bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100">
                            <div v-if="(product.stockQuantity ?? 0) <= 0" class="absolute top-3 left-3 bg-red-600 text-white text-[12px] px-2 py-1 rounded">Out of stock</div>
                            <div class="bg-gray-100 rounded-lg p-6 mb-4 flex justify-center">
                                <img :src="product.image" :alt="product.name" class="h-32 object-contain mix-blend-multiply">
                            </div>
                            <h3 class="font-bold text-gray-900 text-sm mb-1">{{ product.name }}</h3>
                            <p class="text-xs text-gray-500 mb-2">{{ product.brand }}</p>
                            <p class="font-bold text-gray-900 text-sm">{{ product.price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-gray-50 py-16 lg:py-20">
            <div class="max-w-screen-xl mx-auto px-4">
                <div class="bg-[#F9FAFB] rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12">

                    <div class="w-full md:w-1/2 flex justify-center relative">
                         <div class="absolute bg-gray-200 rounded-full h-80 w-80 md:h-[450px] md:w-[450px] -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        <img src="/Photo/afterBestproduct.png" alt="FlexiNote" class="relative z-10 h-80 md:h-[450px] object-contain drop-shadow-xl transform hover:scale-105 transition duration-500">
                    </div>

                    <div class="w-full md:w-1/2 text-center md:text-left">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ text.featureTitle }}</h2>
                        <p class="text-gray-600 mb-6 text-lg leading-relaxed">{{ text.featureDesc }}</p>
                        <p class="font-medium text-gray-800 mb-2">{{ text.featureBrand }}</p>

                        <div class="flex items-center justify-center md:justify-start gap-3 mb-8">
                            <span class="text-gray-600 font-medium">Color:</span>
                            <div class="w-6 h-6 rounded-full bg-[#C49A6C] hover:ring-2 hover:ring-offset-2 hover:ring-[#C49A6C] cursor-pointer"></div>
                            <div class="w-6 h-6 rounded-full bg-black cursor-pointer ring-2 ring-offset-2 ring-black transition"></div>
                            <div class="w-6 h-6 rounded-full bg-gray-400 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition"></div>
                        </div>

                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <span class="text-2xl font-bold text-gray-900">{{ text.featurePrice }}</span>
                            <a href="/product-list" @click="handleShopNavigation" class="inline-block px-8 py-3 bg-[#114B5F] text-white font-semibold rounded-lg hover:bg-[#0d3a4b] transition shadow-md cursor-pointer">
                                {{ text.featureButton }}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="py-16 bg-white relative" id="carousel-section">
            <div class="max-w-screen-xl mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{{ text.ourProductTitle }}</h2>

                <div class="flex justify-center gap-4 mb-10">
                    <button
                        @click="setFilter('All')"
                        :class="activeFilter === 'All' ? 'bg-[#114B5F] text-white' : 'border border-gray-300 text-gray-600 hover:border-[#114B5F] hover:text-[#114B5F]'"
                        class="px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        {{ text.filterAll }}
                    </button>
                    <button
                        @click="setFilter('Latest')"
                        :class="activeFilter === 'Latest' ? 'bg-[#114B5F] text-white' : 'border border-gray-300 text-gray-600 hover:border-[#114B5F] hover:text-[#114B5F]'"
                        class="px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        {{ text.filterLatest }}
                    </button>
                    <button
                        @click="setFilter('Popular')"
                        :class="activeFilter === 'Popular' ? 'bg-[#114B5F] text-white' : 'border border-gray-300 text-gray-600 hover:border-[#114B5F] hover:text-[#114B5F]'"
                        class="px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        {{ text.filterPopular }}
                    </button>
                </div>

                <div class="relative group px-4 md:px-8">
                    <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 focus:outline-none">
                        <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>

                    <div ref="productScrollContainer" class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2" style="scrollbar-width: none; -ms-overflow-style: none;">
                        <div v-for="product in filteredProducts" :key="product.id" :id="'product-'+product.id" class="min-w-[280px] md:min-w-[300px] snap-center bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition relative">
                            <div class="relative bg-gray-50 rounded-lg p-6 mb-4 h-64 flex items-center justify-center">
                                <div v-if="(product.stockQuantity ?? 0) <= 0" class="absolute top-3 left-3 bg-red-600 text-white text-[12px] px-2 py-1 rounded">Out of stock</div>
                                <button @click="addToWishlist" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </button>
                                <img :src="product.image" :alt="product.name" class="h-48 object-contain mix-blend-multiply">
                            </div>
                            <div class="text-left">
                                <h3 class="font-bold text-gray-900 text-sm mb-1 truncate">{{ product.name }}</h3>
                                <div class="flex text-yellow-400 text-xs mb-3">
                                    <span v-for="n in 5" :key="n" :class="n <= product.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-lg text-gray-900">{{ product.price }}</span>
                                    <button
                                        v-if="(product.stockQuantity ?? 0) > 0"
                                        @click="addToCart(product)"
                                        class="px-3 py-1.5 bg-[#114B5F] text-white text-xs font-bold rounded hover:bg-[#0d3a4b] active:scale-95 transition-transform"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        v-else
                                        disabled
                                        class="px-3 py-1.5 bg-gray-400 text-white text-xs font-bold rounded opacity-60 cursor-not-allowed"
                                    >
                                        Out of stock
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 focus:outline-none">
                        <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </section>

        <!-- Auth prompt for guests trying to add to cart -->
        <div v-if="showAuthPrompt" class="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" @click.self="closeAuthPrompt">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                <div class="flex border-b">
                    <button
                        class="flex-1 py-3 text-sm font-semibold"
                        :class="activeAuthTab === 'signin' ? 'text-[#114B5F] border-b-2 border-[#114B5F]' : 'text-gray-500'"
                        @click="activeAuthTab = 'signin'"
                    >
                        Sign in
                    </button>
                    <button
                        class="flex-1 py-3 text-sm font-semibold"
                        :class="activeAuthTab === 'signup' ? 'text-[#114B5F] border-b-2 border-[#114B5F]' : 'text-gray-500'"
                        @click="activeAuthTab = 'signup'"
                    >
                        Register
                    </button>
                </div>
                <div class="p-6 space-y-4 text-center">
                    <h3 class="text-lg font-bold text-gray-900">Please {{ activeAuthTab === 'signup' ? 'create an account' : 'sign in' }}</h3>
                    <p class="text-sm text-gray-600">Sign in to add items to your cart and keep your shopping list in sync.</p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <button @click="goToAuthPage(activeAuthTab)" class="flex-1 px-4 py-2.5 rounded-lg text-white bg-[#114B5F] hover:bg-[#0d3a4b] font-semibold">
                            Go to {{ activeAuthTab === 'signup' ? 'Register' : 'Sign in' }}
                        </button>
                        <button @click="closeAuthPrompt" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold">
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>

    <footer>
            <div class="relative bg-gray-900 py-24 md:py-32 px-4 overflow-hidden">
                <div class="absolute inset-0 z-0">
                    <img src="/Photo/footerphoto.png" alt="School Supplies Background" class="w-full h-full object-cover opacity-40 mix-blend-overlay">
                </div>

                <div class="relative z-10 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="text-center md:text-left shrink-0">
                        <h2 class="text-3xl md:text-5xl font-bold text-white mb-3">Have any questions?</h2>
                        <h2 class="text-3xl md:text-5xl font-bold text-white">Contact us now.</h2>
                    </div>

                    <div class="flex w-full max-w-xl gap-3">
                        <input type="email" v-model="footerEmail" placeholder="enter your email" class="w-full px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#114B5F] shadow-lg text-sm">
                        <button @click="handleFooterSubscribe" class="bg-[#114B5F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0d3a4b] transition shadow-lg whitespace-nowrap text-sm">Submit</button>
                    </div>
                </div>
            </div>

            <div class="bg-[#114B5F] text-white pt-10 pb-5 border-t border-[#0d3a4b]">
                <div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

                    <div class="lg:col-span-1">
                        <router-link to="/" class="flex items-center text-2xl font-bold tracking-tight mb-4">
                            <span class="text-[#EF4444]">Tov</span><span class="text-white">Rean</span>
                        </router-link>
                        <h3 class="font-semibold text-sm mb-1">Subscribe</h3>
                        <p class="text-[10px] text-gray-300 mb-2">Get 10% off with your first order</p>
                        <div class="relative max-w-[180px]">
                            <input type="email" v-model="headerEmail" placeholder="Enter your email" class="w-full bg-transparent border border-white/30 rounded px-2 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-white">
                            <button @click="handleHeaderSubscribe" class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-[#EF4444] transition">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 class="font-bold text-base mb-3">Support</h3>
                        <ul class="space-y-2 text-xs text-gray-300 font-light">
                            <li>Techno, Phnom Penh<br>Cambodia</li>
                            <li>tov-rean168@gmail.com</li>
                            <li>+85599-9999-9999</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-base mb-3">Account</h3>
                        <ul class="space-y-2 text-xs text-gray-300 font-light">
                            <li><router-link to="/profile" class="hover:text-white hover:underline transition">My account</router-link></li>
                            <li><router-link to="/signin" class="hover:text-white hover:underline transition">Login / Sign up</router-link></li>
                            <li><router-link to="/cart" class="hover:text-white hover:underline transition">Cart</router-link></li>
                            <li><router-link to="/profile" class="hover:text-white hover:underline transition">Favorite</router-link></li>
                            <li><a href="/product-list" @click="handleShopNavigation" class="hover:text-white hover:underline transition cursor-pointer">Shop</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-base mb-3">Quick Link</h3>
                        <ul class="space-y-2 text-xs text-gray-300 font-light">
                            <li><router-link to="/about" class="hover:text-white hover:underline transition">Privacy policy</router-link></li>
                            <li><router-link to="/about" class="hover:text-white hover:underline transition">term of Use</router-link></li>
                            <li><router-link to="/about" class="hover:text-white hover:underline transition">FAQ</router-link></li>
                            <li><router-link to="/about" class="hover:text-white hover:underline transition">Contact</router-link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-base mb-3">Download App</h3>
                        <p class="text-[10px] text-gray-300 mb-3 font-light leading-relaxed">Save 20% off on 3 purchase in App New User only</p>
                        <div class="flex gap-2 items-start">
                            <div class="bg-white p-1 rounded-md w-20 h-20 flex-shrink-0">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" class="w-full h-full object-contain">
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <button class="bg-black text-white px-2 py-1 rounded border border-gray-600 flex items-center gap-1 w-24 hover:bg-gray-800 transition">
                                    <div class="text-[8px] text-left">
                                        <div class="leading-none">Get it on</div>
                                        <div class="font-bold text-[10px]">Google Play</div>
                                    </div>
                                </button>
                                <button class="bg-black text-white px-2 py-1 rounded border border-gray-600 flex items-center gap-1 w-24 hover:bg-gray-800 transition">
                                    <div class="text-[8px] text-left">
                                        <div class="leading-none">Download on the</div>
                                        <div class="font-bold text-[10px]">App Store</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="flex gap-4 mt-4 text-white">
                            <a href="#" class="hover:text-[#EF4444] transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                            <a href="#" class="hover:text-[#EF4444] transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
                            <a href="#" class="hover:text-[#EF4444] transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.315 1.347 20.646.935 19.856.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.584.016 4.85.072 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.383.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
                        </div>
                    </div>

                </div>

                <div class="border-t border-[#1a5b72] mt-6 pt-4 text-center text-[10px] text-gray-400 font-light tracking-wide">
                    &copy; Copyright e-commerce teams 2025. All right reserved
                </div>
                </div>
    </footer>
    </div>
</template>
