import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { generateID, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import * as namer from '../../../names/person.ts'
import createSailingMaster from './master.ts'

describe('createSailingMaster', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as Linkable

  let namePersonSpy: Mock

  beforeEach(() => {
    namePersonSpy = vi.spyOn(namer, 'default').mockResolvedValue([namer.createPersonalName()])
  })

  afterEach(() => {
    namePersonSpy.mockRestore()
  })

  it('sets type to creature', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, false)
    expect(actor.type).toBe('creature')
  })

  it('sets an image', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, false)
    expect(actor.img).toBe(`modules/${MODULE_ID}/images/icons/british.webp`)
  })

  it('sets a prototype token', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, false)
    expect(actor.prototypeToken?.texture.src).toBe(`modules/${MODULE_ID}/images/tokens/british.webp`)
  })

  it('sets HP between 7 and 12', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 12])).toBe(true)
  })

  it('sets morale between 5 and 10', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [5, 10])).toBe(true)
  })

  it('sets a naval sailing master’s morale between 8 and 10', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, true)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [8, 10])).toBe(true)
  })

  it('clothes the sailing master', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, true)
    expect(actor.system?.attributes?.armor?.formula).toBe('0')
  })

  it('arms the sailing master', async () => {
    const { actor } = await createSailingMaster('British', ship, undefined, true)
    expect(actor.system?.attributes?.attack?.formula).toBeDefined()
  })
})
