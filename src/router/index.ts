import { initFlowbite } from 'flowbite'
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
=======
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/ProfileView.vue'),
>>>>>>> origin/feature/user-profile
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
