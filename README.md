# react-native-mask-text

This is a library to mask Text and Input components in React Native and Expo (Android, iOS and Web).

## Install

```shell
yarn add react-native-mask-text
```

## Custom Mask

Pattern used in masked components:

- `9` - accept digit.
- `A` - accept alpha.
- `S` - accept alphanumeric.

Ex: AAA-9999

## Usage (MaskedTextInput)

Component similar with `<TextInput />` but with custom mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  mask="AAA-9999"
  onChangeText={(text, rawText) => {
    console.log(text);
    console.log(rawText);
  }}
  style={styles.input}
/>;

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

## Usage (MaskedText)

Component similar with `<Text />` but with custom mask option.

```jsx
import { MaskedText } from "react-native-mask-text";

//...

<MaskedText mask="99/99/9999">30081990</MaskedText>;
```

## Example

You can see an example app with Expo CLI [here](example/App.js).

## Contributing

See [Contributing.md](Contributing.md)

## License

The app's source code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.

## Contact

Akinn Rosa - [Github](https://github.com/akinncar) - **[akinncar@hotmail.com](mailto:akinncar@hotmail.com)**
