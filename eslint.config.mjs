import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  ignores: ["**/dist/"],
  files: ["**/*.{ts,tsx}"],
  extends: [js.configs.recommended, tseslint.configs.strict],
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
});
