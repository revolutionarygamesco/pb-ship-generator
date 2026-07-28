import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import createSloop from '../classes/sloop.ts'
import upgradeCannons from './cannon-up.ts'

describe('upgradeCannons', () => {
  beforeEach(() => {
    mockModules([])
  })

  it('throws an error if cannons aren’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = {}
    expect(() => upgradeCannons(actor)).toThrow()
  })

  it('upgrades cannons', () => {
    const actor = createSloop()
    upgradeCannons(actor)
    expect(actor.system?.weapons?.broadsides?.warning).toBe('revolutionary-pbshipgen.upgrades.cannons')
  })
})
