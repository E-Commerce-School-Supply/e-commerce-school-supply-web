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
<<<<<<< HEAD
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
    path: '/ProductList',
    nmae: 'Product List',
    component: () => import('../views/ProductListView.vue'),
=======
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cartView.vue'),
>>>>>>> origin/ui/cart
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
