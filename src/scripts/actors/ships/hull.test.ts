import { beforeEach, describe, it, expect } from 'vitest'
import setHull from './hull.ts'

describe('setHull', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it.each([
    ['0', 0],
    ['-d2', 1],
    ['-d4', 2],
    ['-d6', 3]
  ])('can set the hull to %s (tier %d)', (str, tier) => {
    setHull(actor, str)
    expect(actor.system?.attributes?.hull?.max).toBe(tier)
    expect(actor.system?.attributes?.hull?.value).toBe(tier)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })
})
