<script setup>
import { ref } from 'vue'
const drawer = ref(false)
defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  }
})

const loading = ref(false)
const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)

const open = () => (drawer.value = true)

const close = () => (drawer.value = false)

const emit = defineEmits(['submit'])
const submit = () => emit('submit')

// 暴露方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})
</script>

<template>
  <el-drawer
    :title="title"
    v-model="drawer"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="action">
        <el-button :loading="loading" type="primary" @click="submit">{{
          confirmText
        }}</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.formDrawer .action {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
