import { DIGIT, ALPHA, ALPHANUM } from "./constants.json";

function addPlaceholder(
  output: string[],
  index: number,
  placeholder: string
): string[] {
  for (let newIndex = index; newIndex < output.length; newIndex++) {
    if (
      output[newIndex] === DIGIT ||
      output[newIndex] === ALPHA ||
      output[newIndex] === ALPHANUM
    ) {
      // eslint-disable-next-line no-param-reassign
      output[newIndex] = placeholder;
    }
  }
  return output;
}

export default addPlaceholder;
