/** @type {import("eslint/lib/shared/types").ConfigData} */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:unicorn/recommended",
    'prettier'
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'unused-imports'
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        "cases": {
          "camelCase": true,
          "pascalCase": true
        }
      }
    ],
    "unicorn/prevent-abbreviations": "off",
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  globals: {
    Astro: 'readonly',
    window: 'readonly',
  },
  overrides: [
    // for .astro files
    {
      files: ['**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-irregular-whitespace': 'off'
      },
    },
  ],
  ignorePatterns: ['astro.config.mjs', '.eslintrc.cjs', '.stylelintrc.cjs', '.markuplintrc.js'],
};
