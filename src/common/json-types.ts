/**
 * Any object with `string` keys.
 */
export type JSONObject<K extends string = string, V = unknown> = {
  [P in K]: V;
};

/**
 * Either object or array.
 */
export type JSONData<V = unknown> = JSONObject<string, V> | Array<V>;
