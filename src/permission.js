import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    ElMessage.error('请先登录')
    return next('/login')
  }

  // 已登录，且访问登录页，重定向到上一页
  if (userStore.token && to.path === '/login') {
    ElMessage.error('您已登录，无需重复登录')
    return next({ path: from.path ? from.path : '/' })
  }

  if (userStore.token) {
    await userStore.getInfo()
  }

  next()
})
