import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isWithinRange, chance } from '@revolutionarygamesco/common'
import { generateID, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import * as namer from '../../../names/person.ts'
import createBosun from './bosun.ts'

vi.mock(import('@revolutionarygamesco/common'), async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, chance: vi.fn(actual.chance) }
})

describe('createBosun', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as Linkable

  let namePersonSpy: Mock

  beforeEach(() => {
    namePersonSpy = vi.spyOn(namer, 'default').mockResolvedValue([namer.createPersonalName()])
  })

  afterEach(() => {
    namePersonSpy.mockRestore()
  })

  it('sets type to creature', async () => {
    vi.mocked(chance).mockReturnValue(true)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(actor.type).toBe('creature')
  })

  it('sets an image', async () => {
    vi.mocked(chance).mockReturnValue(true)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(actor.img).toBe(`modules/${MODULE_ID}/images/icons/british.webp`)
  })

  it('sets a prototype token', async () => {
    vi.mocked(chance).mockReturnValue(true)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(actor.prototypeToken?.texture.src).toBe(`modules/${MODULE_ID}/images/tokens/british.webp`)
  })

  it('sets a fighter’s HP between 7 and 12', async () => {
    vi.mocked(chance).mockReturnValue(true)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 12])).toBe(true)
  })

  it('sets a non-fighter’s HP between 7 and 9', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.hp?.value ?? 0, [7, 9])).toBe(true)
  })

  it('sets morale between 5 and 10', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [5, 10])).toBe(true)
  })

  it('sets a pirate’s morale between 7 and 10', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('Pirate', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [7, 10])).toBe(true)
  })

  it('sets a fighter’s morale between 7 and 10', async () => {
    vi.mocked(chance).mockReturnValue(true)
    const { actor } = await createBosun('British', ship, undefined, false)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [5, 10])).toBe(true)
  })

  it('sets a naval bosun’s morale between 8 and 10', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('British', ship, undefined, true)
    expect(isWithinRange(actor.system?.attributes?.morale ?? 0, [8, 10])).toBe(true)
  })

  it('clothes the bosun', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('British', ship, undefined, true)
    expect(actor.system?.attributes?.armor?.formula).toBe('0')
  })

  it('arms the bosun', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const { actor } = await createBosun('British', ship, undefined, true)
    expect(actor.system?.attributes?.attack?.formula).toBeDefined()
  })

  it('calls the bosun mister', async () => {
    vi.mocked(chance).mockReturnValue(false)
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createBosun('British', ship, undefined, false)
    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.bosun.description`,
      expect.objectContaining({ mister: 'Mr. Doe' })
    )
  })

  it('uses an Irish bosun’s anglicized name', async () => {
    vi.mocked(chance).mockReturnValue(false)
    namePersonSpy.mockResolvedValue([
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'Irish', full: 'Padraig Ó Ceallaigh', personal: 'Padraig', mister: 'Mr. Ó Ceallaigh' } }),
      namer.createPersonalName({ nationality: 'Irish', forms: { nationality: 'English', full: 'Patrick Kelly', personal: 'Patrick', mister: 'Mr. Kelly' } })
    ])
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await createBosun('British', ship, undefined, false)

    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.crew.specialty.bosun.description`,
      expect.objectContaining({ mister: 'Mr. Kelly' })
    )
  })
})
