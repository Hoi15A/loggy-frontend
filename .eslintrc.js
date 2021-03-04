module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "no-mixed-spaces-and-tabs": [
      "warn",
      "smart-tabs"
    ],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "warn",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
