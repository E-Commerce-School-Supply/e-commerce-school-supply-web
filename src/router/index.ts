import { initFlowbite } from 'flowbite'
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
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/ProfileView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

router.afterEach((to, from) => {
  // We use setTimeout to give Vue a split second to finish rendering the HTML
  // before we tell Flowbite to scan the DOM again.
  setTimeout(() => {
    initFlowbite()
  })
})

export default router
