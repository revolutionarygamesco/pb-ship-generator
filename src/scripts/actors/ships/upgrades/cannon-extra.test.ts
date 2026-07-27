import { describe, it, expect } from 'vitest'
import createSloop from '../classes/sloop.ts'
import addExtraCannons from './cannon-extra.ts'

describe('addExtraCannons', () => {
  it('throws an error if broadsides aren’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => addExtraCannons(actor)).toThrow()
  })

  it('adds more cannons', () => {
    const actor = createSloop()
    addExtraCannons(actor)
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(2)
  })
})
