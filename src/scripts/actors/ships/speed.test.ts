import { beforeEach, describe, it, expect } from 'vitest'
import setShipSpeed from './speed.ts'

describe('setShipSpeed', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s speed', () => {
    setShipSpeed(actor, 5)
    expect(actor.system?.attributes?.speed?.value).toBe(5)
    expect(actor.system?.attributes?.speed?.max).toBe(5)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })
})
