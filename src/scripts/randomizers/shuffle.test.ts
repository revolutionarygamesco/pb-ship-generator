import shuffleArray from './shuffle.ts'

describe('shuffleArray', () => {
  it('returns a shuffled version of the array', () => {
    const orig: string[] = ['a', 'b', 'c']
    const actual = shuffleArray(orig)
    expect(actual).not.toBe(orig)
    expect(orig.join('')).toBe('abc')
    expect(actual.every(el => orig.includes(el))).toBe(true)
    expect(actual.length).toBe(orig.length)
  })
})
