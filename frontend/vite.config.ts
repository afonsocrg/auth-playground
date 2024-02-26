import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfig from "./tsconfig.json";

// Convert paths from tsconfig.json
function getAlias() {
  const paths = tsconfig.compilerOptions.paths;
  const alias = {};
  for (const path in paths) {
    alias[path.replace("/*", "")] = paths[path][0]
      .replace("/*", "")
      .replace(".", "");
  }
  return alias;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"],
  resolve: {
    alias: getAlias(),
  },
});
