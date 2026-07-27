import { describe, it, expect } from 'vitest'
import { type Colors } from '../../types/enums/colors.ts'
import getShipActorName from './ship-actor.ts'

describe('getShipActorName', () => {
  const british: Record<string, string> = {
    british: 'Scarborough'
  }

  const dutch: Record<string, string> = {
    dutch: 'Zierikzee'
  }

  const french: Record<string, string> = {
    french: 'Évreux'
  }

  const spanish: Record<string, string> = {
    spanish: 'Panama',
    religious: 'San Antonio'
  }

  const pirate: Record<string, string> = {
    french: 'La Concorde',
    pirate: 'Queen Anne’s Revenge'
  }

  it.each([
    ['British', british, british.british],
    ['Dutch', dutch, dutch.dutch],
    ['French', french, french.french],
    ['Spanish', spanish, `${spanish.religious} (${spanish.spanish})`],
    ['Pirate', pirate, pirate.pirate]
  ] as Array<[Colors, Record<string, string>, string]>)('returns the name of a %s ship', (colors, record, expected) => {
    const actual = getShipActorName(colors, record)
    expect(actual).toBe(expected)
  })
})
