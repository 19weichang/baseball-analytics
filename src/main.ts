import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createRouter } from '@/router'

const router = createRouter()

createApp(App).use(ElementPlus).use(router).mount('#app')
