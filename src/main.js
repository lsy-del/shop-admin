import 'virtual:windi.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import icon from './utils/icon'

const app = createApp(App)

for (const [key, component] of Object.entries(icon)) {
  app.component(key, component)
}
app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
