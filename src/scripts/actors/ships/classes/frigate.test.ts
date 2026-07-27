import { beforeEach, describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import createFrigate from './frigate.ts'

describe('createFrigate', () => {
  const name = 'Hispaniola'
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = createFrigate(name)
  })

  it('sets the name', () => {
    expect(actor.name).toBe(name)
  })

  it('sets type to vehicle', () => {
    expect(actor.type).toBe('vehicle')
  })

  it('sets the frigate’s HP to 50', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(60)
    expect(actor.system?.attributes?.hp?.value).toBe(60)
  })

  it('sets the frigate’s hull to -d4', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(2)
    expect(actor.system?.attributes?.hull?.value).toBe(2)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the frigate’s agility to 0', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(0)
  })

  it('sets the frigate’s speed to 4', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(4)
    expect(actor.system?.attributes?.speed?.value).toBe(4)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the frigate’s crew skill to 1', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(1)
  })

  it('sets the frigate’s broadsides to 2d8', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d8')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(2)
    expect(actor.system?.weapons?.broadsides?.warning).toBe('revolutionary-pbshipgen.ships.frigate.broadsides')
  })

  it('sets the frigate’s small arms to d6', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d6')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the frigate’s ram to d6', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d6')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the frigate’s cargo capacity to 4', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(4)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the frigate’s crew to 24/48', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(24)
    expect(actor.system?.attributes?.crew?.max).toBe(48)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [24, 48])).toBe(true)
  })

  it('sets description', () => {
    expect(actor.system?.description).toBe('revolutionary-pbshipgen.ships.frigate.description')
  })

  it('sets special', () => {
    expect(actor.system?.special).not.toBeDefined()
  })
})
