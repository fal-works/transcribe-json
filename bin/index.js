import mri from "mri";
import { read, extract, write } from "../lib/index.js";
import { help } from "./help.js";

const args = mri(process.argv.slice(2), {
  alias: {
    help: "h",
    version: "v",
    outfile: "o",
    type: "t",
    fields: "f",
  },
  boolean: ["help", "version"],
  string: ["outfile", "type", "fields"],
});
const srcfile = args._[0];

if (args.version) {
  console.log("transcribe-json v0.1.0\n");
  process.exit(0);
}

if (args.help) {
  help();
  process.exit(0);
}
if (args.version) {
  console.log("transcribe-json v0.1.0\n");
  process.exit(0);
}
if (!srcfile) {
  help();
  process.exit(0);
}

if (!args.outfile) {
  console.error(new Error("Missing option: --outfile"));
  process.exit(1);
}

switch (args.type) {
  case undefined:
  case "json":
  case "mjs":
  case "cjs":
    break;
  default:
    console.error(new Error(`Invalid filetype: ${args.type}`));
    process.exit(1);
}

/**
 * @param {string} srcfile
 * @param {string} [fields]
 * @param {string} outfile
 * @param {"json" | "mjs" | "cjs"} [filetype]
 */
const run = async (srcfile, outfile, fields, filetype) => {
  let data = await read(srcfile);
  if (fields) data = extract(fields.split(","))(data);
  return write(outfile, { filetype })(data);
};

run(srcfile, args.outfile, args.fields, args.filetype);
