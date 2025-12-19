<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRoute, useRouter } from 'vue-router'
import  BlankProfile  from '@/assets/images/pfp_blank.jpeg'
const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const router = useRouter()
const route = useRoute()

const isSearchFocused = ref(false)
const searchQuery = ref('')

const guestMode = computed(() => sessionStorage.getItem('guestMode') === 'true')
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

function isLikelyAvatarUrl(value: unknown): value is string {
	if (typeof value !== 'string') return false
	const s = value.trim()
	if (!s) return false
	// Support common safe sources: absolute urls, data/blob urls, and app-relative paths.
	return /^(https?:\/\/|data:image\/|blob:|\/|\.{1,2}\/)/.test(s)
}

const userAvatarSrc = computed(() => {
	const candidate = authStore.user?.avatarUrl
	if (typeof candidate === 'string' && candidate.startsWith('/')) {
		const base = import.meta.env.VITE_API_URL || ''
		return `${String(base).replace(/\/$/, '')}${candidate}`
	}
	return isLikelyAvatarUrl(candidate) ? candidate.trim() : BlankProfile
})

const isHome = computed(() => route.name === 'home')
const isProducts = computed(() => route.name === 'Product List' || route.name === 'product-detail')
const isContact = computed(() => route.name === 'Contact us')
const isAbout = computed(() => route.name === 'About us')

const searchResults = computed(() => {
	const query = searchQuery.value.trim().toLowerCase()
	if (!query) return []
	return productStore.products
		.filter((p: any) => {
			const name = String(p?.name ?? '').toLowerCase()
			const brand = String(p?.brandName ?? p?.brand ?? '').toLowerCase()
			return name.includes(query) || brand.includes(query)
		})
		.slice(0, 8)
})

async function ensureProductsLoaded() {
	if (productStore.products.length > 0) return
	await productStore.fetchProducts()
}

function handleSignOut() {
	authStore.logout()
}

function navigateToCart() {
	router.push({ name: 'cart' })
}

function goToAuthPage(tab: 'signin' | 'signup') {
	router.push({ name: tab })
}

function goToFavorites() {
	if (!isAuthenticated.value) {
		goToAuthPage('signin')
		return
	}
	router.push({ name: 'my-favorites' })
}

async function onSearchFocus() {
	isSearchFocused.value = true
	try {
		await ensureProductsLoaded()
	} catch {
		// ignore
	}
}

function goToProduct(product: any) {
	isSearchFocused.value = false
	searchQuery.value = ''
	if (!product?.id) return
	router.push({ name: 'product-detail', params: { id: product.id } })
}

function handleDocumentClick() {
	isSearchFocused.value = false
}

