import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import createSloop from '../classes/sloop.ts'
import addNavalFirepower from './naval.ts'

describe('addNavalFirepower', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    mockModules([])
    actor = createSloop()
  })

  it('throws an error if broadsides aren’t already established', () => {
    delete actor.system?.weapons?.broadsides
    expect(() => addNavalFirepower(actor)).toThrow()
  })

  it('throws an error if small arms aren’t already established', () => {
    delete actor.system?.weapons?.smallArms
    expect(() => addNavalFirepower(actor)).toThrow()
  })

  it('throws an error if ramming isn’t already established', () => {
    delete actor.system?.weapons?.ram
    expect(() => addNavalFirepower(actor)).toThrow()
  })

  it('upgrades broadsides die', () => {
    addNavalFirepower(actor)
    expect(actor.system?.weapons?.broadsides?.die).toBe('d8')
  })

  it('upgrades small arms die', () => {
    addNavalFirepower(actor)
    expect(actor.system?.weapons?.smallArms?.die).toBe('d6')
  })

  it('upgrades ramming die', () => {
    addNavalFirepower(actor)
    expect(actor.system?.weapons?.ram?.die).toBe('d6')
  })
})
