import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/client',
  css: {
    postcss: "postcss.config.ts"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
      'client': path.resolve(__dirname, './src/client'),
      'api': path.resolve(__dirname, './src/api'),
      'shared': path.resolve(__dirname, './src/shared')
    },
  },
  build: {
    outDir: "../../dist/client"
  },
  envDir: "../../"
})