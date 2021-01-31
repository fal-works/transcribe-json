// https://eslint.org/docs/user-guide/configuring

const dirs = { src: { lib: "src", bin: "src-bin" } };
const ts = (() => {
  const srcLib = `${dirs.src.lib}/**/*.ts`;
  const srcBin = `${dirs.src.bin}/**/*.ts`;

  return { src: { lib: [srcLib], bin: [srcBin], all: [srcLib, srcBin] } };
})();

module.exports = {
  ignorePatterns: ["/lib/", "/bin/"],

  // config common to all
  env: {
    es6: true,
    es2017: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
  },

  overrides: [
    // config just for all JavaScript files
    {
      files: ["**/*.js"],
      rules: {
        "lines-around-comment": [
          "error",
          {
            beforeBlockComment: true,
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowArrayStart: true,
            allowClassStart: true,
          },
        ],
      },
    },

    // config for all TypeScript files
    {
      files: ["**/*.ts"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
    },

    // config with basic rules
    {
      files: ts.src.all,
      extends: ["eslint:recommended", "prettier"],
    },

    // config for source code in TypeScript
    {
      files: ts.src.all,
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier/@typescript-eslint",
      ],
      rules: {
        "no-fallthrough": "off", // already checked by TypeScript
      },
    },
    {
      files: ts.src.lib,
      parserOptions: { project: `${dirs.src.lib}/tsconfig.json` },
    },
    {
      files: ts.src.bin,
      parserOptions: { project: `${dirs.src.bin}/tsconfig.json` },
    },
  ],
};
