import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { mask, unMask } from '../utils/mask'
import type { FormatType, MaskOptions, StyleObj, TextDecorationOptions } from 'src/@types'


type TIProps = Omit<TextInputProps, 'onChangeText'>
export interface MaskedTextInputProps extends TIProps {
  mask?: string
  type?: FormatType
  options?: MaskOptions
  defaultValue?: string
  onChangeText: (text: string, rawText: string) => void
  inputAccessoryView?: JSX.Element
  textBold?: boolean
  textItalic?:boolean
  textDecoration?:TextDecorationOptions
  style?: StyleObj
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
    autoCapitalize = 'sentences',
    textBold,
    textItalic,
    textDecoration,
    style,
    ...rest
  },
  ref
): JSX.Element => {
  const styleSheet = [
    {
      fontWeight: textBold && 'bold',
      fontStyle: textItalic && 'italic',
      textDecorationLine: textDecoration
    },
    style
  ]
  const getMaskedValue = (value: string) =>
    mask(value, pattern, type, options, autoCapitalize)
  const getUnMaskedValue = (value: string) =>
    unMask(value, type as 'custom' | 'currency')

  const defaultValueCustom = defaultValue || ''
  const defaultValueCurrency = defaultValue || '0'

  const initialRawValue = value;

  const initialMaskedValue = getMaskedValue(
    type === 'currency' ? defaultValueCurrency : defaultValueCustom
  )

  const initialUnMaskedValue = getUnMaskedValue(
    type === 'currency' ? defaultValueCurrency : defaultValueCustom
  )

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue)
  const [unMaskedValue, setUnmaskedValue] = useState(initialUnMaskedValue)
  const [rawValue, setRawValue] = useState(initialRawValue);
  const [isInitialRender, setIsInitialRender] = useState(true)

  const actualValue = pattern || type === "currency" ? maskedValue : rawValue;

  function onChange(value: string) {
    const newUnMaskedValue = unMask(value, type as 'custom' | 'currency')
    const newMaskedValue = mask(newUnMaskedValue, pattern, type, options)

    setMaskedValue(newMaskedValue)
    setUnmaskedValue(newUnMaskedValue)
    setRawValue(value);
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

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
        autoCapitalize={autoCapitalize}
        {...rest}
        value={actualValue}
        style={styleSheet as StyleObj}
      />
      {inputAccessoryView}
    </>
  )
}

export const MaskedTextInput = forwardRef(MaskedTextInputComponent)
