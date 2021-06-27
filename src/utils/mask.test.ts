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
    precision: 2
  })

  expect(received).toBe(expected)
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