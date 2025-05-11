import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Frontend'i 5173 portunda çalıştır
    host: 'localhost' // Yerel makinede çalıştır
  }
});