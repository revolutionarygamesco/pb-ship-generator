import { describe, it, expect } from 'vitest'
import { makeArrayGuard, isWithinRange } from '@revolutionarygamesco/common'
import { isShipUpgrade, type ShipUpgrade } from '../types/enums/upgrade.ts'
import { type CaptainExperience } from '../actors/characters/descriptions/captain.ts'
import selectRandomThreatProfile from './threat.ts'

describe('selectRandomThreatProfile', () => {
  it('returns the captain’s experience level', () => {
    const { experience } = selectRandomThreatProfile()
    expect(['legendary', 'high', 'medium', 'low'] as CaptainExperience[]).toContain(experience)
  })

  it('returns the upgrades made to the ship', () => {
    const isShipUpgradeArray = makeArrayGuard<ShipUpgrade>(isShipUpgrade)
    const { upgrades } = selectRandomThreatProfile()
    expect(isShipUpgradeArray(upgrades)).toBe(true)
  })

  it('returns the number of sea shanties the crew knows', () => {
    const { shanties } = selectRandomThreatProfile()
    expect(isWithinRange(shanties, [0, 5])).toBe(true)
  })
})
