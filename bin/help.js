const printCommandUsage = () => {
  console.log("transcribe-json [options] <input filepath>");
  console.log("transcribe-json <-h|--help|-v|--version>");
};

const printOptions = () => {
  const argMap = {
    "outfile <path>":
      "The output filepath with or without extension. (required)",
    "type <type>": "Either json, mjs or cjs. (optional)",
  };
  const maxLen = Math.max(...Object.keys(argMap).map((key) => key.length));
  for (const [name, description] of Object.entries(argMap))
    console.log(`--${name.padEnd(maxLen + 2)}${description}`);
};

/**
 * @param {string} name
 * @param {() => void} printCallback
 */
const printBlock = (name, printCallback) => {
  console.log(`${name}:`);
  console.group();
  printCallback();
  console.groupEnd();
};

export const help = () => {
  printBlock("Command", printCommandUsage);
  printBlock("Options", printOptions);
  console.log();
};
