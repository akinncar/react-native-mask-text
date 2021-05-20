/* eslint-disable no-confusing-arrow */
import toPattern from "./toPattern";

/**
 * function unMask(
 * @param {string} value
 * @returns {string}
 */
function unMask(value: string) {
  return value.replace(/\W/g, "");
}

/**
 * function masker(
 * @param {string} value
 * @param {string} patterns
 * @param {any} options
 * @returns {string}
 */
function masker(value: string, pattern: string, options: any) {
  return toPattern(value, { pattern, ...options });
}

/**
 * function multimasker(
 * @param {string} value
 * @param {string[]} patterns
 * @param {any} options
 * @returns {string}
 */
function multimasker(value: string, patterns: string[], options: any) {
  return masker(
    value,
    patterns.reduce(
      // eslint-disable-next-line prettier/prettier
      (memo: string, pattern: string) =>
        value.length <= unMask(memo).length ? memo : pattern,
      patterns[0]
    ),
    options
  );
}

/**
 * function mask(
 * @param {string} value
 * @param {string | string[]} patterns
 * @param {any} options
 * @returns {string}
 */
function mask(
  value: string | number,
  pattern: string | string[],
  options?: any
) {
  if (typeof pattern === "string") {
    return masker(String(value), pattern || "", options);
  }

  return multimasker(String(value), pattern, options);
}

export { mask, unMask };
