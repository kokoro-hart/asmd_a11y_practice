/** @type {import("stylelint").Config} */

module.exports = {
  extends: [
    "stylelint-config-html/astro",
    "stylelint-config-recess-order",
    "stylelint-config-recommended-scss",
    "stylelint-config-standard",
    "stylelint-config-prettier"
  ],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "at-root",
          "debug",
          "each",
          "else",
          "error",
          "extend",
          "for",
          "forward",
          "function",
          "if",
          "include",
          "mixin",
          "return",
          "use",
          "warn",
          "while",
        ],
      },
    ],
    "no-descending-specificity": null,
    "scss/no-global-function-names": null,
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["/^math/", "/^global/", "/^map-get/"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "selector-class-pattern": null,
    "no-invalid-position-at-import-rule": null
  },
  ignoreFiles: ["dist/**", "node_modules/**"],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
};
