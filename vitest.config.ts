import path from "path"
import { defineConfig } from "vitest/config"

// Note: JSX is transformed by Vitest's built-in esbuild using the automatic
// runtime (tsconfig `jsx: "react-jsx"`), so @vitejs/plugin-react is not needed
// for tests and is intentionally omitted to avoid a vite peer-version mismatch.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    css: true,
  },
})
