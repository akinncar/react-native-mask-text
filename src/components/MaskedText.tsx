import { Text, TextProps } from "react-native";
import { mask } from "../utils/mask";

interface MaskedTextProps {
  children: string;
  mask?: string;
  type?: "custom" | "currency";
  options?: any;
}

export function MaskedText({
  children: text,
  mask: pattern = "",
  type = "custom",
  options = {},
  ...rest
}: MaskedTextProps & TextProps) {
  return <Text {...rest}>{mask(text, pattern, type, options)}</Text>;
}
