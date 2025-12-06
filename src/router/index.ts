import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/ProductDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutUsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
