import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000, // Change this to match Render's environment
    proxy: {
      "/api": {
        target: "https://your-backend-url.com", // Replace with your backend URL
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
