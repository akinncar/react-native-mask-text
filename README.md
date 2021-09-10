# react-native-mask-text
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

See [Contributing.md](Contributing.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://medium.com/@akinncar"><img src="https://avatars.githubusercontent.com/u/42688281?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Akinn Rosa</b></sub></a><br /><a href="https://github.com/akinncar/react-native-mask-text/commits?author=akinncar" title="Code">💻</a> <a href="https://github.com/akinncar/react-native-mask-text/commits?author=akinncar" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/joaoaugustoperin/"><img src="https://avatars.githubusercontent.com/u/49156424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>João Augusto Perin</b></sub></a><br /><a href="https://github.com/akinncar/react-native-mask-text/commits?author=joojscript" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jimmi-joensson"><img src="https://avatars.githubusercontent.com/u/15996198?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jimmi Jønsson</b></sub></a><br /><a href="https://github.com/akinncar/react-native-mask-text/commits?author=jimmi-joensson" title="Code">💻</a></td>
    <td align="center"><a href="https://brenonunes.dev"><img src="https://avatars.githubusercontent.com/u/37773859?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Breno Nunes</b></sub></a><br /><a href="https://github.com/akinncar/react-native-mask-text/commits?author=Brenont" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

The app's source code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.

## Contact

Akinn Rosa - [Github](https://github.com/akinncar) - **[akinncar@hotmail.com](mailto:akinncar@hotmail.com)**
