import * as fs from "fs";

const parseBuffer = (arg: { buffer: ArrayBufferLike }) =>
  JSON.parse(arg.buffer.toString()) as Record<string, unknown>;

/**
 * @param srcfile Filepath to any JSON file.
 */
export const read = (srcfile: string): Promise<Record<string, unknown>> =>
  fs.promises.readFile(srcfile).then(parseBuffer);
