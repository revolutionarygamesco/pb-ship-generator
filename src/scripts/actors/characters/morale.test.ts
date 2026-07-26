import { beforeEach, describe, it, expect } from 'vitest'
import setMorale, { ranges } from './morale.ts'

describe('setMorale', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('defaults to an untrained, average human', () => {
    setMorale(actor)
    expect(actor.system?.attributes?.morale).toBe(6)
  })

  it.each(ranges)('sets morale for %s', (label, expected) => {
    setMorale(actor, label)
    expect(actor.system?.attributes?.morale).toBe(expected)
  })
})
