import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: dist/index.html works offline and on any static host.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
