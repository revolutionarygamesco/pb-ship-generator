import { afterEach, beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as randomizeMagician from '../../randomizers/crew/magician.ts'
import * as createDeckSorcerer from '../../actors/characters/archetypes/sorcerer.ts'
import * as createDeckPriest from '../../actors/characters/archetypes/priest.ts'
import * as createActor from '../../actors/characters/archetypes/actor.ts'
import generateMagician from './magician.ts'

describe('generateCarpenter', () => {
  const sorcererFeatureId = `Item.${generateID()}`
  const priestFeatureId = `Item.${generateID()}`
  const sorcererId = generateID()
  const priestId = generateID()
  const params = createParams()

  let createSorcererSpy: Mock
  let createPriestSpy: Mock
  let createActorSpy: Mock

  beforeEach(() => {
    params.features = []
    params.crews = []
    createSorcererSpy = vi.spyOn(createDeckSorcerer, 'default').mockResolvedValue({
      actor: {} as unknown as foundry.documents.Actor, names: []
    })
    createPriestSpy = vi.spyOn(createDeckPriest, 'default').mockResolvedValue({
      actor: {} as unknown as foundry.documents.Actor, names: []
    })
    createActorSpy = vi.spyOn(createActor, 'default')
  })

  afterEach(() => {
    createSorcererSpy.mockRestore()
    createPriestSpy.mockRestore()
    createActorSpy.mockRestore()
  })

  it('returns early if randomizer comes back null', async () => {
    vi.spyOn(randomizeMagician, 'default').mockReturnValue({ priest: null, sorcerer: null })
    await generateMagician(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([])
    expect(createSorcererSpy).not.toHaveBeenCalled()
    expect(createPriestSpy).not.toHaveBeenCalled()
    expect(createActorSpy).not.toHaveBeenCalled()
  })

  it('can generate a deck sorcerer', async () => {
    createActorSpy.mockResolvedValue({ id: sorcererId } as unknown as foundry.documents.Actor)
    vi.spyOn(randomizeMagician, 'default').mockReturnValue({ priest: null, sorcerer: sorcererFeatureId })
    await generateMagician(params)
    expect(params.features).toEqual([sorcererFeatureId])
    expect(params.crews).toEqual([sorcererId])
    expect(createSorcererSpy).toHaveBeenCalledWith(params.colors, params.ship, params.folder, params.isNaval)
    expect(createPriestSpy).not.toHaveBeenCalled()
    expect(createActorSpy).toHaveBeenCalled()
  })

  it('can generate a deck priest', async () => {
    createActorSpy.mockResolvedValue({ id: priestId } as unknown as foundry.documents.Actor)
    vi.spyOn(randomizeMagician, 'default').mockReturnValue({ priest: priestFeatureId, sorcerer: null })
    await generateMagician(params)
    expect(params.features).toEqual([priestFeatureId])
    expect(params.crews).toEqual([priestId])
    expect(createSorcererSpy).not.toHaveBeenCalled()
    expect(createPriestSpy).toHaveBeenCalledWith(params.colors, params.ship, params.folder, params.isNaval)
    expect(createActorSpy).toHaveBeenCalled()
  })
})