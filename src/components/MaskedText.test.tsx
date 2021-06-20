import { render } from '@testing-library/react-native';
import { MaskedText } from './MaskedText';

describe('<MaskedText />', () => {
  test('should renders correctly', () => {
    const container = render(<MaskedText mask="AAA-999">RCT777</MaskedText>);

    expect(container.getByText('RCT-777')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });
})