import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [RubyPlugin(), reactRefresh()],
});
