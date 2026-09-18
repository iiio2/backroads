import { defineConfig } from 'vite'

export default defineConfig({
  // relative asset URLs so dist/ works from any path (subfolder, file://, CDN)
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
