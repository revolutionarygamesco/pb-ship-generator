import { afterEach, beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as randomizeCarpenter from '../../randomizers/crew/carpenter.ts'
import * as createCarpenter from '../../actors/characters/archetypes/carpenter.ts'
import * as createActor from '../../actors/characters/archetypes/actor.ts'
import generateCarpenter from './carpenter.ts'

describe('generateCarpenter', () => {
  const featureId = `Item.${generateID()}`
  const actorId = generateID()
  const params = createParams()

  let createCrewSpy: Mock
  let createActorSpy: Mock

  beforeEach(() => {
    params.features = []
    params.crews = []
    createCrewSpy = vi.spyOn(createCarpenter, 'default').mockResolvedValue({
      actor: { id: actorId } as unknown as foundry.documents.Actor, names: []
    })
    createActorSpy = vi.spyOn(createActor, 'default').mockResolvedValue({
      id: actorId
    } as unknown as foundry.documents.Actor)
  })

  afterEach(() => {
    createCrewSpy.mockRestore()
    createActorSpy.mockRestore()
  })

  it('returns early if randomizer comes back null', async () => {
    vi.spyOn(randomizeCarpenter, 'default').mockReturnValue(null)
    await generateCarpenter(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([])
    expect(createCrewSpy).not.toHaveBeenCalled()
    expect(createActorSpy).not.toHaveBeenCalled()
  })

  it('can generate a carpenter', async () => {
    vi.spyOn(randomizeCarpenter, 'default').mockReturnValue(featureId)
    await generateCarpenter(params)
    expect(params.features).toEqual([featureId])
    expect(params.crews).toEqual([actorId])
    expect(createCrewSpy).toHaveBeenCalledWith(params.colors, params.ship, params.folder, params.isNaval)
    expect(createActorSpy).toHaveBeenCalled()
  })
})
