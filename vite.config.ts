import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自動匯入 Vue 相關函式，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core'],
      vueTemplate: true,
      dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'),
      eslintrc: {
        enabled: false, // 產生 .eslintrc-auto-import.json
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    })
  ],
  base: '/baseball-analytics/',
  resolve: {
    alias: {
      // 設定'@'指向'src'
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0', //啟動NetWork 本地ip
    port: 8086
  }
})
