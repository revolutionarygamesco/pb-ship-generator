import { describe, it, expect } from 'vitest'
import { type ShipClass } from '../../types/enums/class.ts'
import selectRandomDutchShipClass from './dutch.ts'

describe('selectRandomDutchShipClass', () => {
  it('can also pick a fluyt', () => {
    const valid: ShipClass[] = ['Sloop', 'Fluyt', 'Brigantine', 'Frigate']
    const actual = selectRandomDutchShipClass()
    expect(valid).toContain(actual)
    expect(actual).not.toBe('Man-of-War')
  })
})
