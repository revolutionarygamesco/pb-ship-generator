import { afterEach, beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as randomizeBosun from '../../randomizers/crew/bosun.ts'
import * as createBosun from '../../actors/characters/archetypes/bosun.ts'
import * as createActor from '../../actors/characters/archetypes/actor.ts'
import generateBosun from './bosun.ts'

describe('generateBosun', () => {
  const featureId = `Item.${generateID()}`
  const actorId = generateID()
  const params = createParams()

  let createCrewSpy: Mock
  let createActorSpy: Mock

  beforeEach(() => {
    params.features = []
    params.crews = []
    createCrewSpy = vi.spyOn(createBosun, 'default').mockResolvedValue({
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
    vi.spyOn(randomizeBosun, 'default').mockReturnValue(null)
    await generateBosun(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([])
    expect(createCrewSpy).not.toHaveBeenCalled()
    expect(createActorSpy).not.toHaveBeenCalled()
  })

  it('can generate a bosun', async () => {
    vi.spyOn(randomizeBosun, 'default').mockReturnValue(featureId)
    await generateBosun(params)
    expect(params.features).toEqual([featureId])
    expect(params.crews).toEqual([actorId])
    expect(createCrewSpy).toHaveBeenCalledWith(params.colors, params.ship, params.folder, params.isNaval)
    expect(createActorSpy).toHaveBeenCalled()
  })
})
