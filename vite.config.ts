import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  // Production build'da backend manzili MAJBURIY: usiz "UYSOT'ga ulash" tugmasi
  // landing'ning o'z domeniga (/api/oauth/install) borib 404 beradi.
  if (mode === 'production') {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    if (!env.VITE_API_BASE) {
      throw new Error(
        'VITE_API_BASE berilmagan. .env yoki Vercel Environment Variables’ga Pulse backend manzilini qo‘shing.',
      );
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: 3000 },
  };
});
