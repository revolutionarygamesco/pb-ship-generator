import { describe, it, expect } from 'vitest'
import { type PirateBorgSystem } from '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'
import upgradeDie from './upgrade.ts'

type Die = PirateBorgSystem.Die

describe('upgradeDie', () => {
  it.each([
    ['d2', 'd4'],
    ['d4', 'd6'],
    ['d6', 'd8'],
    ['d8', 'd10'],
    ['d10', 'd12'],
    ['d12', 'd20'],
    ['d20', 'd20'],
    ['nope', 'd2']
  ] as [Die, Die][])('upgrades %s to %s', (orig, expected) => {
    expect(upgradeDie(orig)).toBe(expected)
  })
})
