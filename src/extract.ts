import type { JSONObject } from "./json-types";

/**
 * List of field names in a JSON object.
 */
type Fields<T extends JSONObject = JSONObject> = readonly (keyof T)[];

export type { Fields };

/**
 * Returns a function that creates new object with fields extracted from
 * `srcObject`.
 *
 * @param fields Top-level field names to extract.
 */
export const extract = <T extends JSONObject>(fields: Fields<T>) => (
  srcObject: T
): Partial<T> => {
  const pkgInfo: Partial<T> = {};
  for (const field of fields) pkgInfo[field] = srcObject[field];
  return pkgInfo;
};
