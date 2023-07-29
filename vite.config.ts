import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import serverProxy from "./server-proxy";

export default defineConfig({
  plugins: [react()],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: serverProxy,
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 定义全局的scss变量
        additionalData: `@import '@/assets/color.scss';`
      }
    }
  }
})
