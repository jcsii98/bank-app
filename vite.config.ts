// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bank-app/',
  build: {
    rollupOptions: {
      input: 'src/main.tsx'
    }
  },
  server: {
    fs: {
      // add the parent directory of your project here
      allow: ['../']
    }
  },
  plugins: [react()]
});
