import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getInfoService } from '@/api/manager'

export const useUserStore = defineStore(
  'admin-user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})

    const setUserInfo = (newUserInfo) => {
      userInfo.value = newUserInfo
    }

    const getInfo = () => {
      return new Promise((resolve, reject) => {
        getInfoService()
          .then((res) => {
            setUserInfo(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      setUserInfo,
      getInfo
    }
  },
  {
    persist: true
  }
)
