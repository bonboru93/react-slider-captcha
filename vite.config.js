import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: 'src/SliderCaptcha.jsx',
      fileName: 'SliderCaptcha',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react']
    },
    minify: false,
    copyPublicDir: false
  },
  plugins: [
    command === 'serve' && react(),
    libInjectCss()
  ],
}))
