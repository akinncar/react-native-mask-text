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
      <MaskedText type="currency" options={{
        prefix: '$',
        decimalSeparator: '.',
        groupSeparator: ',',
        precision: 2
      }}>5999</MaskedText>
    );

    expect(container.getByText('$59.99')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });
})