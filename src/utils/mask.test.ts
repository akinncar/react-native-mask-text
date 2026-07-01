import { mask, unMask } from './mask'

test('should mask with number digit pattern', () => {
  const expected = '342.934.480-80'
  const received = mask('34293448080', '999.999.999-99')

  expect(received).toBe(expected)
})

test('should mask with alpha pattern', () => {
  const expected = 'react-native'
  const received = mask('react native', 'AAAAA-AAAAAA')

  expect(received).toBe(expected)
})

test('should mask with alphanumeric pattern', () => {
  const expected = 'rct-777'
  const received = mask('rct 777', 'AAA-999')

  expect(received).toBe(expected)
})

test('should mask with currency mask', () => {
  const expected = '$59.99'
  const received = mask('5999', '', 'currency', {
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2,
  })

  expect(received).toBe(expected)
})

test('should mask currency with group separator for large numbers', () => {
  const expected = 'R$ 1.234.567,89'
  const received = mask('123456789', '', 'currency', {
    prefix: 'R$ ',
    decimalSeparator: ',',
    groupSeparator: '.',
    precision: 2,
  })

  expect(received).toBe(expected)
})

test('should mask currency with a suffix and zero precision', () => {
  const expected = '1,234 USD'
  const received = mask('1234', '', 'currency', {
    groupSeparator: ',',
    precision: 0,
    suffix: ' USD',
  })

  expect(received).toBe(expected)
})

test('should mask date with the default format', () => {
  const expected = '2025/01/01'
  const received = mask('20250101', '', 'date', {})

  expect(received).toBe(expected)
})

test('should mask date with a custom format', () => {
  const expected = '01/01/2025'
  const received = mask('01012025', '', 'date', { dateFormat: 'dd/mm/yyyy' })

  expect(received).toBe(expected)
})

test('should mask time with the default format', () => {
  const expected = '12:30:45'
  const received = mask('123045', '', 'time', {})

  expect(received).toBe(expected)
})

test('should mask time with a custom format', () => {
  const expected = '12:34'
  const received = mask('1234', '', 'time', { timeFormat: 'HH:mm' })

  expect(received).toBe(expected)
})

test('should pick the shorter pattern for a short value with multiple masks', () => {
  const expected = '(12) 3456-7890'
  const received = mask('1234567890', ['(99) 9999-9999', '(99) 99999-9999'])

  expect(received).toBe(expected)
})

test('should pick the longer pattern for a long value with multiple masks', () => {
  const expected = '(12) 34567-8901'
  const received = mask('12345678901', ['(99) 9999-9999', '(99) 99999-9999'])

  expect(received).toBe(expected)
})

test('should coerce a number value to a string before masking', () => {
  const expected = '342.934.480-80'
  const received = mask(34293448080, '999.999.999-99')

  expect(received).toBe(expected)
})

test('should return an empty string when value and pattern are empty', () => {
  const received = mask('', '')

  expect(received).toBe('')
})

test('should unMask text', () => {
  const expected = '34293448080'
  const received = unMask('342.934.480-80')

  expect(received).toBe(expected)
})

test('should unMask currency', () => {
  const expected = '5999'
  const received = unMask('$59.99', 'currency')

  expect(received).toBe(expected)
})

test('should unMask an empty currency value to zero', () => {
  const expected = '0'
  const received = unMask('', 'currency')

  expect(received).toBe(expected)
})

test('should default the unMask type to custom', () => {
  const expected = 'ABC123'
  const received = unMask('ABC-123')

  expect(received).toBe(expected)
})
