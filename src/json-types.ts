/**
 * Any object with `string` keys.
 */
export type JSONObject = Record<string, unknown>;

/**
 * Either object or array.
 */
export type JSONData = JSONObject | Array<unknown>;
