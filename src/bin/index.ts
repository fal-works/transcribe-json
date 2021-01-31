import mri from "mri";
import { read, extract, write, Filetype } from "../lib/index.js";
import { help } from "./help.js";

const bug = () => new Error("Ran into unreachable code. Must be a bug.");

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

if (args.help || !srcfile) {
  help();
  process.exit(0);
}

const outfile = ((outfile: unknown) => {
  if (!outfile) {
    console.error(new Error("Missing option: --outfile"));
    process.exit(1);
  }
  if (typeof outfile !== "string") throw bug();
  return outfile;
})(args.outfile);

const fields = ((fields: unknown) => {
  if (fields === undefined) return fields;
  if (typeof fields !== "string") throw bug();
  return fields.split(",");
})(args.fields);

const type = ((type: unknown): Filetype | undefined => {
  switch (type) {
    case undefined:
    case "json":
    case "mjs":
    case "cjs":
      return type;
    default:
      console.error(new Error(`Invalid filetype: ${String(type)}`));
      process.exit(1);
  }
})(args.type);

const run = async () => {
  let data = await read(srcfile);
  if (fields) data = extract(fields)(data);
  return write(outfile, { filetype: type })(data);
};
export default run();
