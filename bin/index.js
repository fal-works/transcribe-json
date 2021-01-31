import mri from "mri";
import { read, write } from "../lib/index.js";
import { help } from "./help.js";

const args = mri(process.argv.slice(2), {
  alias: {
    help: "h",
    version: "v",
    outfile: "o",
    type: "t",
  },
  boolean: ["help", "version"],
  string: ["outfile", "type"],
});
const firstArg = args._[0];

if (args.version) {
  console.log("transcribe-json v0.1.0\n");
  process.exit(0);
}

if (args._.length === 0 || args.help) {
  help();
  process.exit(0);
}

if (args.version) {
  console.log("transcribe-json v0.1.0\n");
  process.exit(0);
}

if (!args.outfile) {
  console.error(new Error("Missing option: --outfile"));
  process.exit(1);
}

if (args.type) {
  switch (args.type) {
    case "json":
      break;
    case "mjs":
      break;
    case "cjs":
      break;
    default:
      console.error(new Error(`Invalid filetype: ${args.type}`));
      process.exit(1);
  }
}

const writeOptions = {};
if (args.type) writeOptions.filetype = args.type;

read(firstArg).then(write(args.outfile, writeOptions));
