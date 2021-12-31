import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MaskedTextInput } from './MaskedTextInput';
import { Button, Keyboard, InputAccessoryView } from 'react-native';


describe('<MaskedTextInput />', () => {
  const mockedOnChangeText = jest.fn();

  test('should renders correctly with custom mask', () => {
    const container = render(
      <MaskedTextInput mask="AAA-999" onChangeText={mockedOnChangeText} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('should renders correctly with custom mask default value', () => {
    const container = render(
      <MaskedTextInput
        mask="AAA-999"
        onChangeText={mockedOnChangeText}
        defaultValue="ABC-123"
      />
    );
    expect(container.getByDisplayValue('ABC-123')).toBeTruthy()
  });

  test('should renders correctly with currency mask', () => {
    const container = render(
      <MaskedTextInput
        type="currency"
        options={{
          prefix: '$',
          decimalSeparator: '.',
          groupSeparator: ',',
          precision: 2,
        }}
        onChangeText={mockedOnChangeText}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should mask input text with custom mask', async () => {
    const container = render(
      <MaskedTextInput
        mask="AAA-999"
        onChangeText={mockedOnChangeText}
        testID="masked-text-input"
      />
    );

    fireEvent.changeText(container.getByTestId('masked-text-input'), 'RCT777')

    await waitFor(() => {
      expect(container.getByDisplayValue('RCT-777')).toBeTruthy()
    })
  });

  test('should mask input text with currency mask', async () => {
    const container = render(
      <MaskedTextInput
        type="currency"
        options={{
          prefix: '$',
          decimalSeparator: '.',
          groupSeparator: ',',
          precision: 2,
        }}
        onChangeText={mockedOnChangeText}
        testID="masked-text-input"
      />
    );

    fireEvent.changeText(container.getByTestId('masked-text-input'), '5999')

    await waitFor(() => {
      expect(container.getByDisplayValue('$59.99')).toBeTruthy()
    })
  });

  test('should renders correctly with an accessory view', () => {
    const container = render(
      <MaskedTextInput         
      type="currency"
      options={{
        prefix: '$',
        decimalSeparator: '.',
        groupSeparator: ',',
        precision: 2,
      }} 
      onChangeText={mockedOnChangeText} 
      inputAccessoryViewID='Done'
      inputAccessoryView={
        <InputAccessoryView nativeID='Done'>
        <Button
          onPress={() => Keyboard.dismiss()}
          title="Clear text"
        />
        </InputAccessoryView>
      }
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
