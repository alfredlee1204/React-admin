import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import serverProxy from "./server-proxy";

export default defineConfig({
  plugins: [react()],
  base:"/ABmanagement",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: serverProxy,
  },
})
