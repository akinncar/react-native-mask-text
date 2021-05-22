import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { mask, unMask } from "../utils/mask";

interface OnChangeTextProps {
  text: String;
  rawText: String;
}

interface MaskedTextInputProps {
  mask: string;
  onChangeText: (
    maskedValue: string,
    unMaskedValue: string
  ) => OnChangeTextProps;
}

export default function MaskedTextInput({
  mask: pattern,
  onChangeText,
  ...rest
}: MaskedTextInputProps & TextInputProps) {
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  function onChange(value: string) {
    const newMaskedValue = mask(value, pattern);

    setMaskedValue(newMaskedValue);
    setUnmaskedValue(unMask(newMaskedValue));
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
