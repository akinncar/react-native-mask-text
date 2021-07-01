/* eslint-disable no-confusing-arrow */
import { BigNumber } from "bignumber.js";
import {
  CurrencyMaskOptionPattern,
  instanceOfCurrencyMaskOptionPattern,
  instanceOfOptionPattern,
  OptionPattern,
} from "src/@types/OptionPatterns";
import toPattern from "./toPattern";

function unMask(value: string, type: "custom" | "currency" = "custom"): string {
  if (type === "currency") {
    if (!value) return "0";

    const unMaskedValue = value.replace(/\D/g, "");
    const number = parseInt(unMaskedValue.trimStart());

    return number.toString();
  }

  return value.replace(/\W/g, "");
}

function masker(
  value: string,
  pattern: string,
  options: OptionPattern
): string {
  return toPattern(value, { ...options, pattern });
}

function currencyMasker(
  value: string = "0",
  options: CurrencyMaskOptionPattern
): string {
  const {
    prefix,
    decimalSeparator,
    groupSeparator,
    precision,
    groupSize,
    secondaryGroupSize,
    fractionGroupSeparator,
    fractionGroupSize,
    suffix,
  } = options;

  const precisionDivider = parseInt(1 + "0".repeat(precision || 0));
  const number = parseInt(value) / precisionDivider;

  const formatter = {
    prefix,
    decimalSeparator,
    groupSeparator,
    groupSize: groupSize || 3,
    secondaryGroupSize,
    fractionGroupSeparator,
    fractionGroupSize,
    suffix,
  };

  const bigNumber = new BigNumber(number);

  BigNumber.config({ FORMAT: formatter });

  return bigNumber.toFormat(precision);
}

function multimasker(
  value: string,
  patterns: string[],
  options: OptionPattern
): string {
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

function mask(
  value: string | number,
  pattern: string | string[] = "",
  type: "custom" | "currency" = "custom",
  options?: OptionPattern | CurrencyMaskOptionPattern
): string {
  if (type === "currency") {
    if (instanceOfCurrencyMaskOptionPattern(options)) {
      return currencyMasker(String(value), options);
    }
    throw "Option Schema not allowed";
  }

  if (typeof pattern === "string") {
    if (instanceOfOptionPattern(options)) {
      return masker(String(value), pattern || "", options);
    }
    throw "Option Schema not allowed";
  }

  return multimasker(String(value), pattern, {
    pattern: "",
    placeholder: "",
  });
}

export { mask, unMask };
