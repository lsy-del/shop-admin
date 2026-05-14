<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import HTagList from './components/HTagList.vue'
</script>

<template>
  <el-container>
    <el-header><FHeader /></el-header>
    <el-container>
      <el-aside><FMenu /></el-aside>
      <el-main>
        <HTagList />

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
