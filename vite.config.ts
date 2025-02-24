import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/client',
  css: {
    postcss: "postcss.config.ts"
  },
  server: {
    port: 5173, // Or 5174 if that’s what Vite picked
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
      "client": "/src/client",
      "api": "/src/api",
      "shared": "/src/shared"
    },
  },
  build: {
    outDir: "../../dist/client"
  }
})