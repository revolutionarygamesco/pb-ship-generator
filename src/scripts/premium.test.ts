import { describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { shipClasses, type ShipClass } from './types/enums/class.ts'
import { isPremium, getIcon, getToken, standardIcon, premiumRoot } from './premium.ts'

describe('isPremium', () => {
  it('returns true if you have Pirate Borg Premium', () => {
    mockModules(['pirate-borg-premium'])
    expect(isPremium()).toBe(true)
  })

  it('returns false if you don’t', () => {
    mockModules([])
    expect(isPremium()).toBe(false)
  })
})

describe('getIcon', () => {
  it.each(shipClasses)('returns the standard icon for a %s if you don’t have Pirate Borg Premium', (shipClass: ShipClass) => {
    mockModules([])
    expect(getIcon(shipClass)).toBe(standardIcon)
  })

  it.each(shipClasses)('returns the premium icon for a %s if you have Pirate Borg Premium', (shipClass: ShipClass) => {
    mockModules(['pirate-borg-premium'])
    expect(getIcon(shipClass).startsWith(premiumRoot + 'Icons/')).toBe(true)
  })
})

describe('getToken', () => {
  it.each(shipClasses)('returns the standard token for a %s if you don’t have Pirate Borg Premium', (shipClass: ShipClass) => {
    mockModules([])
    expect(getToken(shipClass)).toBe(standardIcon)
  })

  it.each(shipClasses)('returns the premium token for a %s if you have Pirate Borg Premium', (shipClass: ShipClass) => {
    mockModules(['pirate-borg-premium'])
    expect(getToken(shipClass).startsWith(premiumRoot + 'Tokens/')).toBe(true)
  })
})
