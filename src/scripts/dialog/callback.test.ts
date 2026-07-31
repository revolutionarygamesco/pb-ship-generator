import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { mockUser } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { colors } from '../types/enums/colors.ts'
import { shipRoles, type ShipRole } from '../types/enums/role.ts'
import { shipClasses } from '../types/enums/class.ts'

import * as ship from '../ship.ts'
import * as whisper from '../whisper.ts'

import defaultOnComplete from './callback.ts'

describe('defaultOnComplete', () => {
  let generateShip: Mock
  let whisperGeneratedShip: Mock
  const userId = generateID()
  const shipId = `Actor.${generateID()}`
  const captId = `Actor.${generateID()}`

  beforeEach(() => {
    mockUser({ id: userId })
    generateShip = vi.spyOn(ship, 'default').mockResolvedValue({
      ship: { uuid: shipId } as unknown as foundry.documents.Actor,
      captain: { uuid: captId } as unknown as foundry.documents.Actor
    })
    whisperGeneratedShip = vi.spyOn(whisper, 'default').mockResolvedValue(undefined)
  })

  afterEach(() => {
    generateShip.mockRestore()
    whisperGeneratedShip.mockRestore()
  })

  it.each(colors)('passes along %s', async (colors) => {
    await defaultOnComplete(colors, 'merchant', 'Sloop')
    expect(generateShip).toHaveBeenCalledWith(expect.objectContaining({ colors }))
  })

  it('randomizes colors on any other input', async () => {
    await defaultOnComplete('random', 'merchant', 'Sloop')
    expect(colors).toContain(generateShip.mock.calls[0][0].colors)
  })

  it.each([
    ['Merchantman', 'merchant'],
    ['Man-of-War', 'privateer'],
    ['Man-of-War', 'naval']
  ] as Array<[ShipRole, string]>)('sends %s when given %s', async (role, input) => {
    await defaultOnComplete('British', input, 'Sloop')
    expect(generateShip).toHaveBeenCalledWith(expect.objectContaining({ role }))
  })

  it('randomizes role on any other input', async () => {
    await defaultOnComplete('British', 'random', 'Sloop')
    expect(shipRoles).toContain(generateShip.mock.calls[0][0].role)
  })

  it.each([
    [false, 'merchant'],
    [true, 'privateer'],
    [false, 'naval']
  ] as Array<[boolean, string]>)('sets privateer to %s when given %s', async (privateer, input) => {
    await defaultOnComplete('British', input, 'Sloop')
    expect(generateShip).toHaveBeenCalledWith(expect.objectContaining({ privateer }))
  })

  it('randomizes privateer status on any other input', async () => {
    await defaultOnComplete('British', 'random', 'Sloop')
    expect([true, false]).toContain(generateShip.mock.calls[0][0].privateer)
  })

  it.each(shipClasses)('can create a %s', async (shipClass) => {
    await defaultOnComplete('British', 'merchant', shipClass)
    expect(generateShip).toHaveBeenCalledWith(expect.objectContaining({ shipClass }))
  })

  it('randomizes class on any other input', async () => {
    await defaultOnComplete('British', 'random', 'Random')
    expect(shipClasses).toContain(generateShip.mock.calls[0][0].shipClass)
  })

  it.each(colors)('whispers back %s when chosen', async (colors) => {
    await defaultOnComplete(colors, 'merchant', 'Sloop')
     expect(whisperGeneratedShip).toHaveBeenCalledWith(
       colors,
       expect.anything(),
       expect.anything(),
       expect.anything(),
       { uuid: shipId },
       { uuid: captId },
       [userId]
     )
  })

  it('whispers back randomly-chosen colors on any other input', async () => {
    await defaultOnComplete('random', 'merchant', 'Sloop')
    expect(colors).toContain(whisperGeneratedShip.mock.calls[0][0])
  })

  it.each([
    ['Merchantman', 'merchant'],
    ['Man-of-War', 'privateer'],
    ['Man-of-War', 'naval']
  ] as Array<[ShipRole, string]>)('whispers back %s when choosing %s', async (role, input) => {
    await defaultOnComplete('British', input, 'Sloop')
    expect(whisperGeneratedShip).toHaveBeenCalledWith(
      expect.anything(),
      role,
      expect.anything(),
      expect.anything(),
      { uuid: shipId },
      { uuid: captId },
      [userId]
    )
  })

  it('whispers back randomly-chosen ship role on any other input', async () => {
    await defaultOnComplete('British', 'random', 'Sloop')
    expect(shipRoles).toContain(whisperGeneratedShip.mock.calls[0][1])
  })

  it.each([
    [false, 'merchant'],
    [true, 'privateer'],
    [false, 'naval']
  ] as Array<[boolean, string]>)('whispers back %s for privateer status when choosing %s', async (privateer, input) => {
    await defaultOnComplete('British', input, 'Sloop')
    expect(whisperGeneratedShip).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      privateer,
      expect.anything(),
      { uuid: shipId },
      { uuid: captId },
      [userId]
    )
  })

  it('whispers back randomly-chosen privateer status on any other input', async () => {
    await defaultOnComplete('British', 'random', 'Sloop')
    expect([true, false]).toContain(whisperGeneratedShip.mock.calls[0][2])
  })

  it.each(shipClasses)('whispers back %s', async (shipClass) => {
    await defaultOnComplete('British', 'merchant', shipClass)
    expect(whisperGeneratedShip).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      shipClass,
      { uuid: shipId },
      { uuid: captId },
      [userId]
    )
  })

  it('whispers back randomly-chosen ship class on any other input', async () => {
    await defaultOnComplete('British', 'merchant', 'Random')
    expect(shipClasses).toContain(whisperGeneratedShip.mock.calls[0][3])
  })
})
