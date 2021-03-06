module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    node: true,
    "react-native/react-native": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": [0, {}], // this is dumb, why is this still recommended
    "react/no-unescaped-entities": [0, {}],
    "no-unused-vars": [1, {}],
    quotes: ["error", "double"],
  },
};
