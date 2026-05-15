<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import { useUserStore } from '@/stores/user'
import { useFullscreen } from '@vueuse/core'
import { useRePassword, useLogout } from '@/utils/useManager'

const userStore = useUserStore()
const { isFullscreen, toggle } = useFullscreen()
const {
  rePasswordForm,
  rePasswordFormRef,
  formDrawerRef,
  rules,
  onSubmit,
  openRePassword
} = useRePassword()
const handleLogout = useLogout()

const handleCommand = (c) => {
  switch (c) {
    case 'logout':
      handleLogout()
      break
    case 'rePassword':
      openRePassword()
      break
  }
}

const handleRefresh = () => {
  location.reload()
}
</script>

<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><Eleme /></el-icon>
      商城后台管理系统
    </span>
    <el-icon class="icon-btn"><Fold /></el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon @click="handleRefresh" class="icon-btn"><Refresh /></el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon v-show="!isFullscreen" @click="toggle" class="icon-btn"
          ><FullScreen
        /></el-icon>
      </el-tooltip>
      <el-tooltip effect="dark" content="退出全屏" placement="bottom">
        <el-icon v-show="isFullscreen" @click="toggle" class="icon-btn"
          ><Aim
        /></el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center justify-center">
          <el-avatar
            :size="25"
            :src="userStore.userInfo.avatar"
            alt="用户头像"
            class="mr-2"
          />
          {{ userStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <FormDrawer ref="formDrawerRef" title="修改密码" @submit="onSubmit">
    <el-form
      class="w-full"
      label-width="auto"
      ref="rePasswordFormRef"
      :model="rePasswordForm"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="rePasswordForm.oldpassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="rePasswordForm.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="rePasswordForm.repassword" type="password" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-normal;
}
.icon-btn {
  @apply flex items-center justify-center cursor-pointer;
  width: 42px;
  height: 64px;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.dropdown {
  @apply flex items-center justify-center cursor-pointer mx-5 text-light-50 font-600;
  height: 64px;
}
</style>
