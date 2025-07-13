import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/MysticBall/",
  plugins: [react()],
  resolve: {
    alias: {
      three: path.resolve(__dirname, "node_modules/three")
    },
  },
  optimizeDeps: {
    include: ["three"],
  },
  ssr: {
    noExternal: ["three", "vanta"],
  },
});
