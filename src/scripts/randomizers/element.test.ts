import randomElement from './element.ts'

describe('randomElement', () => {
  it('returns a random element from an array', () => {
    const arr: string[] = ['a', 'b', 'c']
    const actual = randomElement(arr)
    expect(arr.includes(actual)).toBe(true)
  })
})
