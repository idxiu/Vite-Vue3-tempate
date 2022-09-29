import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

import App from '@/App.vue'

import '@/styles/tailwind.css'
import '@/styles/main.scss'
import '@/styles/nprogress.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

async function bootstrap() {
  const app = createApp(App)
  // Configure store
  setupStore(app)
  // Configure routing
  setupRouter(app)

  app.use(ElementPlus, {
    locale: zhCn
  })
  app.mount('#app')
}
bootstrap()
