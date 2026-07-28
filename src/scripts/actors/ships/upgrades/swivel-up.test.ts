import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import createSloop from '../classes/sloop.ts'
import upgradeSwivels from './swivel-up.ts'

describe('upgradeSwivels', () => {
  beforeEach(() => {
    mockModules([])
  })

  it('throws an error if swivels aren’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => upgradeSwivels(actor)).toThrow()
  })

  it('upgrades swivels', () => {
    const actor = createSloop()
    upgradeSwivels(actor)
    expect(actor.system?.weapons?.smallArms?.warning).toBe('revolutionary-pbshipgen.upgrades.swivels')
  })
})
