import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { mask, unMask } from '../utils/mask'
import type { MaskOptions } from '../@types/MaskOptions'

type TIProps = Omit<TextInputProps, 'onChangeText'>

export interface MaskedTextInputProps extends TIProps {
  mask?: string
  type?: 'custom' | 'currency'
  options?: MaskOptions
  defaultValue?: string
  onChangeText: (text: string, rawText: string) => void
  inputAccessoryView?: JSX.Element;
}

export const MaskedTextInputComponent: ForwardRefRenderFunction<
  TextInput,
  MaskedTextInputProps
> = (
  {
    mask: pattern = '',
    type = 'custom',
    options = {} as MaskOptions,
    defaultValue,
    onChangeText,
    inputAccessoryView,
    ...rest
  },
  ref
): JSX.Element => {
  const defaultValueCustom = defaultValue || ''
  const defaultValueCurrency = defaultValue || '0'

  const initialMaskedValue =    type === 'currency'
      ? mask(defaultValueCurrency, pattern, type, options)
      : mask(defaultValueCustom, pattern, type, options);

  const initialUnMaskedValue =    type === 'currency'
      ? unMask(defaultValueCurrency, type)
      : unMask(defaultValueCustom, type);

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
    <>
      <TextInput
        onChangeText={(value) => onChange(value)}
        ref={ref}
        maxLength={pattern.length || undefined}
        {...rest}
        value={maskedValue}
      />
      {inputAccessoryView}
    </>
  );
};

export const MaskedTextInput = forwardRef(MaskedTextInputComponent);
