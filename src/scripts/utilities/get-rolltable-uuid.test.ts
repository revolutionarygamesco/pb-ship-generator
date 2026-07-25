import { describe, it, expect } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID, { COMPENDIUM_PREFIX } from './get-rolltable-uuid.ts'

describe('getRollTableUUID', () => {
  it('gets the RollTable compendium UUID for a given ID', () => {
    const id = generateID()
    const actual = getRollTableUUID(id)
    expect(actual).toBe([COMPENDIUM_PREFIX.SHIPGEN, id].join('.'))
  })

  it('can also get the Pirate Names RollTable compendium UUID for a given ID', () => {
    const id = generateID()
    const actual = getRollTableUUID(id, 'NAMES')
    expect(actual).toBe([COMPENDIUM_PREFIX.NAMES, id].join('.'))
  })
})
