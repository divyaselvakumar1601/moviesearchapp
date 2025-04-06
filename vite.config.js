import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Only include this if you need path aliases
    alias: {
      '@': '/src',
    }
  }
})