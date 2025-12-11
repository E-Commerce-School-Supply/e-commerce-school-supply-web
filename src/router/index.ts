import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutUsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/auth/SigninPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/auth/SignupPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/auth/ForgetPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../views/auth/VerifyPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/auth/ResetPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/product-list',
    name: 'Product List',
    component: () => import('../views/products/ProductListView.vue'),
    alias: ['/products'],
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/products/ProductDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin Dashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/CartView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('accessToken')
  const guestMode = sessionStorage.getItem('guestMode')
  const isAuthenticated = !!token

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Allow home page access for guests
    if (to.name === 'home' && guestMode === 'true') {
      next()
    } else {
      next({ name: 'signin' })
    }
  }
  // If route is for guests only (signin/signup) and user is authenticated, redirect to home
  else if (to.meta.guest && isAuthenticated) {
    next({ name: 'home' })
  }
  // Otherwise, allow navigation
  else {
    next()
  }
})

export default router
