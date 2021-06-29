import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
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

export const MaskedTextInputComponent: ForwardRefRenderFunction<
  TextInput,
  MaskedTextInputProps
> = (
  {
    mask: pattern = "",
    type = "custom",
    options = {} as MaskOptions,
    onChangeText,
    ...rest
  },
  ref
) => {
  const initialMaskedValue =
    type === "currency" ? mask("0", pattern, type, options) : "";
  const initialUnMaskedValue = type === "currency" ? "0" : "";

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
      ref={ref}
      {...rest}
    />
  );
};

export const MaskedTextInput = forwardRef(MaskedTextInputComponent);
