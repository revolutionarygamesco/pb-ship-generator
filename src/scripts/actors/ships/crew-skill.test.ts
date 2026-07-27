import { beforeEach, describe, it, expect } from 'vitest'
import setShipCrewSkill from './crew-skill.ts'

describe('setShipCrewSkill', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s crew skill', () => {
    setShipCrewSkill(actor, -1)
    expect(actor.system?.abilities?.skill?.value).toBe(-1)
  })
})
