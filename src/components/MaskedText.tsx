import React from 'react'
import { Text, TextProps } from 'react-native'
import { mask } from '../utils/mask'
import type { MaskOptions } from '../@types/MaskOptions'

export interface MaskedTextProps {
  children: string
  mask?: string
  type?: 'custom' | 'currency'
  options?: MaskOptions
}

export function MaskedText({
  children: text,
  mask: pattern = '',
  type = 'custom',
  options = {} as MaskOptions,
  ...rest
}: MaskedTextProps & TextProps): JSX.Element {
  return <Text {...rest}>{mask(text, pattern, type, options)}</Text>;
}
