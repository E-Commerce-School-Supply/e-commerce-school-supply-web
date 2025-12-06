import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutUsView.vue'),
  },
  {
    path: '/ProductDetail',
    nmae: 'Product Detail',
    component: () => import('../views/ProductDetailView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
