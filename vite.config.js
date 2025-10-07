import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace this with your repository name
const repoName = 'product-dashboard';

// If you deploy to a subpath (GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
