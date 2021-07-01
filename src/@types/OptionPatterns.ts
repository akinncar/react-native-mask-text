export type OptionPattern = {
  pattern: string;
  placeholder: string;
};

export function instanceOfOptionPattern(object: any): object is OptionPattern {
  return (
    "pattern" in object &&
    typeof object["pattern"] === "string" &&
    "placeholder" in object &&
    typeof object["placeholder"] === "string"
  );
}

export type CurrencyMaskOptionPattern = {
  prefix?: string;
  decimalSeparator?: string;
  groupSeparator?: string;
  groupSize?: number;
  secondaryGroupSize?: number;
  fractionGroupSeparator?: string;
  fractionGroupSize?: number;
  suffix?: string;
  precision?: number;
};

export function instanceOfCurrencyMaskOptionPattern(
  object: any
): object is CurrencyMaskOptionPattern {
  return (
    ("prefix" in object && typeof object["prefix"] === "string") ||
    ("decimalSeparator" in object &&
      typeof object["decimalSeparator"] === "string") ||
    ("groupSeparator" in object &&
      typeof object["groupSeparator"] === "string") ||
    ("groupSize" in object && typeof object["groupSize"] === "number") ||
    ("secondaryGroupSize" in object &&
      typeof object["secondaryGroupSize"] === "number") ||
    ("fractionGroupSeparator" in object &&
      typeof object["fractionGroupSeparator"] === "string") ||
    ("fractionGroupSize" in object &&
      typeof object["fractionGroupSize"] === "number") ||
    ("suffix" in object && typeof object["suffix"] === "string") ||
    ("precision" in object && typeof object["precision"] === "number")
  );
}
