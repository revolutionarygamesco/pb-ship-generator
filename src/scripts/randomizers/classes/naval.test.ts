import { describe, it, expect } from 'vitest'
import { type ShipClass } from '../../types/enums/class.ts'
import selectRandomNavalShipClass from './naval.ts'

describe('selectRandomNavalShipClass', () => {
  it('can also pick a fluyt', () => {
    const valid: ShipClass[] = ['Sloop', 'Man-of-War', 'Brigantine', 'Frigate']
    const actual = selectRandomNavalShipClass()
    expect(valid).toContain(actual)
    expect(actual).not.toBe('Fluyt')
  })
})
