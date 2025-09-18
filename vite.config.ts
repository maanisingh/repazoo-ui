import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "128.140.82.187", // your server IP
      port: 5173,
    },
  },
});
