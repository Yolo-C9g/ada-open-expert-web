import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.use(router).use(pinia).use(Viewer).mount('#app')
