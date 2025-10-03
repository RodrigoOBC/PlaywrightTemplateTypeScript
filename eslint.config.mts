import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript / Browser globals for test support page + component objects
  {
    files: [
      "**/tests/page/*.{js,mjs,cjs,ts,mts,cts}",
      "**/tests/components/*.{js,mjs,cjs,ts,mts,cts}",
      "**/tests/*.spec.{js,mjs,cjs,ts,mts,cts}"
    ],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  // TypeScript base + type-aware rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    languageOptions: {
      parserOptions: {
        // Use the new projectService (faster que antigo project: ["tsconfig.json"]) quando disponível
        projectService: true
      }
    },
    rules: {
      // Example: can tune strictness later
      "@typescript-eslint/no-floating-promises": "error"
    }
  }
]);
