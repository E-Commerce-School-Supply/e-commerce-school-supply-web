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
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
