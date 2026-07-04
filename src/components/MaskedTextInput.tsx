import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { mask, unMask } from '../utils/mask'
import type { FormatType, MaskOptions, StyleObj, TextDecorationOptions } from '../@types'


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
  
  const isMasked = () => pattern || type === 'currency'
  
  const getMaskedValue = (value: string) =>
    mask(value, pattern, type, options, autoCapitalize)
  
  const getUnMaskedValue = (value: string) =>
    unMask(value, type as 'custom' | 'currency')

  const updateStatesWithMasking = (inputValue: string) => {
    const newUnMaskedValue = getUnMaskedValue(inputValue)
    const newMaskedValue = getMaskedValue(newUnMaskedValue)
    
    setMaskedValue(newMaskedValue)
    setUnmaskedValue(newUnMaskedValue)
    setRawValue(inputValue)
  }

  const updateStatesWithoutMasking = (inputValue: string) => {
    setMaskedValue(inputValue)
    setUnmaskedValue(inputValue)
    setRawValue(inputValue)
  }

  const clearAllStates = () => {
    setMaskedValue('')
    setUnmaskedValue('')
    setRawValue('')
  }

  const defaultValueCustom = defaultValue || ''
  const defaultValueCurrency = defaultValue || '0'
  const initialRawValue = value

  const initialMaskedValue = isMasked()
    ? getMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom)
    : (value || defaultValueCustom)

  const initialUnMaskedValue = isMasked()
    ? getUnMaskedValue(type === 'currency' ? defaultValueCurrency : defaultValueCustom)
    : (value || defaultValueCustom)

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue)
  const [unMaskedValue, setUnmaskedValue] = useState(initialUnMaskedValue)
  const [rawValue, setRawValue] = useState(initialRawValue)
  const [isInitialRender, setIsInitialRender] = useState(true)

  const actualValue = isMasked() ? maskedValue : rawValue


  const handleChange = (inputValue: string) => {
    if (isMasked()) {
      updateStatesWithMasking(inputValue)
    } else {
      updateStatesWithoutMasking(inputValue)
    }
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    if (isMasked()) {
      onChangeText(maskedValue, unMaskedValue)
    } else {
      onChangeText(rawValue || '', rawValue || '')
    }
  }, [maskedValue, unMaskedValue, rawValue])

  useEffect(() => {
    if (value) {
      if (isMasked()) {
        setMaskedValue(getMaskedValue(value))
        setUnmaskedValue(getUnMaskedValue(value))
      } else {
        updateStatesWithoutMasking(value)
      }
    } else {
      if (isMasked()) {
        setMaskedValue(initialMaskedValue)
        setUnmaskedValue(initialUnMaskedValue)
      } else {
        clearAllStates()
      }
    }
  }, [value])

  return (
    <>
      <TextInput
        onChangeText={handleChange}
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
