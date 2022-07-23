import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { mask, unMask } from '../utils/mask'
import type { MaskOptions } from '../@types/MaskOptions'
import type { FormatType } from '../@types/FormatType'

type TIProps = Omit<TextInputProps, 'onChangeText'>

export interface MaskedTextInputProps extends TIProps {
  mask?: string
  type?: FormatType
  options?: MaskOptions
  defaultValue?: string
  onChangeText: (text: string, rawText: string) => void
  inputAccessoryView?: JSX.Element
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
    value,
    inputAccessoryView,
    ...rest
  },
  ref
): JSX.Element => {
  const getMaskedValue = (value: string) => mask(value, pattern, type, options)
  const getUnMaskedValue = (value: string) =>
    unMask(value, type as 'custom' | 'currency')

  const defaultValueCustom = defaultValue || ''
  const defaultValueCurrency = defaultValue || '0'

  const initialMaskedValue = getMaskedValue(
    type === 'currency' ? defaultValueCurrency : defaultValueCustom
  )

  const initialUnMaskedValue = getUnMaskedValue(
    type === 'currency' ? defaultValueCurrency : defaultValueCustom
  )

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue)
  const [unMaskedValue, setUnmaskedValue] = useState(initialUnMaskedValue)

  function onChange(value: string) {
    const newUnMaskedValue = unMask(value, type as 'custom' | 'currency')
    const newMaskedValue = mask(newUnMaskedValue, pattern, type, options)

    setMaskedValue(newMaskedValue)
    setUnmaskedValue(newUnMaskedValue)
  }

  useEffect(() => {
    onChangeText(maskedValue, unMaskedValue)
  }, [maskedValue, unMaskedValue])

  useEffect(() => {
    if (value) {
      setMaskedValue(getMaskedValue(value))
      setUnmaskedValue(getUnMaskedValue(value))
    } else {
      setMaskedValue(initialMaskedValue)
      setUnmaskedValue(initialUnMaskedValue)
    }
  }, [value])

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
  )
}

export const MaskedTextInput = forwardRef(MaskedTextInputComponent)
