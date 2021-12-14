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
}

export const MaskedTextInputComponent: ForwardRefRenderFunction<
  TextInput,
  MaskedTextInputProps
> = (
  {
    mask: pattern = '',
    type = 'custom',
    options = {} as MaskOptions,
    defaultValue: defaultValueProp,
    onChangeText,
    ...rest
  },
  ref
): JSX.Element => {
  
  const defaultValue = defaultValueProp || (type === 'currency' ? '0' : '')

  const [maskedValue, setMaskedValue] = useState(() => mask(defaultValue, pattern, type, options));
  const [unMaskedValue, setUnmaskedValue] = useState(() => unMask(defaultValue, type));

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
