import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { generateID, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import * as namer from '../../../names/person.ts'
import createCaptain from './captain.ts'

describe('createCaptain', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as Linkable

  let namePersonSpy: Mock

  beforeEach(() => {
    namePersonSpy = vi.spyOn(namer, 'default').mockResolvedValue([namer.createPersonalName()])
  })

  afterEach(() => {
    namePersonSpy.mockRestore()
  })

  it('sets type to creature', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(actor.type).toBe('creature')
  })

  it('sets an image', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(actor.img).toBe(`modules/${MODULE_ID}/images/icons/british.webp`)
  })

  it('sets a prototype token', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(actor.prototypeToken?.texture.src).toBe(`modules/${MODULE_ID}/images/tokens/british.webp`)
  })

  it('sets HP between 4 and 12', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [4, 12])).toBe(true)
  })

  it('sets a pirate captain’s HP between 7 and 12', async () => {
    const { actor } = await createCaptain('Pirate', true, 'low', ship, 'Sloop', undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 12])).toBe(true)
  })

  it('sets morale between 5 and 10', async () => {
    const { actor } = await createCaptain('British', true, 'low', ship, 'Sloop', undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [5, 10])).toBe(true)
  })

  it('sets a privateer captain’s morale between 7 and 10', async () => {
    const { actor } = await createCaptain('British', true, 'low', ship, 'Sloop', undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [7, 10])).toBe(true)
  })

  it('sets a pirate captain’s morale between 7 and 10', async () => {
    const { actor } = await createCaptain('Pirate', false, 'low', ship, 'Sloop', undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [7, 10])).toBe(true)
  })

  it('sets a navy captain’s morale between 8 and 10', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, true)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [8, 10])).toBe(true)
  })

  it('clothes the captain', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(actor.system?.attributes?.armor?.formula).toBeDefined()
  })

  it('arms the captain', async () => {
    const { actor } = await createCaptain('British', false, 'low', ship, 'Sloop', undefined, false)
    expect(actor.system?.attributes?.attack?.formula).toBeDefined()
  })
})
