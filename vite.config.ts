import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          features: path.resolve(__dirname, 'features.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          tarkPorn: path.resolve(__dirname, 'tark-porn.html'),
          tarkKhodArzaei: path.resolve(__dirname, 'tark-khod-arzaei.html'),
          pornBrain: path.resolve(__dirname, 'porn-brain.html'),
          relapse: path.resolve(__dirname, 'relapse.html'),
          habits: path.resolve(__dirname, 'habits.html'),
          guides: path.resolve(__dirname, 'guides.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
