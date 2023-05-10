import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default {
  build: {
    rollupOptions: {
      input: '/vite-project/src/main.tsx'
    }
  }
}
;