import { defineConfig } from 'vite';

export default defineConfig({
  root: 'source',
  base: '/prashant-3d-portfolio/',
  build: { outDir: '../dist', emptyOutDir: true }
});
