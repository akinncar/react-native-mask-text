import toPattern from './toPattern'

test('should format a value that fully fills the pattern', () => {
  const received = toPattern('34293448080', '999.999.999-99')

  expect(received).toBe('342.934.480-80')
})

test('should accept a string option pattern', () => {
  const received = toPattern('123', '999')

  expect(received).toBe('123')
})

test('should stop at the first unfilled magic character when no placeholder is given', () => {
  const received = toPattern('342', '999.999.999-99')

  expect(received).toBe('342')
})

test('should keep literal separators already reached by the input', () => {
  const received = toPattern('3429', '999.999')

  expect(received).toBe('342.9')
})

test('should fill remaining magic characters with the placeholder', () => {
  const received = toPattern('123', { pattern: '999.999', placeholder: '_' })

  expect(received).toBe('123.___')
})

test('should replace every magic type with the placeholder', () => {
  const received = toPattern('1', { pattern: '9A-S', placeholder: '*' })

  expect(received).toBe('1*-*')
})

test('should not append a placeholder when the pattern is completely filled', () => {
  const received = toPattern('123456', { pattern: '999.999', placeholder: '_' })

  expect(received).toBe('123.456')
})

test('should return an empty string for an empty value without placeholder', () => {
  const received = toPattern('', '999.999')

  expect(received).toBe('')
})

test('should stop at the first input character that does not match the pattern type', () => {
  const received = toPattern('12ab34', '9999')

  expect(received).toBe('12')
})
