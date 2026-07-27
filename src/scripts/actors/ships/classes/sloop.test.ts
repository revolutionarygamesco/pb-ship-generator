import { beforeEach, describe, it, expect } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import createSloop from './sloop.ts'

describe('createSloop', () => {
  let actor: Partial<foundry.documents.Actor>

  beforeEach(() => {
    actor = createSloop()
  })

  it('sets the sloop’s HP to 30', () => {
    expect(actor.system?.attributes?.hp?.max).toBe(30)
    expect(actor.system?.attributes?.hp?.value).toBe(30)
  })

  it('sets the sloop’s hull to -d2', () => {
    expect(actor.system?.attributes?.hull?.max).toBe(1)
    expect(actor.system?.attributes?.hull?.value).toBe(1)
    expect(actor.system?.attributes?.hull?.min).toBe(0)
  })

  it('sets the sloop’s agility to +2', () => {
    expect(actor.system?.abilities?.agility?.value).toBe(2)
  })

  it('sets the sloop’s speed to 5', () => {
    expect(actor.system?.attributes?.speed?.max).toBe(5)
    expect(actor.system?.attributes?.speed?.value).toBe(5)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
  })

  it('sets the sloop’s crew skill to -1', () => {
    expect(actor.system?.abilities?.skill?.value).toBe(-1)
  })

  it('sets the sloop’s broadsides to d6', () => {
    expect(actor.system?.weapons?.broadsides?.die).toBe('d6')
    expect(actor.system?.weapons?.broadsides?.quantity).toBe(1)
    expect(actor.system?.weapons?.broadsides?.warning).not.toBeDefined()
  })

  it('sets the sloop’s small arms to d4', () => {
    expect(actor.system?.weapons?.smallArms?.die).toBe('d4')
    expect(actor.system?.weapons?.smallArms?.quantity).toBe(1)
    expect(actor.system?.weapons?.smallArms?.warning).not.toBeDefined()
  })

  it('sets the sloop’s ram to d4', () => {
    expect(actor.system?.weapons?.ram?.die).toBe('d4')
    expect(actor.system?.weapons?.ram?.quantity).toBe(1)
    expect(actor.system?.weapons?.ram?.warning).not.toBeDefined()
  })

  it('sets the sloop’s cargo capacity to 2', () => {
    expect(actor.system?.attributes?.cargo?.max).toBe(2)
    expect(actor.system?.attributes?.cargo?.value).toBe(0)
  })

  it('sets the sloop’s crew to 3/10', () => {
    expect(actor.system?.attributes?.crew?.min).toBe(3)
    expect(actor.system?.attributes?.crew?.max).toBe(10)
    expect(isWithinRange(actor.system?.attributes?.crew?.value ?? 0, [3, 10])).toBe(true)
  })

  it('sets description', () => {
    expect(actor.system?.description).toBe('revolutionary-pbshipgen.ships.sloop.description')
  })

  it('sets special', () => {
    expect(actor.system?.special).toBe('revolutionary-pbshipgen.ships.sloop.special')
  })
})
