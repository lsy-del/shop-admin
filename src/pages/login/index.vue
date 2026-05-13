<script setup>
import { ref } from 'vue'
const form = ref({
  username: '',
  password: ''
})
const onSubmit = () => {
  console.log('submit!')
}
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

        <el-form :model="form" class="w-[250px]">
          <el-form-item>
            <el-input
              prefix-icon="User"
              v-model="form.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              prefix-icon="Lock"
              v-model="form.password"
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
