import { beforeEach, describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import createGalleon from './galleon.ts'

describe('createGalleon', () => {
  const name = 'Hispaniola'
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = createGalleon(name)
  })

  it('sets the name', () => {
    expect(actor.name).toBe(name)
  })

  it('sets type to vehicle', () => {
    expect(actor.type).toBe('vehicle')
  })

  it('sets the galleon’s HP to 65', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(65)
    expect(actor.system?.attributes?.hp?.value).toBe(65)
  })

  it('sets the galleon’s hull to -d6', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(3)
    expect(actor.system?.attributes?.hull?.value).toBe(3)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the galleon’s agility to -3', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(-3)
  })

  it('sets the galleon’s speed to 2', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(2)
    expect(actor.system?.attributes?.speed?.value).toBe(2)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the galleon’s crew skill to 1', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(1)
  })

  it('sets the galleon’s broadsides to 2d10', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d10')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(2)
    expect(actor.system?.weapons?.broadsides?.warning).toBe('revolutionary-pbshipgen.ships.galleon.broadsides')
  })

  it('sets the galleon’s small arms to d6', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d6')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the galleon’s ram to d8', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d8')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the galleon’s cargo capacity to 6', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(6)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the galleon’s crew to 30/60', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(30)
    expect(actor.system?.attributes?.crew?.max).toBe(60)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [30, 60])).toBe(true)
  })

  it('sets description', () => {
    expect(actor.system?.description).toBe('revolutionary-pbshipgen.ships.galleon.description')
  })

  it('sets special', () => {
    expect(actor.system?.special).not.toBeDefined()
  })
})
