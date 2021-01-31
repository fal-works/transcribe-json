/**
 * @returns `value` if not undefined, otherwise `defaultValue`.
 */
export const coalesce = <T>(value: T | undefined, defaultValue: T): T =>
  value === undefined ? defaultValue : value;

/**
 * Creates a function which receives any property key and returns the value
 * that has been verified as not `undefined`.
 */
export const getCoalescedValue = <T>(
  srcObject: T,
  defaultObject: Required<T>
) => {
  return <K extends keyof T>(key: K): Required<T>[K] =>
    coalesce(srcObject[key], defaultObject[key]);
};
