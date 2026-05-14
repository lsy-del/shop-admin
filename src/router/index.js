import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/admin.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/pages/home/index.vue'),
          meta: {
            title: '后台首页'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/login/index.vue'),
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/pages/404NotFound/index.vue'),
      meta: {
        title: '404 Not Found'
      }
    }
  ]
})

export default router
