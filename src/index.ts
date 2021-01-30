import { read } from "./read.js";
import { WriteOptions, write } from "./write.js";
import { Fields, extract } from "./extract.js";

export type { JSONObject, JSONData } from "./json-types";
export type { Fields, WriteOptions };
export { read, write, extract };

/**
 * `read()` then `write()`.
 *
 * @param srcfile Path to the JSON file to read.
 */
export const readWrite = (
  srcfile: string,
  writeOptions: WriteOptions
): Promise<void> => read(srcfile).then(write(writeOptions));

/**
 * `read()` then `extract()` then `write()`.
 *
 * @param srcfile Path to the JSON file to read.
 * @param fields Top-level field names to extract.
 */
export const readExtractWrite = (
  srcfile: string,
  fields: Fields,
  writeOptions: WriteOptions
): Promise<void> =>
  read(srcfile).then(extract(fields)).then(write(writeOptions));
