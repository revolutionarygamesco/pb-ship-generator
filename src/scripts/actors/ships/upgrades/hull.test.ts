import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import createSloop from '../classes/sloop.ts'
import armorHull from './hull.ts'

describe('armorHull', () => {
  beforeEach(() => {
    mockModules([])
  })

  it('throws an error if hull isn’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => armorHull(actor)).toThrow()
  })

  it('increases armor tier', () => {
    const actor = createSloop()
    armorHull(actor)
    expect(actor.system?.attributes?.hull?.max).toBe(2)
    expect(actor.system?.attributes?.hull?.value).toBe(2)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })
})
