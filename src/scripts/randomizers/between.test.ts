import randomizeBetween from './between.ts'

describe('randomizeBetween', () => {
  it('returns an integer between two numbers', () => {
    const min = 1
    const max = 10
    const actual = randomizeBetween(min, max)
    expect(actual).toBeGreaterThanOrEqual(min)
    expect(actual).toBeLessThanOrEqual(max)
  })
})
