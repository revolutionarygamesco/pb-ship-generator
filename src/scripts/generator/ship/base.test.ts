import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { type ShipUpgrade } from '../../types/enums/upgrade.ts'
import { createGenerateShipParams } from './params.ts'
import * as nameShipModule from '../../names/ship.ts'
import createSloop from '../../actors/ships/classes/sloop.ts'
import createFluyt from '../../actors/ships/classes/fluyt.ts'
import * as addNavalFirepowerModule from '../../actors/ships/upgrades/naval.ts'
import * as applyUpgradesModule from '../../actors/ships/upgrades/apply.ts'
import * as createFolderModule from './folder.ts'
import createShipBase from './base.ts'

vi.mock(import('../../actors/ships/classes/sloop.ts'), async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, default: vi.fn(actual.default) }
})

vi.mock(import('../../actors/ships/classes/fluyt.ts'), async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, default: vi.fn(actual.default) }
})

const buildBaseActor = (): Partial<foundry.documents.Actor> => ({
  type: 'vehicle',
  system: {
    weapons: {
      broadsides: { die: 'd6' },
      smallArms: { die: 'd4' },
      ram: { die: 'd4' }
    }
  }
} as unknown as Partial<foundry.documents.Actor>)

describe('createShipBase', () => {
  const names = { british: 'Hispaniola' }
  const folder = { id: generateID() } as unknown as foundry.documents.Folder
  const ship = { id: `Actor.${generateID()}` } as unknown as foundry.documents.Actor

  let nameShipSpy: Mock
  let addNavalFirepowerSpy: Mock
  let applyUpgradesSpy: Mock
  let createFolderSpy: Mock
  let createSpy: Mock

  beforeEach(() => {
    nameShipSpy = vi.spyOn(nameShipModule, 'default').mockResolvedValue(names)
    addNavalFirepowerSpy = vi.spyOn(addNavalFirepowerModule, 'default')
    applyUpgradesSpy = vi.spyOn(applyUpgradesModule, 'default').mockImplementation(() => {})
    createFolderSpy = vi.spyOn(createFolderModule, 'default').mockResolvedValue(folder)

    vi.mocked(createSloop).mockReturnValue(buildBaseActor())
    vi.mocked(createFluyt).mockReturnValue(buildBaseActor())

    createSpy = vi.fn().mockResolvedValue(ship)
    vi.stubGlobal('foundry', { ...foundry, documents: { Actor: { create: createSpy } } })
  })

  afterEach(() => {
    nameShipSpy.mockRestore()
    addNavalFirepowerSpy.mockRestore()
    applyUpgradesSpy.mockRestore()
    createFolderSpy.mockRestore()
  })

  it('creates a base of the requested class', async () => {
    const params = createGenerateShipParams({ shipClass: 'Sloop' })
    await createShipBase(params)
    expect(createSloop).toHaveBeenCalledWith(names.british)
    expect(createFluyt).not.toHaveBeenCalled()
  })

  it('adds superior firepower to navy ships', async () => {
    const params = createGenerateShipParams({ role: 'Man-of-War', privateer: false })
    await createShipBase(params)
    expect(addNavalFirepowerSpy).toHaveBeenCalled()
  })

  it('does not add superior firepower to privateers', async () => {
    const params = createGenerateShipParams({ role: 'Man-of-War', privateer: true })
    await createShipBase(params)
    expect(addNavalFirepowerSpy).not.toHaveBeenCalled()
  })

  it('does not add superior firepower to merchant ships', async () => {
    const params = createGenerateShipParams({ role: 'Merchantman' })
    await createShipBase(params)
    expect(addNavalFirepowerSpy).not.toHaveBeenCalled()
  })

  it('adds upgrades', async () => {
    const params = createGenerateShipParams()
    const upgrades: ShipUpgrade[] =  ['armored-hull', 'improved-sails']
    await createShipBase(params, upgrades)
    expect(applyUpgradesSpy).toHaveBeenCalledWith(expect.any(Object), upgrades)
  })

  it('assigns the folder', async () => {
    const params = createGenerateShipParams()
    await createShipBase(params)
    expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({ folder }))
  })

  it('returns the created ship and folder', async () => {
    const params = createGenerateShipParams()
    const result = await createShipBase(params)
    expect(result).toEqual({ ship, folder })
  })

  it('throws if actor creation fails', async () => {
    createSpy.mockResolvedValue(null)
    const params = createGenerateShipParams()
    await (expect(createShipBase(params)).rejects.toThrow('Failed to create ship'))
  })
})
