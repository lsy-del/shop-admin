import './style.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' // 引入持久化插件

import App from './App.vue'
import router from './router'
import icon from './utils/icon'

const app = createApp(App)

for (const [key, component] of Object.entries(icon)) {
  app.component(key, component)
}

import 'virtual:windi.css'
import './permission.js'
// 引入权限守卫

app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
