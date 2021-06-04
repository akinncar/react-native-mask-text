import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { mask, unMask } from "../utils/mask";

type TIProps = Omit<TextInputProps, "onChangeText">;

interface MaskedTextInputProps extends TIProps {
  mask: string;
  onChangeText: (text: string, rawText: string) => void;
}

export function MaskedTextInput({
  mask: pattern,
  onChangeText,
  ...rest
}: MaskedTextInputProps) {
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
