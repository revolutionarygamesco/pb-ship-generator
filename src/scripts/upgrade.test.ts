import upgradeDie from './upgrade.ts'

describe('upgradeDie', () => {
  it.each([
    ['d4', 'd6'],
    ['d6', 'd8'],
    ['d8', 'd10'],
    ['d10', 'd12'],
    ['d12', 'd20'],
    ['d20', 'd20'],
    ['nope', 'd4']
  ] as [string, string][])('upgrades %s to %s', (orig, expected) => {
    expect(upgradeDie(orig)).toBe(expected)
  })
})
