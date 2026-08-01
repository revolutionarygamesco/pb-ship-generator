import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import updateShip from './update.ts'

describe('updateShip', () => {
  const captainId = generateID()
  const captain = {
    id: captainId,
    uuid: `Actor.${captainId}`,
    name: 'John Doe',
  } as unknown as foundry.documents.Actor

  let createEmbeddedDocumentsSpy: Mock
  let updateSpy: Mock
  let fromUuidSpy: Mock
  let ship: foundry.documents.Actor

  beforeEach(() => {
    createEmbeddedDocumentsSpy = vi.fn()
    updateSpy = vi.fn()
    ship = {
      name: 'Hispaniola',
      createEmbeddedDocuments: createEmbeddedDocumentsSpy,
      update: updateSpy
    } as unknown as foundry.documents.Actor

    fromUuidSpy = vi.spyOn(foundry.utils, 'fromUuid').mockResolvedValue(null)
  })

  afterEach(() => {
    fromUuidSpy.mockRestore()
  })

  it('resolves feature UUIDs and embeds them as items', async () => {
    const a = generateID()
    const b = generateID()
    fromUuidSpy.mockImplementation(async (uuid: string) => {
      return uuid === `Item.${a}` ? {  id: a  } : { id: b }
    })

    await updateShip(ship, captain, 'British', 'Merchantman', false, 'Sloop', [`Item.${a}`, `Item.${b}`], [])

    expect(fromUuidSpy).toHaveBeenCalledWith(`Item.${a}`)
    expect(fromUuidSpy).toHaveBeenCalledWith(`Item.${b}`)
    expect(createEmbeddedDocumentsSpy).toHaveBeenCalledWith('Item', [{ id: a }, { id: b }])
  })

  it('updates the crews and captain', async () => {
    const crews = [generateID(), generateID()]
    await updateShip(ship, captain, 'British', 'Merchantman', false, 'Sloop', [], crews)

    expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({
      'system.crews': crews,
      'system.captain': captainId
    }))
  })

  it.each([
    ['merchant', 'Merchantman', false, 'British'],
    ['navy', 'Man-of-War', false, 'British'],
    ['privateer', 'Man-of-War', true, 'British'],
    ['dutch', 'Merchantman', false, 'Dutch'],
    ['dutch', 'Man-of-War', true, 'Dutch'],
    ['pirate', 'Merchantman', false, 'Pirate'],
    ['pirate', 'Man-of-War', true, 'Pirate']
  ] as Array<[string, ShipRole, boolean, Colors]>)(
    'uses the "%s" description tag (role %s; privateer %s; colors %s',
    async (tag, role, privateer, colors) => {
      await updateShip(ship, captain, colors, role, privateer, 'Sloop', [], [])
      const expectedKey = [MODULE_ID, 'ships', 'sloop', 'description', tag].join('.')
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ 'system.description': expectedKey }))
    }
  )

  it('requests the description with the right context', async () => {
    const localizeSpy = vi.spyOn(game.i18n, 'localize')
    await updateShip(ship, captain, 'British', 'Merchantman', false, 'Sloop', [], [])

    expect(localizeSpy).toHaveBeenCalledWith(
      `${MODULE_ID}.ships.sloop.description.merchant`,
      expect.objectContaining({
        name: ship.name,
        nationality: 'British',
        captain: `@UUID[${captain.uuid}]{${captain.name}}`
      })
    )
  })
})
