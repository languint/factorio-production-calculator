import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import fs from "vite-plugin-fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
