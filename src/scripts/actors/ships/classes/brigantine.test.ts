import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { isWithinRange } from '@revolutionarygamesco/common'
import createBrigantine from './brigantine.ts'

describe('createBrigantine', () => {
  const name = 'Hispaniola'
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    mockModules([])
    actor = createBrigantine(name)
  })

  it('sets the name', () => {
    expect(actor.name).toBe(name)
  })

  it('sets type to vehicle', () => {
    expect(actor.type).toBe('vehicle')
  })

  it('sets the icon', () => {
    expect(actor.img).toBe('systems/pirateborg/icons/misc/ship.png')
  })

  it('can get the premium icon', () => {
    mockModules(['pirate-borg-premium'])
    actor = createBrigantine(name)
    expect(actor.img).toBe('modules/pirate-borg-premium/Icons/brigantine-icon.webp')
  })

  it('sets the token', () => {
    expect(actor.prototypeToken?.texture.src).toBe('systems/pirateborg/icons/misc/ship.png')
  })

  it('can get the premium icon', () => {
    mockModules(['pirate-borg-premium'])
    actor = createBrigantine(name)
    expect(actor.prototypeToken?.texture.src).toBe('modules/pirate-borg-premium/Tokens/Brigantine-Original-Token.webp')
  })

  it('sets the brigantine’s HP to 40', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(40)
    expect(actor.system?.attributes?.hp?.value).toBe(40)
  })

  it('sets the brigantine’s hull to -d4', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(2)
    expect(actor.system?.attributes?.hull?.value).toBe(2)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the brigantine’s agility to +1', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(1)
  })

  it('sets the brigantine’s speed to 4', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(4)
    expect(actor.system?.attributes?.speed?.value).toBe(4)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the brigantine’s crew skill to 0', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(0)
  })

  it('sets the brigantine’s broadsides to d8', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d8')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(1)
    expect(actor.system?.weapons?.broadsides?.warning).not.toBeDefined()
  })

  it('sets the brigantine’s small arms to d4', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d4')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the brigantine’s ram to d6', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d6')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the fluyt’s cargo capacity to 3', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(3)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the brigantine’s crew to 15/30', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(15)
    expect(actor.system?.attributes?.crew?.max).toBe(30)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [15, 30])).toBe(true)
  })

  it('sets description', () => {
    expect(actor.system?.description).toBe('revolutionary-pbshipgen.ships.brigantine.description')
  })

  it('sets special', () => {
    expect(actor.system?.special).not.toBeDefined()
  })
})
