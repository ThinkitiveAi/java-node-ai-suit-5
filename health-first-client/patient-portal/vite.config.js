import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lightswind/dist/components/ui': path.resolve(__dirname, 'node_modules/lightswind/dist/components/ui'),
      'lightswind/dist/components/lib': path.resolve(__dirname, 'node_modules/lightswind/dist/components/lib'),
    }
  },
  build: {
    // Production build optimizations
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      }
    }
  },
  css: {
    postcss: './postcss.config.cjs'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts']
  }
})
