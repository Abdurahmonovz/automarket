import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const API_TARGET = 'https://procuratorial-phrenetically-yessenia.ngrok-free.dev'

/** Outgoing headers to ngrok (skip interstitial in dev proxy). */
const apiProxy = {
  '/api': {
    target: API_TARGET,
    changeOrigin: true,
    secure: true,
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
})
