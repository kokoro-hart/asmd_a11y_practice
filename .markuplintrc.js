module.exports = {
  extends: ["markuplint:recommended"],
  parser: {
    ".astro$": "@markuplint/astro-parser",
  },
  rules: {
    "invalid-attr": {
      options: {
        allowAttrs: [
          "{...props}",
        ],
      },
    },
    "no-refer-to-non-existent-id": false,
    "character-reference": false,
  },
  nodeRules: [
    {
      selector: "head",
      rules: {
        "invalid-attr": {
          option: {
            attrs: {
              prefix: {
                type: "String",
              },
            },
          },
        },
      },
    },
    {
      selector: "meta[property]",
      rules: {
        "invalid-attr": {
          option: {
            attrs: {
              property: {
                type: "String",
              },
              content: {
                type: "String",
              },
            },
          },
        },
      },
    },
    {
      selector: "link",
      rules: {
        "no-use-event-handler-attr": false,
      },
    },
    {
      selector: "img",
      rules: {
        "required-attr": ["alt", "width", "height", "decoding"],
      },
    },
    {
      selector: "button",
      rules: {
        "required-attr": ["type"],
      },
    },
    {
      selector: "option",
      rules: {
        "require-accessible-name": false,
      },
    },
  ],
}
