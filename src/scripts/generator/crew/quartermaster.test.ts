import { afterEach, beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as randomizeQuartermaster from '../../randomizers/crew/quartermaster.ts'
import * as createQuartermaster from '../../actors/characters/archetypes/quartermaster.ts'
import * as createActor from '../../actors/characters/archetypes/actor.ts'
import generateQuartermaster from './quartermaster.ts'

describe('generateQuartermaster', () => {
  const featureId = `Item.${generateID()}`
  const actorId = generateID()
  const params = createParams()

  let createCrewSpy: Mock
  let createActorSpy: Mock

  beforeEach(() => {
    params.features = []
    params.crews = []
    createCrewSpy = vi.spyOn(createQuartermaster, 'default').mockResolvedValue({
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
    vi.spyOn(randomizeQuartermaster, 'default').mockReturnValue(null)
    await generateQuartermaster(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([])
    expect(createCrewSpy).not.toHaveBeenCalled()
    expect(createActorSpy).not.toHaveBeenCalled()
  })

  it('can generate a quartermaster', async () => {
    vi.spyOn(randomizeQuartermaster, 'default').mockReturnValue(featureId)
    await generateQuartermaster(params)
    expect(params.features).toEqual([featureId])
    expect(params.crews).toEqual([actorId])
    expect(createCrewSpy).toHaveBeenCalledWith(params.ship, params.folder)
    expect(createActorSpy).toHaveBeenCalled()
  })
})
