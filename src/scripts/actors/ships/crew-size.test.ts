import { beforeEach, describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import setCrewSize from './crew-size.ts'

describe('setCrewSize', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s crew size', () => {
    setCrewSize(actor, 3, 15)
    expect(actor.system?.attributes?.crew?.max).toBe(15)
    expect(actor.system?.attributes?.crew?.min).toBe(3)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [3, 15]))
  })
})
