import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        certificates: resolve(__dirname, 'certificates.html'),
        education: resolve(__dirname, 'education.html'),
        resume: resolve(__dirname, 'resume.html'),
      },
    },
  },
});
