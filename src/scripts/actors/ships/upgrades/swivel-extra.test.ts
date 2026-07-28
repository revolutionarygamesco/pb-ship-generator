import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import createSloop from '../classes/sloop.ts'
import addExtraSwivels from './swivel-extra.ts'

describe('addExtraSwivels', () => {
  beforeEach(() => {
    mockModules([])
  })

  it('throws an error if swivels aren’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => addExtraSwivels(actor)).toThrow()
  })

  it('adds more swivels', () => {
    const actor = createSloop()
    addExtraSwivels(actor)
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(2)
  })
})
