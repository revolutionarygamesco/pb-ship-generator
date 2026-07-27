import { beforeEach, describe, it, expect } from 'vitest'
import setBroadsides from './broadsides.ts'

describe('setBroadsides', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s broadsides attack', () => {
    setBroadsides(actor, 'd6', 1)
    expect(actor.system?.weapons?.broadsides?.die).toBe('d6')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(1)
    expect(actor.system?.weapons?.broadsides?.warning).not.toBeDefined()
  })

  it('can set a warning', () => {
    setBroadsides(actor, 'd6', 1, 'deal +2 damage')
    expect(actor.system?.weapons?.broadsides?.die).toBe('d6')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(1)
    expect(actor.system?.weapons?.broadsides?.warning).toBe('deal +2 damage')
  })
})
