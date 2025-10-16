import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { mask, unMask } from '../utils/mask'
import type {
  FormatType,
  MaskOptions,
  StyleObj,
  TextDecorationOptions,
} from 'src/@types'

type TIProps = Omit<TextInputProps, 'onChangeText'>
export interface MaskedTextInputProps extends TIProps {
  mask?: string
  type?: FormatType
  options?: MaskOptions
  defaultValue?: string
  onChangeText: (text: string, rawText: string) => void
  inputAccessoryView?: JSX.Element
  textBold?: boolean
  textItalic?: boolean
  textDecoration?: TextDecorationOptions
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
      textDecorationLine: textDecoration,
    },
    style,
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
    setRawValue(inputValue)
    latestValuesRef.current = {
      masked: newMaskedValue,
      unMasked: newUnMaskedValue,
      raw: inputValue,
    }
  }

  const updateStatesWithoutMasking = (inputValue: string) => {
    setMaskedValue(inputValue)
    setRawValue(inputValue)
  }

  const clearAllStates = () => {
    setMaskedValue('')
    setRawValue('')
  }

  const defaultValueCustom = defaultValue || ''
  const defaultValueCurrency = defaultValue || '0'
  const initialRawValue = value

  const initialMaskedValue = isMasked()
    ? getMaskedValue(
        type === 'currency' ? defaultValueCurrency : defaultValueCustom
      )
    : value || defaultValueCustom

  const initialUnMaskedValue = isMasked()
    ? getUnMaskedValue(
        type === 'currency' ? defaultValueCurrency : defaultValueCustom
      )
    : value || defaultValueCustom

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue)
  const [rawValue, setRawValue] = useState(initialRawValue)
  const rafHandleRef = useRef<number | null>(null)
  const timeoutHandleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestValuesRef = useRef<{
    masked: string
    unMasked: string
    raw: string | undefined
  }>({
    masked: initialMaskedValue,
    unMasked: initialUnMaskedValue,
    raw: initialRawValue,
  })

  const actualValue = isMasked() ? maskedValue : rawValue

  const handleChange = (inputValue: string) => {
    if (
      rafHandleRef.current != null &&
      typeof cancelAnimationFrame === 'function'
    ) {
      cancelAnimationFrame(rafHandleRef.current)
      rafHandleRef.current = null
    }
    if (timeoutHandleRef.current != null) {
      clearTimeout(timeoutHandleRef.current)
      timeoutHandleRef.current = null
    }

    if (isMasked()) {
      updateStatesWithMasking(inputValue)
    } else {
      updateStatesWithoutMasking(inputValue)
      latestValuesRef.current = {
        masked: inputValue,
        unMasked: inputValue,
        raw: inputValue,
      }
    }

    const emit = () => {
      const { masked, unMasked, raw } = latestValuesRef.current
      if (isMasked()) {
        onChangeText(masked, unMasked)
      } else {
        onChangeText(raw || '', raw || '')
      }
    }

    if (typeof requestAnimationFrame === 'function') {
      rafHandleRef.current = requestAnimationFrame(() => {
        rafHandleRef.current = null
        emit()
      })
    } else {
      timeoutHandleRef.current = setTimeout(() => {
        timeoutHandleRef.current = null
        emit()
      }, 0)
    }
  }

  useEffect(() => {
    return () => {
      if (
        rafHandleRef.current != null &&
        typeof cancelAnimationFrame === 'function'
      ) {
        cancelAnimationFrame(rafHandleRef.current)
        rafHandleRef.current = null
      }
      if (timeoutHandleRef.current != null) {
        clearTimeout(timeoutHandleRef.current)
        timeoutHandleRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (value) {
      if (isMasked()) {
        setMaskedValue(getMaskedValue(value))
      } else {
        updateStatesWithoutMasking(value)
      }
    } else {
      if (isMasked()) {
        setMaskedValue(initialMaskedValue)
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
