/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2022-12-09 13:54:12
 * @LastEditors: Lethan
 * @LastEditTime: 2022-12-09 13:55:06
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [react()]
})
