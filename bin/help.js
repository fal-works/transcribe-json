const printCommandUsage = () => {
  console.log("transcribe-json [options] <input filepath>");
  console.log("transcribe-json <-h|--help|-v|--version>");
};

const printOptions = () => {
  const options = [
    {
      name: "outfile <path>",
      description: "The output filepath with or without extension. (required)",
    },
    {
      name: "type <type>",
      description: "Either json, mjs or cjs. (optional)",
    },
  ];
  const maxLen = Math.max(
    ...options.map((option) => option.description.length)
  );
  for (const option of options)
    console.log(`--${option.name.padEnd(maxLen + 2)}${option.description}`);
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
