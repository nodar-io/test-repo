import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphqlLoader from 'vite-plugin-graphql-loader';
import { fileURLToPath } from 'url';
import path from 'path';
// https://vite.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/test_repo/',
  plugins: [react(), graphqlLoader()]
});
