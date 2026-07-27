import { describe, it, expect } from 'vitest'
import createSloop from '../classes/sloop.ts'
import addExtraSwivels from './swivel-extra.ts'

describe('addExtraSwivels', () => {
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
