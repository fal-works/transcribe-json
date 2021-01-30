import { read, extract, write } from "../lib/index.js";

read("package.json")
  .then(extract(["name", "version", "license"]))
  .then(write("test/api-result", { filetype: "mjs" }));
