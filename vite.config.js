import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Isso garante que no localhost:5173, as chamadas /api 
      // sejam redirecionadas corretamente se necessário
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    watch: {
      ignored: ['**/api/**'],
    },
  },
})