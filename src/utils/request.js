import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['token'] = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res.data.data
  },
  (err) => {
    const msg = err.response.data.msg || '请求失败'
    ElMessage.error(msg)
    if (msg === '非法token，请先登录') {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

export default instance
