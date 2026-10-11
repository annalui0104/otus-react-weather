import {
  defineConfig,
} from "vitest/config";


export default defineConfig({
  test: {
    environment:
        "jsdom",

    globals:
        true,

    setupFiles: [
      "./src/tests/setup.ts",
    ],

    coverage: {
      provider:
          "v8",

      reporter: [
        "text",
        "html",
      ],

      include: [
        "src/**/*.{ts,tsx}",
      ],

      exclude: [
        "src/main.tsx",
        "src/types/**",
        "src/tests/**",
      ],

      thresholds: {
        lines: 50,
        functions: 50,
        statements: 50,
        branches: 50,
      },
    },
  },
});