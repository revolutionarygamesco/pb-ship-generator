import { beforeEach, describe, it, expect } from 'vitest'
import setShipHP from './hp.ts'

describe('setShipHP', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s HP', () => {
    setShipHP(actor, 30)
    expect(actor.system?.attributes?.hp?.max).toBe(30)
    expect(actor.system?.attributes?.hp?.value).toBe(30)
  })
})
