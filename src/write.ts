import * as fs from "fs";
import * as path from "path";
import type { JSONData } from "./json-types";

/**
 * Type of file content to emit.
 */
export type Filetype = "json" | "mjs" | "cjs";

/**
 * Options for `write()`.
 */
export type WriteOptions = {
  /**
   * Passed to `JSON.stringify()`.
   * Defaults to `null`.
   */
  replacer: Parameters<typeof JSON.stringify>[1];

  /**
   * Passed to `JSON.stringify()`.
   * Defaults to two spaces.
   */
  space: Parameters<typeof JSON.stringify>[2];

  /**
   * Either `"json"` (default), `"mjs"` or `"cjs"`.
   */
  filetype?: Filetype;

  /**
   * Formatting function. No formatting at default.
   */
  formatter?: (code: string, filetype: Filetype) => string;
};

/**
 * Default values for `WriteOptions`.
 */
export const defaultWriteOptions = Object.freeze({
  replacer: null,
  space: "  ",
  filetype: "json",
  formatter: (code) => code,
} as Required<WriteOptions>);

/**
 * Converts `dataString` to file content of any `filetype`.
 */
export const createFileContent = (
  dataString: string,
  fileType: Filetype
): string => {
  switch (fileType) {
    case "mjs":
      return `export default ${dataString}\n`;
    case "cjs":
      return `module.exports = ${dataString}\n`;
    case "json":
      return dataString;
  }
};

/**
 * Returns a function that writes any JSON data to a file.
 * The file type can be specified in `options`.
 *
 * @param outfile The output filepath with or without extension.
 */
export const write = (outfile: string, options: WriteOptions) => async (
  data: JSONData
): Promise<void> => {
  const { filetype, replacer, space, formatter } = Object.assign(
    {},
    defaultWriteOptions,
    options
  );

  const dataString = JSON.stringify(data, replacer, space);

  const adiitionalExtension = path.extname(outfile) ? "" : `.${filetype}`;
  const normalizedPath = `${outfile}${adiitionalExtension}`;
  const code = formatter(createFileContent(dataString, filetype), filetype);

  return fs.promises.writeFile(normalizedPath, code);
};
