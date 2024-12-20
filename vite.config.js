import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphqlLoader from 'vite-plugin-graphql-loader';
import { fileURLToPath } from 'url';
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/',
  plugins: [react(), graphqlLoader()]
});
