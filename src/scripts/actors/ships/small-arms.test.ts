import { beforeEach, describe, it, expect } from 'vitest'
import setSmallArms from './small-arms.ts'

describe('setSmallArms', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = {}
  })

  it('sets the ship’s small arms attack', () => {
    setSmallArms(actor, 'd4', 1)
    expect(actor.system?.weapons?.smallArms?.die).toBe('d4')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('can set a warning', () => {
    setSmallArms(actor, 'd4', 1, 'deal +2 damage')
    expect(actor.system?.weapons?.smallArms?.die).toBe('d4')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).toBe('deal +2 damage')
  })
})
