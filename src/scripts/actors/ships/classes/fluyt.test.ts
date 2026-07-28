import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { isWithinRange } from '@revolutionarygamesco/common'
import createFluyt from './fluyt.ts'

describe('createFluyt', () => {
  const name= 'Rommelpot'
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    mockModules([])
    actor = createFluyt(name)
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
    actor = createFluyt(name)
    expect(actor.img).toBe('modules/pirate-borg-premium/Icons/fluyt-icon.webp')
  })

  it('sets the token', () => {
    expect(actor.prototypeToken?.texture.src).toBe('systems/pirateborg/icons/misc/ship.png')
  })

  it('can get the premium icon', () => {
    mockModules(['pirate-borg-premium'])
    actor = createFluyt(name)
    expect(actor.prototypeToken?.texture.src).toBe('modules/pirate-borg-premium/Tokens/Fluyt-Original-Token.webp')
  })

  it('sets the fluyt’s HP to 50', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(50)
    expect(actor.system?.attributes?.hp?.value).toBe(50)
  })

  it('sets the fluyt’s hull to -d4', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(2)
    expect(actor.system?.attributes?.hull?.value).toBe(2)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the fluyt’s agility to -1', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(-1)
  })

  it('sets the fluyt’s speed to 3', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(3)
    expect(actor.system?.attributes?.speed?.value).toBe(3)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the fluyt’s crew skill to 0', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(0)
  })

  it('sets the fluyt’s broadsides to d10', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d10')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(1)
    expect(actor.system?.weapons?.broadsides?.warning).not.toBeDefined()
  })

  it('sets the fluyt’s small arms to d6', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d6')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the fluyt’s ram to d6', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d6')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the fluyt’s cargo capacity to 5', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(5)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the fluyt’s crew to 10/40', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(10)
    expect(actor.system?.attributes?.crew?.max).toBe(40)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [10, 40])).toBe(true)
  })

  it('sets description', () => {
    expect(actor.system?.description).toBe('revolutionary-pbshipgen.ships.fluyt.description')
  })

  it('sets special', () => {
    expect(actor.system?.special).not.toBeDefined()
  })
})
