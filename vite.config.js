import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      outDir: 'dist',
      manifest: {
        name: 'Candle',
        short_name: 'Candle',
        start_url: '.',
        display: 'fullscreen',
        description:
          'Candle is an application that allows you to stream video directly to the Lampa app via a link',
        icons: [
          {
            src: 'favicon/favicon-196x196.png',
            sizes: '196x196',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
