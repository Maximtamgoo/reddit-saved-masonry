import tseslint from "typescript-eslint";
import rootConfig from "../eslint.config.mjs";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config({
  extends: [
    rootConfig,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    reactHooks.configs["recommended-latest"],
    reactRefresh.configs.recommended,
    pluginQuery.configs["flat/recommended"],
  ],
  settings: { react: { version: "detect" } },
});
