import React from "react";
import { Text } from "react-native";
import { mask } from "../utils/mask";

interface MaskedTextProps {
  children: string;
  mask: string;
}

export default function MaskedText({
  children: text,
  mask: pattern,
  ...rest
}: MaskedTextProps) {
  return <Text {...rest}>{mask(text, pattern)}</Text>;
}
