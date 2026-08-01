import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { generateID, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import * as namer from '../../../names/person.ts'
import createMasterGunner from './gunner.ts'

describe('createMasterGunner', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as Linkable

  let namePersonSpy: Mock

  beforeEach(() => {
    namePersonSpy = vi.spyOn(namer, 'default').mockResolvedValue([namer.createPersonalName()])
  })

  afterEach(() => {
    namePersonSpy.mockRestore()
  })

  it('sets type to creature', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, false)
    expect(actor.type).toBe('creature')
  })

  it('sets an image', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, false)
    expect(actor.img).toBe(`modules/${MODULE_ID}/images/icons/british.webp`)
  })

  it('sets a prototype token', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, false)
    expect(actor.prototypeToken?.texture.src).toBe(`modules/${MODULE_ID}/images/tokens/british.webp`)
  })

  it('sets HP between 7 and 12', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 12])).toBe(true)
  })

  it('sets morale between 7 and 10', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [7, 10])).toBe(true)
  })

  it('sets a naval gunner’s morale between 8 and 10', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, true)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [8, 10])).toBe(true)
  })

  it('clothes the gunner', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, true)
    expect(actor.system?.attributes?.armor?.formula).toBe('0')
  })

  it('arms the gunner', async () => {
    const { actor } = await createMasterGunner('British', ship, undefined, true)
    expect(actor.system?.attributes?.attack?.formula).toBeDefined()
  })

  it('calls the gunner mister', async () => {
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createMasterGunner('British', ship, undefined, true)
    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.gunner.description`,
      expect.objectContaining({ mister: 'Mr. Doe' })
    )
  })

  it('uses an Irish gunner’s anglicized name', async () => {
    namePersonSpy.mockResolvedValue([
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'Irish', full: 'Padraig Ó Ceallaigh', personal: 'Padraig', mister: 'Mr. Ó Ceallaigh' } }),
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'English', full: 'Patrick Kelly', personal: 'Patrick', mister: 'Mr. Kelly' } })
    ])
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createMasterGunner('British', ship, undefined, true)

    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.gunner.description`,
      expect.objectContaining({ mister: 'Mr. Kelly' })
    )
  })
})
