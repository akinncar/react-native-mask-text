import React from 'react'
import { render } from '@testing-library/react-native';
import { MaskedText } from './MaskedText';

describe('<MaskedText />', () => {
  test('should renders correctly with custom mask', () => {
    const container = render(<MaskedText mask="AAA-999">RCT777</MaskedText>);

    expect(container.getByText('RCT-777')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  test('should renders correctly with currency mask', () => {
    const container = render(
      <MaskedText
        type="currency"
        options={{
          prefix: '$',
          decimalSeparator: '.',
          groupSeparator: ',',
          precision: 2,
        }}
      >
        5999
      </MaskedText>
    );

    expect(container.getByText('$59.99')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });
  test('should be bold when the textBold attribute is added', () => {
    const container  =
    render(<MaskedText textBold mask="99/99/9999">
        30081990
      </MaskedText>)
      expect(container.getByText('30/08/1990')).toHaveStyle({fontWeight: 'bold' });
    });
    test('should be italic when the textItalic attribute is added', () => {
      const container  =
      render(<MaskedText textItalic mask="99/99/9999">
          30081990
        </MaskedText>)
        expect(container.getByText('30/08/1990')).toHaveStyle({fontStyle: 'italic' });
    });
    test('should be the line style added to the text when the textDecoration attribute has a non-null value', () => {
      const textDecorationLine = 'underline'
      const container  =
      render(<MaskedText textDecoration={textDecorationLine} mask="99/99/9999">
          30081990
        </MaskedText>)
        expect(container.getByText('30/08/1990')).toHaveStyle({textDecorationLine: textDecorationLine });
    });    
})
