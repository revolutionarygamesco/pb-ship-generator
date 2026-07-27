import { beforeEach, describe, it, expect } from 'vitest'
import setCargoCapacity from './cargo.ts'

describe('setCargoCapacity', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s cargo capacity', () => {
    setCargoCapacity(actor, 2)
    expect(actor.system?.attributes?.cargo?.max).toBe(2)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })
})
