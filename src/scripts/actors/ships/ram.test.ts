import { beforeEach, describe, it, expect } from 'vitest'
import setRamming from './ram.ts'

describe('setRamming', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s ram attack', () => {
    setRamming(actor, 'd4', 1)
    expect(actor.system?.weapons?.ram?.die).toBe('d4')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('can set a warning', () => {
    setRamming(actor, 'd4', 1, 'deal +2 damage')
    expect(actor.system?.weapons?.ram?.die).toBe('d4')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).toBe('deal +2 damage')
  })
})
