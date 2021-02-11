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
      description: "The filetype to emit. Either json, mjs or cjs. (optional)",
    },
    {
      name: "fields <names>",
      description:
        "Top-level field names to extract. Comma separated. (optional)",
    },
  ];
  const maxLen = Math.max(...options.map((option) => option.name.length));
  for (const option of options)
    console.log(`--${option.name.padEnd(maxLen + 2)}${option.description}`);
};

const printBlock = (name: string, printCallback: () => void) => {
  console.log(`${name}:`);
  console.group();
  printCallback();
  console.groupEnd();
};

export const printHelp = (): void => {
  printBlock("Command", printCommandUsage);
  printBlock("Options", printOptions);
  console.log();
};
