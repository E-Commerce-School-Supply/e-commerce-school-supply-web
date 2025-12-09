import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'signin',
    component: () => import('../views/auth/SigninPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutUsView.vue'),
  },
  {
    path: '/signin',
    redirect: '/',
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/auth/SignupPage.vue'),
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/auth/ForgetPage.vue'),
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../views/auth/VerifyPage.vue'),
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/auth/ResetPage.vue'),
  },
  {
    path: '/product-list',
    name: 'Product List',
    component: () => import('../views/products/ProductListView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/ProfileView.vue'),
  },
  {
    path: '/admin',
    name: 'Admin Dashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
