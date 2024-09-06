import path from "path";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import reactRefresh from "@vitejs/plugin-react-refresh";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [RubyPlugin(), viteReact(), reactRefresh(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/frontend"),
    },
  },
});
