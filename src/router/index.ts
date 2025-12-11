import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutUsView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cartView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/checkoutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
