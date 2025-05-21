import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/todos': {
        // @ts-ignore
        target: import.meta.env.VITE_API_URL,
      }
    },
  },
})
