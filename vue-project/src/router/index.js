import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../components/pages/HomePage.vue'),
    },
    {
      path: '/account',
      component: () => import('../components/pages/AccountPage.vue'),
    },
    {
      path: '/users',
      component: () => import('../components/pages/UsersPage.vue'),
    },
    {
      path: '/login',
      component: () => import('../components/pages/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('../components/pages/SignUpPage.vue'),
    },
    {
      path: '/newpost',
      component: () => import('../components/pages/NewPostPage.vue'),
    }
  ]
})

export default router
