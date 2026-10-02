import { defineConfig } from 'vite';
export default defineConfig({
  // PAGES_BASE=/neuro-atlas-4d/ for GitHub Pages project site; default '/' for local/Vercel.
  base: process.env.PAGES_BASE || '/',
  build: { outDir: 'dist', chunkSizeWarningLimit: 1500 },
  publicDir: 'public'
});
