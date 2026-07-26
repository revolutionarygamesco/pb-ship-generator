import { beforeEach, describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import setCharacterHP, { ranges } from './hp.ts'

describe('setCharacterHP', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('defaults to average human range', () => {
    setCharacterHP(actor)
    expect(actor.system?.attributes?.hp).toBeDefined()
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 9])).toBe(true)
    expect(actor.system?.attributes?.hp?.max).toBe(actor.system?.attributes?.hp?.value)
  })

  it.each(ranges)('sets HP for %s', (label, min, max) => {
    setCharacterHP(actor, label)
    expect(actor.system?.attributes?.hp).toBeDefined()
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [min, max])).toBe(true)
    expect(actor.system?.attributes?.hp?.max).toBe(actor.system?.attributes?.hp?.value)
  })
})
