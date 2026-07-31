import { afterEach, beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as createCaptain from '../../actors/characters/archetypes/captain.ts'
import * as createActor from '../../actors/characters/archetypes/actor.ts'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import generateCaptain from './captain.ts'

describe('generateCaptain', () => {
  const featureId = getFeatureUUID('dmlGTnZhfEgWUYDm')
  const actorId = generateID()

  let createCrewSpy: Mock
  let createActorSpy: Mock

  beforeEach(() => {
    createCrewSpy = vi.spyOn(createCaptain, 'default').mockResolvedValue({
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

  it('can generate a regular captain', async () => {
    const params = createParams({ experience: 'medium' })
    await generateCaptain(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([actorId])
    expect(createCrewSpy).toHaveBeenCalledWith(params.colors, params.privateer,
      params.experience, params.ship, params.shipClass, params.folder,
      params.isNaval)
    expect(createActorSpy).toHaveBeenCalled()
  })

  it('can generate a legendary captain', async () => {
    const params = createParams({ experience: 'legendary' })
    await generateCaptain(params)
    expect(params.features).toEqual([featureId])
  })
})
