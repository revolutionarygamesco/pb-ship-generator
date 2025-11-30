import randomChance from './chance.ts'

describe('randomChance', () => {
  it('evaluates a number of chances in a total', () => {
    const chances = 1
    const total = 10
    const { data } = randomChance(chances, total)
    const filtered = data.filter(d => d)

    expect(data).toHaveLength(total)
    expect(filtered).toHaveLength(chances)
  })
})
