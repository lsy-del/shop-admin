import { defineStore } from 'pinia'
import { ref } from 'vue'

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

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
