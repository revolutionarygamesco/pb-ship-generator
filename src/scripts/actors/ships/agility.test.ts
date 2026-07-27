import { beforeEach, describe, it, expect } from 'vitest'
import setShipAgility from './agility.ts'

describe('setShipAgility', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s agility', () => {
    setShipAgility(actor, 2)
    expect(actor.system?.abilities?.agility?.value).toBe(2)
  })
})
