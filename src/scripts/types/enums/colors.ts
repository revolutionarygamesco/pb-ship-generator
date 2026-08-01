import { makeEnum, retryUntil } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { type ShipRole } from './role.ts'
import getRollTableUUID from '../../utilities/get-rolltable-uuid.ts'

export const colors = ['Spanish', 'British', 'French', 'Dutch', 'Pirate'] as const
export type Colors = typeof colors[number]
export const { guard: isColors } = makeEnum(colors)

export const selectRandomColors = async (
  role: ShipRole,
  privateer: boolean = false
): Promise<Colors> => {
  const uuid = getRollTableUUID('CrljZ2S8EdjWco9K', 'NAMES')
  return retryUntil(
    () => drawGuarded(uuid, isColors, 'Spanish'),
    (candidate: Colors) => {
      if (candidate === 'Dutch' && (role === 'Man-of-War' || privateer)) return false
      if (candidate === 'Pirate' && (role !== 'Man-of-War')) return false
      if (candidate === 'Pirate' && !privateer) return false
      return true
    },
    { fallback: 'Spanish' }
  )
}
