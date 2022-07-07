import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaskedTextInput, MaskedText } from 'react-native-mask-text'

export default function App() {
  const [maskedValue, setMaskedValue] = useState('')
  const [unMaskedValue, setUnmaskedValue] = useState('')

  const [currencyMaskedValue, setCurrencyMaskedValue] = useState('')
  const [currencyUnMaskedValue, setCurrencyUnmaskedValue] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MaskedTextInput Component:</Text>
      <MaskedTextInput
        mask="AAA-999"
        onChangeText={(text, rawText) => {
          setMaskedValue(text)
          setUnmaskedValue(rawText)
        }}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.paragraph}>Raw Text: {unMaskedValue}</Text>
      <Text style={styles.paragraph}>Masked Text: {maskedValue}</Text>

      <Text style={styles.title}>MaskedTextInput Component with Currency:</Text>
      <MaskedTextInput
        type="currency"
        options={{
          prefix: '$',
          decimalSeparator: '.',
          groupSeparator: ',',
          precision: 2,
        }}
        onChangeText={(text, rawText) => {
          setCurrencyMaskedValue(text)
          setCurrencyUnmaskedValue(rawText)
        }}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.paragraph}>Raw Text: {currencyUnMaskedValue}</Text>
      <Text style={styles.paragraph}>Masked Text: {currencyMaskedValue}</Text>

      <Text style={styles.title}>MaskedText Component:</Text>
      <MaskedText mask="99/99/9999" style={styles.paragraph}>
        30081990
      </MaskedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
})
