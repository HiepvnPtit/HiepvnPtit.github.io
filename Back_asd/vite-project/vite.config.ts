import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/authentication': {
        target: 'https://okhiepkkkkkkkkkkkkhahahahahahahaha.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://okhiepkkkkkkkkkkkkhahahahahahahaha.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})