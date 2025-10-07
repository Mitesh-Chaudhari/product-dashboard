import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 replace 'product-dashboard' with your repo name
export default defineConfig({
  plugins: [react()],
  base: '/product-dashboard/', 
})
