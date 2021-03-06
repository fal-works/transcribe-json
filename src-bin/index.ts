import {
  parseLazy,
  flag,
  converters as cv,
  converterFactories as cvf,
  config,
} from "cli-bespoke";
import packageInfo from "../package-info.js";
import { read, extract, write, Filetype } from "../lib/index.js";
import { printHelp } from "./help.js";

config.onError = (err) => {
  console.error(`[transcribe-json] ${String(err)}`);
  process.exit(1);
};

const validTypes: readonly Filetype[] = ["json", "mjs", "cjs"];

const args = parseLazy({
  args: process.argv.slice(2),
  convert: {
    _: cv.optionalOne,
    help: flag,
    version: flag,
    outfile: cv.justOne,
    type: cvf.optionalOne(cvf.validValues(validTypes)),
    fields: cvf.optional(cvf.split(",")),
  },
  alias: {
    help: "h",
    version: "v",
    outfile: "o",
    type: "t",
    fields: "f",
  },
});

const srcfile = args._();

if (args.version()) {
  console.log(`${packageInfo.name} v${packageInfo.version}\n`);
  process.exit(0);
}

if (args.help() || srcfile === undefined) {
  printHelp();
  process.exit(0);
}

// ---- run -------------------------------------------------------------------

const outfile = args.outfile();
const fields = args.fields();
const filetype = args.type();

const run = async () => {
  let data = await read(srcfile);
  if (fields) data = extract(fields)(data);
  return write(outfile, { filetype })(data);
};
export default run();
