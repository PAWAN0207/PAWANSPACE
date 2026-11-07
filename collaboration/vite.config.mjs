import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../static/assets/crdt'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'frontend/crdt.js'),
      formats: ['es'],
      fileName: () => 'crdt.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});