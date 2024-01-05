import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    "process.env": process.env,
    __APP_ENV__: JSON.stringify(process.env.APP_ENV),
  },
});
