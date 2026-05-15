import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { showLoading, hideLoading } from '@/utils/ui-utils'

router.beforeEach(async (to, from) => {
  showLoading()

  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    ElMessage.error('请先登录')
    return '/login'
  }

  if (userStore.token && to.path === '/login') {
    ElMessage.error('您已登录，无需重复登录')
    return { path: from.path ? from.path : '/' }
  }

  if (userStore.token) {
    await userStore.getInfo()
  }

  let title = to.meta.title ? to.meta.title : '商城后台管理系统'
  document.title = title
})

router.afterEach((to, from) => {
  hideLoading()
})
