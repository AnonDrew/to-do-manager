import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: { // only for dev, uncomment this when local
      '/todos': {
        target: 'http://backend:5000', // not using localhost, but what's in the compose yml for the service that runs the express server
        changeOrigin: true,
      },
    },
  },
})
