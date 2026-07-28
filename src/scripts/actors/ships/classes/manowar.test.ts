import { beforeEach, describe, it, expect } from 'vitest'
import { mockModules } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { isWithinRange } from '@revolutionarygamesco/common'
import createManOfWar from './manowar.ts'

describe('createManOfWar', () => {
  const name = 'Hispaniola'
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    mockModules([])
    actor = createManOfWar(name)
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
    actor = createManOfWar(name)
    expect(actor.img).toBe('modules/pirate-borg-premium/Icons/man-of-war-icon.webp')
  })

  it('sets the token', () => {
    expect(actor.prototypeToken?.texture.src).toBe('systems/pirateborg/icons/misc/ship.png')
  })

  it('can get the premium icon', () => {
    mockModules(['pirate-borg-premium'])
    actor = createManOfWar(name)
    expect(actor.prototypeToken?.texture.src).toBe('modules/pirate-borg-premium/Tokens/Man-of-War-Navy-Token.webp')
  })

  it('sets the man-of-war’s HP to 75', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(75)
    expect(actor.system?.attributes?.hp?.value).toBe(75)
  })

  it('sets the man-of-war’s hull to -d6', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(3)
    expect(actor.system?.attributes?.hull?.value).toBe(3)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the man-of-war’s agility to -2', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(-2)
  })

  it('sets the man-of-war’s speed to 3', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(3)
    expect(actor.system?.attributes?.speed?.value).toBe(3)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the man-of-war’s crew skill to 2', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(2)
  })

  it('sets the man-of-war’s broadsides to 3d8', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d8')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(3)
    expect(actor.system?.weapons?.broadsides?.warning).toBe('revolutionary-pbshipgen.ships.manowar.broadsides')
  })

  it('sets the man-of-war’s small arms to d8', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d8')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the man-of-war’s ram to d8', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d8')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the man-of-war’s cargo capacity to 4', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(4)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the man-of-war’s crew to 50/150', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(50)
    expect(actor.system?.attributes?.crew?.max).toBe(150)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [50, 150])).toBe(true)
  })

  it('sets special', () => {
    expect(actor.system?.special).not.toBeDefined()
  })
})