onMounted(() => {
	initFlowbite()
	document.addEventListener('click', handleDocumentClick)
	cartStore.fetchCart().catch(() => {
		// ignore (e.g. not signed in)
	})
	if (isAuthenticated.value) {
		favoriteStore.fetchFavorite().catch(() => {
			// ignore
		})
	}
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
	<header class="sticky top-0 z-50 w-full">
		<div class="bg-[#114B5F] text-white text-2xs md:text-xs py-2 px-4 relative">
			<div class="max-w-7xl mx-auto flex justify-center items-center">
				<div class="text-center flex gap-2">
					<span class="opacity-95 font-light tracking-wide">Black Friday Sale For All Pen and Book - OFF 50%!</span>
					<router-link to="/product-list" class="font-bold underline hover:text-gray-200 cursor-pointer">ShopNow</router-link>
				</div>
			</div>
		</div>

		<nav class="bg-white border-b border-gray-200 w-full shadow-sm">
			<div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-6 lg:px-8">
				<router-link to="/" class="flex items-center text-2xl font-bold tracking-tight shrink-0">
					<span class="text-[#EF4444]">Tov</span><span class="text-gray-900">Rean</span>
				</router-link>

				<div
					class="hidden lg:flex items-center transform space-x-8 text-gray-600 font-medium text-[16px]"
				>
					<router-link to="/" :class="isHome ? 'text-[#114B5F] font-bold' : 'hover:text-[#114B5F] transition-colors'">
						Home
					</router-link>
					<router-link
						to="/product-list"
						class="block py-2 px-3 rounded"
						:class="isProducts ? 'text-[#114B5F] font-bold' : 'hover:text-[#114B5F] transition-colors'"
					>
						Products
					</router-link>
					<!-- <router-link :to="{ path: '/', hash: '#promotion-section' }" class="hover:text-[#114B5F] transition-colors">
						Promotion
					</router-link> -->
					<router-link
						to="/contact"
						:class="isContact ? 'text-[#114B5F] font-bold' : 'hover:text-[#114B5F] transition-colors'"
					>
						Contact us
					</router-link>
					<router-link
						to="/about"
						:class="isAbout ? 'text-[#114B5F] font-bold' : 'hover:text-[#114B5F] transition-colors'"
					>
						About us
					</router-link>
				</div>

				<div class="flex items-center space-x-4 md:order-2">
					<div class="hidden md:flex relative" @click.stop>
						<input
							type="text"
							v-model="searchQuery"
							@focus="onSearchFocus"
							placeholder="What are you looking for?"
							class="bg-gray-100 text-sm rounded-full px-5 py-2.5 w-64 focus:outline-none focus:ring-1 focus:ring-[#114B5F] border-none placeholder-gray-500"
						>
						<button class="absolute right-3 top-2.5 text-gray-500 hover:text-[#114B5F]">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>

						<div
							v-if="isSearchFocused && searchQuery"
							class="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
						>
							<ul v-if="searchResults.length > 0" class="max-h-60 overflow-y-auto">
								<li
									v-for="item in searchResults"
									:key="item.id"
									@click="goToProduct(item)"
									class="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
								>
									<img :src="item.imageUrl || item.imageURL || '/Photo/ourproduct.png'" class="w-8 h-8 object-contain">
									<div>
										<p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
										<p class="text-xs text-gray-500">${{ Number(item.price || 0).toFixed(2) }}</p>
									</div>
								</li>
							</ul>
							<div v-else class="px-4 py-3 text-sm text-gray-500 text-center">No products found.</div>
						</div>
					</div>

					<div class="flex items-center space-x-5">
						<button @click="goToFavorites" class="text-gray-800 hover:text-[#EF4444] transition hidden sm:block relative">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
							<span
								v-if="favoriteStore.count > 0"
								class="absolute -top-1 -right-1 bg-[#EF4444] text-white text-2xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
							>
								{{ favoriteStore.count }}
							</span>
						</button>

						<button @click="navigateToCart" class="text-gray-800 hover:text-[#114B5F] relative transition">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span
								v-if="cartStore.totalItems > 0"
								class="absolute -top-1 -right-1 bg-[#EF4444] text-white text-2xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
							>
								{{ cartStore.totalItems }}
							</span>
						</button>

						<div class="hidden md:block text-right leading-tight mr-2">
							<p class="text-[11px] text-gray-500">Currently</p>
							<p class="text-sm font-semibold text-gray-800">{{ displayName }}</p>
						</div>

						<button
							type="button"
							class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
							id="user-menu-button"
							aria-expanded="false"
							data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom"
						>
							<span class="sr-only">Open user menu</span>
							<img v-if="guestMode" class="w-12 h-12 rounded-full object-cover" :src="BlankProfile" alt="user photo">
							<img v-else class="w-9 h-9 rounded-full object-cover border border-gray-200" :src="userAvatarSrc" alt="user photo">
						</button>
						<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44" id="user-dropdown">
							<div class="px-4 py-3">
								<span class="block text-sm text-gray-900">{{ displayName }}</span>
								<span class="block text-sm text-gray-500 truncate">{{ displayEmail }}</span>
							</div>
							<ul class="py-2" aria-labelledby="user-menu-button">
								<template v-if="isAuthenticated">
									<li v-if="authStore.user?.role === 'ADMIN'">
										<router-link :to="{ name: 'Admin Dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
											<i class="pi pi-th-large mr-2"></i>Admin Dashboard
										</router-link>
									</li>
									<li>
										<router-link :to="{ name: 'my-orders' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											My Orders
										</router-link>
									</li>
									<li>
										<router-link :to="{ name: 'my-reviews' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											Review
										</router-link>
									</li>
									<li>
										<router-link :to="{ name: 'profile', query: { tab: 'profile' } }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											Settings
										</router-link>
									</li>
									<li>
										<a
											@click.prevent="handleSignOut"
											href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
										>
											Sign out
										</a>
									</li>
								</template>
								<template v-else>
									<li>
										<button
											@click="goToAuthPage('signin')"
											class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign in
										</button>
									</li>
									<li>
										<button
											@click="goToAuthPage('signup')"
											class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Register
										</button>
									</li>
								</template>
							</ul>
						</div>

						<button
							data-collapse-toggle="navbar-user"
							type="button"
							class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							aria-controls="navbar-user"
							aria-expanded="false"
						>
							<span class="sr-only">Open main menu</span>
							<svg
								class="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div class="hidden w-full md:hidden border-t border-gray-100" id="navbar-user">
				<ul class="flex flex-col font-medium p-4 bg-gray-50 space-y-2">
					<li>
						<router-link to="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">Home</router-link>
					</li>
					<li>
						<router-link
							to="/product-list"
							class="block py-2 px-3 rounded"
							:class="isProducts ? 'text-white bg-[#EF4444]' : 'text-gray-900 hover:bg-gray-100'"
						>
							Products
						</router-link>
					</li>
					<!-- <li>
						<router-link :to="{ path: '/', hash: '#promotion-section' }" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
							Promotions
						</router-link>
					</li> -->
					<li>
						<router-link to="/contact" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">
							Contact us
						</router-link>
					</li>
					<li>
						<router-link to="/about" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">About us</router-link>
					</li>
					<li class="mt-2 pt-2 border-t border-gray-200" @click.stop>
						<input
							type="text"
							v-model="searchQuery"
							@focus="onSearchFocus"
							placeholder="What are you looking for?"
							class="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#114B5F] focus:border-[#114B5F] block p-2.5"
						>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

