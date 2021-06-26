import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { mask, unMask } from "../utils/mask";
import type { MaskOptions } from "../@types/MaskOptions";

type TIProps = Omit<TextInputProps, "onChangeText">;

interface MaskedTextInputProps extends TIProps {
  mask?: string;
  type?: "custom" | "currency";
  options?: MaskOptions;
  onChangeText: (text: string, rawText: string) => void;
}

export function MaskedTextInput({
  mask: pattern = "",
  type = "custom",
  options = {} as MaskOptions,
  onChangeText,
  ...rest
}: MaskedTextInputProps) {
  const initialMaskedValue = type === "currency" ? mask("0", pattern, type, options) : ""
  const initialUnMaskedValue = type === "currency" ? "0" : ""

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue);
  const [unMaskedValue, setUnmaskedValue] = useState(initialUnMaskedValue);

  function onChange(value: string) {
    const newUnMaskedValue = unMask(value, type);
    const newMaskedValue = mask(newUnMaskedValue, pattern, type, options);

    setMaskedValue(newMaskedValue);
    setUnmaskedValue(newUnMaskedValue);
  }

  useEffect(() => {
    onChangeText(maskedValue, unMaskedValue);
  }, [maskedValue, unMaskedValue]);

  return (
    <TextInput
      onChangeText={(value) => onChange(value)}
      value={maskedValue}
      {...rest}
    />
  );
}
