import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isShipUpgrade, selectRandomShipUpgrade, shipUpgrades, type ShipUpgrade } from './upgrade.ts'

describe('isShipUpgrade', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isShipUpgrade(candidate)).toBe(false)
  })

  it.each(shipUpgrades)('accepts %s', (upgrade: ShipUpgrade) => {
    expect(isShipUpgrade(upgrade)).toBe(true)
  })
})

describe('selectRandomShipUpgrade', () => {
  it('picks a ship upgrade', () => {
    expect(shipUpgrades).toContain(selectRandomShipUpgrade())
  })
})
