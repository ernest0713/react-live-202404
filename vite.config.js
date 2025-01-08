import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 區分 build 路徑 & dev 路徑
  base: process.env.NODE_ENV === 'production' ? '/react-live-202404/': '/',
  plugins: [react()],
})
