import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import { type ShipClass } from '../../types/enums/class.ts'
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

  it.each([
    ['British merchant sloop', 'British', 'Merchantman', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.merchant`],
    ['British merchant brigantine', 'British', 'Merchantman', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.merchant`],
    ['British merchant frigate', 'British', 'Merchantman', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.merchant`],
    ['British privateer sloop', 'British', 'Man-of-War', true, 'Sloop', `${MODULE_ID}.ships.sloop.description.privateer`],
    ['British privateer brigantine', 'British', 'Man-of-War', true, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.privateer`],
    ['British privateer frigate', 'British', 'Man-of-War', true, 'Frigate', `${MODULE_ID}.ships.frigate.description.privateer`],
    ['British navy sloop', 'British', 'Man-of-War', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.navy`],
    ['British navy brigantine', 'British', 'Man-of-War', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.navy`],
    ['British navy frigate', 'British', 'Man-of-War', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.navy`],
    ['British navy man-of-war', 'British', 'Man-of-War', false, 'Man-of-War', `${MODULE_ID}.ships.manowar.description`],
    ['Spanish merchant sloop', 'Spanish', 'Merchantman', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.merchant`],
    ['Spanish merchant brigantine', 'Spanish', 'Merchantman', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.merchant`],
    ['Spanish merchant frigate', 'Spanish', 'Merchantman', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.merchant`],
    ['Spanish privateer sloop', 'Spanish', 'Man-of-War', true, 'Sloop', `${MODULE_ID}.ships.sloop.description.privateer`],
    ['Spanish privateer brigantine', 'Spanish', 'Man-of-War', true, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.privateer`],
    ['Spanish privateer frigate', 'Spanish', 'Man-of-War', true, 'Frigate', `${MODULE_ID}.ships.frigate.description.privateer`],
    ['Spanish navy sloop', 'Spanish', 'Man-of-War', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.navy`],
    ['Spanish navy brigantine', 'Spanish', 'Man-of-War', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.navy`],
    ['Spanish navy frigate', 'Spanish', 'Man-of-War', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.navy`],
    ['Spanish navy man-of-war', 'Spanish', 'Man-of-War', false, 'Man-of-War', `${MODULE_ID}.ships.manowar.description`],
    ['French merchant sloop', 'French', 'Merchantman', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.merchant`],
    ['French merchant brigantine', 'French', 'Merchantman', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.merchant`],
    ['French merchant frigate', 'French', 'Merchantman', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.merchant`],
    ['French privateer sloop', 'French', 'Man-of-War', true, 'Sloop', `${MODULE_ID}.ships.sloop.description.privateer`],
    ['French privateer brigantine', 'French', 'Man-of-War', true, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.privateer`],
    ['French privateer frigate', 'French', 'Man-of-War', true, 'Frigate', `${MODULE_ID}.ships.frigate.description.privateer`],
    ['French navy sloop', 'French', 'Man-of-War', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.navy`],
    ['French navy brigantine', 'French', 'Man-of-War', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.navy`],
    ['French navy frigate', 'French', 'Man-of-War', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.navy`],
    ['French navy man-of-war', 'French', 'Man-of-War', false, 'Man-of-War', `${MODULE_ID}.ships.manowar.description`],
    ['Dutch sloop', 'Dutch', 'Merchantman', false, 'Sloop', `${MODULE_ID}.ships.sloop.description.dutch`],
    ['Dutch brigantine', 'Dutch', 'Merchantman', false, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.dutch`],
    ['Dutch frigate', 'Dutch', 'Merchantman', false, 'Frigate', `${MODULE_ID}.ships.frigate.description.dutch`],
    ['Dutch fluyt', 'Dutch', 'Merchantman', false, 'Fluyt', `${MODULE_ID}.ships.fluyt.description`],
    ['pirate sloop', 'Pirate', 'Man-of-War', true, 'Sloop', `${MODULE_ID}.ships.sloop.description.pirate`],
    ['pirate brigantine', 'Pirate', 'Man-of-War', true, 'Brigantine', `${MODULE_ID}.ships.brigantine.description.pirate`],
    ['pirate frigate', 'Pirate', 'Man-of-War', true, 'Frigate', `${MODULE_ID}.ships.frigate.description.pirate`]
  ] as Array<[string, Colors, ShipRole, boolean, ShipClass, string]>)(
    'uses the right localization path to describe a %s',
    async (_desc, colors, role, privateer, shipClass, expected) => {
      const localizeSpy = vi.spyOn(game.i18n, 'localize')
      await updateShip(ship, captain, colors, role, privateer, shipClass, [], [])
      expect(localizeSpy).toHaveBeenCalledWith(expected, expect.anything())
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
