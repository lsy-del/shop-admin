<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loginService } from '@/api/manager'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const userStore = useUserStore()

const loginForm = ref({
  username: '',
  password: ''
})

const loginFormRef = ref(null)
const loading = ref(false)

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 10,
      message: '用户名长度必须在3-10个字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 5,
      max: 12,
      message: '密码长度必须在5-12个字符之间',
      trigger: 'blur'
    }
  ]
})

const onSubmit = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    loginService(loginForm.value)
      .then((res) => {
        ElMessage.success('登录成功')
        userStore.setToken(res.token)
        router.push('/')
      })
      .finally(() => {
        loading.value = false
      })
  })
}

// 监听键盘事件
const onKey = (e) => {
  if (e.key === 'Enter') {
    onSubmit()
  }
}

// 组件挂载时监听键盘事件
onMounted(() => {
  document.addEventListener('keyup', onKey)
})

// 组件卸载时移除键盘事件监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKey)
})
</script>

<template>
  <el-row class="login-container">
    <!-- 左边 -->
    <el-col :lg="16" :md="12">
      <div class="left">
        <div>
          <div>欢迎光临</div>
          <div>此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
        </div>
      </div>
    </el-col>

    <!-- 右边 -->
    <el-col :lg="8" :md="12">
      <div class="right">
        <h2>欢迎回来</h2>
        <div>
          <span class="hr"></span>
          <span>账号密码登录</span>
          <span class="hr"></span>
        </div>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="w-[250px]"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              round
              color="#626aef"
              class="w-[250px]"
              type="primary"
              @click="onSubmit"
              :loading="loading"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<style>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply h-full flex items-center justify-center;
}
.login-container .right {
  @apply flex-col bg-light-50;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.right > h2 {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .hr {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
