import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // NOTE: 外部API
      '/api/forex': {
        target: 'https://forex-api.coin.z.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/forex/, ''),
      },
      // NOTE: ローカルRails Api
      '/api/backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/backend/, ''),
      },
    },
  },
});

