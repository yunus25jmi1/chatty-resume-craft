import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "build"] },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Unused variables detection - main feature
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_"
        }
      ],
      "no-unused-vars": "off", // Disable base rule as it conflicts with TypeScript version
      // Code quality rules
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "warn",
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
