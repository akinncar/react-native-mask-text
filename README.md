# react-native-mask-text

This is a library to mask Text and Input components in React Native and Expo (Android, iOS and Web).

## Motivation

This package was created based on other libraries of React Native text mask, with the goal of meeting the need of having a package to be used with all React Native contexts (multi-platform concept) and also be maintained currently. You can read [this blog post on Substack](https://akinncar.substack.com/p/why-another-mask-text-package) to see more information about the creation to the current moment of this package.

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

### Usage MaskedTextInput (custom)

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

### Usage MaskedText (custom)

Component similar with `<Text />` but with custom mask option.

```jsx
import { MaskedText } from "react-native-mask-text";

//...

<MaskedText mask="99/99/9999">30081990</MaskedText>;
```

## Date Mask

These options only are used if you use prop `type="date"` in your component:

| Option                 | Type   | Mandatory | Default Value | Description                                 |
|------------------------|--------|-----------|---------------|---------------------------------------------|
| dateFormat             | string | No        | yyyy/mm/dd    | Date Format                                 |

### Usage MaskedTextInput (date)

Component similar with `<TextInput />` but with date mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  type="date"
  options={{
    dateFormat: 'YYYY/DD/MM',
  }}
  onChangeText={(text, rawText) => {
    console.log(text);
    console.log(rawText);
  }}
  style={styles.input}
  keyboardType="numeric"
/>

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

## Time Mask

These options only are used if you use prop `type="time"` in your component:

| Option                 | Type   | Mandatory | Default Value | Description                                 |
|------------------------|--------|-----------|---------------|---------------------------------------------|
| timeFormat             | string | No        | HH:mm:ss      | Time Format                                 |

### Usage MaskedTextInput (time)

Component similar with `<TextInput />` but with time mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  type="time"
  options={{
    timeFormat: 'HH:mm:ss', // or 'HH:mm'
  }}
  onChangeText={(text, rawText) => {
    setMaskedValue(text)
    setUnmaskedValue(rawText)
  }}
  style={styles.input}
  keyboardType="numeric"
/>

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

## Currency Mask

These options only are used if you use prop `type="currency"` in your component:

| Option                 | Type   | Mandatory | Default Value | Description                                 |
|------------------------|--------|-----------|---------------|---------------------------------------------|
| prefix                 | string | No        | null          | String to prepend                           |
| decimalSeparator       | string | No        | null          | Separation for decimals                     |
| groupSeparator         | string | No        | null          | Grouping separator of the integer part      |
| precision              | number | No        | 0             | Precision for fraction part (cents)         |
| groupSize              | number | No        | 3             | Primary grouping size of the integer part   |
| secondaryGroupSize     | number | No        | null          | Secondary grouping size of the integer part |
| fractionGroupSeparator | string | No        | null          | Grouping separator of the fraction part     |
| fractionGroupSize      | number | No        | null          | Grouping size of the fraction part          |
| suffix                 | string | No        | null          | String to append                            |

### Usage MaskedTextInput (currency)

Component similar with `<TextInput />` but with currency mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  type="currency"
  options={{
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
  }}
  onChangeText={(text, rawText) => {
    console.log(text);
    console.log(rawText);
  }}
  style={styles.input}
  keyboardType="numeric"
/>

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

### Usage MaskedText (currency)

Component similar with `<Text />` but with currency mask option.

```jsx
import { MaskedText } from "react-native-mask-text";

//...

<MaskedText
  type="currency"
  options={{
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
  }}
>
  5999
</MaskedText>;
```

## Usage `mask` function

Function used to mask text.

```js
import { mask } from "react-native-mask-text";

const code = mask("ABC1234","AAA-9999") // return ABC-1234
```

## Usage `unMask` function

Function used to remove text mask.

```js
import { unMask } from "react-native-mask-text";

const code = unMask("ABC-1234") // return ABC1234
```

## Example

You can see an example app with Expo CLI [here](example/App.js).

You can see a SignUp example on Expo Snack working with iOS, Mobile, and Web [here](https://snack.expo.dev/@brenont/react-native-mask-text-example).

## Contributing

See [Contributing.md](CONTRIBUTING.md)

## License

The app's source code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.

## Contact

Akinn Rosa - [Github](https://github.com/akinncar) - **[akinncar@hotmail.com](mailto:akinncar@hotmail.com)**
