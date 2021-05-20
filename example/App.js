import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaskedTextInput, MaskedText } from "react-native-mask-text";

export default function App() {
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MaskedTextInput Component:</Text>
      <MaskedTextInput
        mask="99/99/9999"
        onChangeText={(text, rawText) => {
          setMaskedValue(text);
          setUnmaskedValue(rawText);
        }}
        style={styles.input}
      />
      <Text style={styles.paragraph}>Raw Text: {unMaskedValue}</Text>
      <Text style={styles.paragraph}>Masked Text: {maskedValue}</Text>

      <Text style={styles.title}>MaskedText Component:</Text>
      <MaskedText mask="99/99/9999" style={styles.paragraph}>
        30081990
      </MaskedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
