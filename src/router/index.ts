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
    path: '/ProductList',
    nmae: 'Product List',
    component: () => import('../views/ProductListView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
