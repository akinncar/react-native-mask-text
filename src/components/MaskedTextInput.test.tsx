import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MaskedTextInput } from './MaskedTextInput';

describe('<MaskedTextInput />', () => {
  const mockedOnChangeText = jest.fn();

  test('should renders correctly', () => {
    const container = render(<MaskedTextInput mask="AAA-999" onChangeText={mockedOnChangeText} />);
    expect(container).toMatchSnapshot();
  });

  test('should mask input text', async () => {
    const container = render(
      <MaskedTextInput mask="AAA-999" onChangeText={mockedOnChangeText} testID="masked-text-input"/>
    );

    fireEvent.changeText(container.getByTestId("masked-text-input"), 'RCT777')

    await waitFor(() => {
      expect(mockedOnChangeText).toHaveBeenCalledTimes(3);
      expect(container.getByDisplayValue("RCT-777")).toBeTruthy();
    })
  });
})