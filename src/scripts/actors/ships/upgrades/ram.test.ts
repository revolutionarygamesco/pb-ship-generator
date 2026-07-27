import { describe, it, expect } from 'vitest'
import createSloop from '../classes/sloop.ts'
import upgradeRam from './ram.ts'

describe('upgradeRam', () => {
  it('throws an error if ram isn’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => upgradeRam(actor)).toThrow()
  })

  it('doubles ram die', () => {
    const actor = createSloop()
    upgradeRam(actor)
    expect(actor.system?.weapons?.ram?.quantity).toBe(2)
  })
})
