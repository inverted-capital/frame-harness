import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: { exclude: ['lucide-react'] },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none'
    }
  },
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        frame: path.resolve(__dirname, 'frame.html')
      },
      external: ['@privy-io/react-auth'],
      output: {
        globals: {
          '@privy-io/react-auth': 'PrivyReactAuth'
        }
      }
    }
  }
})
