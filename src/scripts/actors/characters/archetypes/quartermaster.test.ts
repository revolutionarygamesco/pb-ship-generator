import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isWithinRange } from '@revolutionarygamesco/common'
import { generateID, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import * as namer from '../../../names/person.ts'
import createQuartermaster from './quartermaster.ts'

describe('createQuartermaster', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as Linkable

  let actor: Partial<foundry.documents.Actor>
  let namePersonSpy: Mock

  beforeEach(async () => {
    namePersonSpy = vi.spyOn(namer, 'default').mockResolvedValue([namer.createPersonalName()])
    const actual = await createQuartermaster(ship, undefined)
    actor = actual.actor
  })

  afterEach(() => {
    namePersonSpy.mockRestore()
  })

  it('sets type to creature', async () => {
    expect(actor.type).toBe('creature')
  })

  it('sets an image', async () => {
    expect(actor.img).toBe(`modules/${MODULE_ID}/images/icons/pirate.webp`)
  })

  it('sets a prototype token', async () => {
    expect(actor.prototypeToken?.texture.src).toBe(`modules/${MODULE_ID}/images/tokens/pirate.webp`)
  })

  it('sets HP between 7 and 12', async () => {
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 12])).toBe(true)
  })

  it('sets morale between 7 and 10', async () => {
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [7, 10])).toBe(true)
  })

  it('clothes the quartermaster', async () => {
    expect(actor.system?.attributes?.armor?.formula).toBeDefined()
  })

  it('arms the quartermaster', async () => {
    expect(actor.system?.attributes?.attack?.formula).toBeDefined()
  })

  it('calls the quartermaster mister', async () => {
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createQuartermaster(ship, undefined)
    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.quartermaster.description`,
      expect.objectContaining({ mister: 'Mr. Doe' })
    )
  })

  it('uses an Irish quartermaster’s anglicized name', async () => {
    namePersonSpy.mockResolvedValue([
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'Irish', full: 'Padraig Ó Ceallaigh', personal: 'Padraig', mister: 'Mr. Ó Ceallaigh' } }),
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'English', full: 'Patrick Kelly', personal: 'Patrick', mister: 'Mr. Kelly' } })
    ])
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createQuartermaster(ship, undefined)

    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.quartermaster.description`,
      expect.objectContaining({ mister: 'Mr. Kelly' })
    )
  })
})
