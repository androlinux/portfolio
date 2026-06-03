import { defineConfig } from 'vite';

// Simple zero-config Vite setup.
// `npm run dev` (or `npm run server`) starts the local dev server.
// `npm run build` outputs a production bundle to /dist.
export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
