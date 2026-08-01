import { describe, it, expect, vi } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { type ShipRole } from './role.ts'
import getRollTableUUID from '../../utilities/get-rolltable-uuid.ts'
import {
  isColors,
  selectRandomColors,
  colors,
  type Colors
} from './colors.ts'

vi.mock('@revolutionarygamesco/common-foundryvtt', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@revolutionarygamesco/common-foundryvtt')>()
  return { ...actual, drawGuarded: vi.fn(actual.drawGuarded) }
})

describe('isColors', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isColors(candidate)).toBe(false)
  })

  it.each(colors)('accepts %s', (colors: Colors) => {
    expect(isColors(colors)).toBe(true)
  })
})

describe('selectRandomColors', () => {
  it('picks colors', async () => {
    mockTables({ [getRollTableUUID('CrljZ2S8EdjWco9K', 'NAMES')]: { results: [{ description: 'Spanish' } as foundry.documents.TableResult] } })
    expect(await selectRandomColors('Merchantman', false)).toBe('Spanish')
  })

  it.each([
    ['pirate naval ship', 'Man-of-War', false, ['Pirate', 'British']],
    ['pirate merchant ship', 'Merchantman', false, ['Pirate', 'British']],
    ['Dutch naval ship', 'Man-of-War', false, ['Dutch', 'British']],
    ['Dutch privateer ship', 'Man-of-War', true, ['Dutch', 'British']]
  ] as Array<[string, ShipRole, boolean, Colors[]]>)(
    'won’t return a %s',
    async (_desc, role, privateer, candidates) => {
      let mock = vi.mocked(drawGuarded)
      for (const candidate of candidates) {
        mock = mock.mockResolvedValueOnce(candidate)
      }

      const result = await selectRandomColors(role, privateer)
      expect(result).toBe('British')
      expect(drawGuarded).toHaveBeenCalledTimes(candidates.length)
    }
  )
})
