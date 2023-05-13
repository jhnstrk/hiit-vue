/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Enforces relative paths in the generated index.html
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    // open: '/index.html',
    port: 8080,
    strictPort: true,
  },
});
