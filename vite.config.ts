import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  styleImport({
    resolves: [
      AntdResolve()
    ]
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  css: {
    //引入全局样式
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";',
      },
    },
  }
})
