import type { JSONObject } from "./json-types";

/**
 * List of field names in a JSON object.
 */
export type Fields<K extends string = string> = readonly K[];

/**
 * Returns a function that creates new object with fields extracted from
 * `srcObject`.
 *
 * @param fields Array of top-level field names to extract.
 */
export const extract = <K extends string>(fields: Fields<K>) => {
  return <T extends JSONObject>(srcObject: T): Pick<T, K> => {
    const newObject: Partial<T> = {};
    for (const field of fields)
      if (field in srcObject) newObject[field] = srcObject[field];
    return newObject as Pick<T, K>;
  };
};
