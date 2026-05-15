import { ref } from 'vue'
import { updatePasswordService } from '@/api/manager'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { showModal } from '@/utils/ui-utils'
import { logoutService } from '@/api/manager'

export function useRePassword() {
  const rePasswordForm = ref({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  const userStore = useUserStore()
  const rePasswordFormRef = ref(null)
  const formDrawerRef = ref(null)

  const rules = ref({
    oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    repassword: [
      { required: true, message: '请再次确认新密码', trigger: 'blur' }
    ]
  })

  const onSubmit = () => {
    rePasswordFormRef.value.validate((valid) => {
      if (!valid) {
        return false
      }
      formDrawerRef.value.showLoading()
      updatePasswordService(rePasswordForm.value)
        .then(() => {
          ElMessage.success('修改密码成功,请重新登录')
          userStore.logout()
          router.push('/login')
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  const openRePassword = () => {
    formDrawerRef.value.open()
  }

  return {
    rePasswordForm,
    rePasswordFormRef,
    formDrawerRef,
    rules,
    onSubmit,
    openRePassword
  }
}

export function useLogout() {
  function handleLogout() {
    const userStore = useUserStore()
    showModal('确定要退出登录吗？').then(() => {
      logoutService().finally(() => {
        userStore.logout()
        router.push('/login')
        ElMessage.success('退出登录成功')
      })
    })
  }
  return handleLogout
}
