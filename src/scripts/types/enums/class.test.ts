import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isShipClass, selectRandomShipClass, shipClasses, type ShipClass } from './class.ts'

describe('isShipClass', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isShipClass(candidate)).toBe(false)
  })

  it.each(shipClasses)('accepts %s', (sc: ShipClass) => {
    expect(isShipClass(sc)).toBe(true)
  })
})

describe('selectRandomShipClass', () => {
  it('picks a ship role', () => {
    expect(shipClasses).toContain(selectRandomShipClass())
  })
})
