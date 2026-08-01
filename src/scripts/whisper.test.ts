import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { mockChatMessage } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from './settings.ts'
import { type Colors } from './types/enums/colors.ts'
import { type ShipRole } from './types/enums/role.ts'
import whisperGeneratedShip from './whisper.ts'

describe('whisperGeneratedShip', () => {
  const ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' } as unknown as foundry.documents.Actor
  const captain = { uuid: `Actor.${generateID()}`, name: 'John Doe' } as unknown as foundry.documents.Actor
  const recipients = [generateID(), generateID()]

  let createSpy: Mock
  let localizeSpy: Mock

  beforeEach(() => {
    createSpy = mockChatMessage()
    localizeSpy = vi.spyOn(game.i18n, 'localize')
  })

  it.each([
    ['Merchant', 'Merchantman', false, 'British'],
    ['Naval', 'Man-of-War', false, 'British'],
    ['Privateer', 'Man-of-War', true, 'British'],
    ['Dutch', 'Merchantman', false, 'Dutch'],
    ['Dutch', 'Man-of-War', true, 'Dutch'],
    ['Pirate', 'Merchantman', false, 'Pirate'],
    ['Pirate', 'Man-of-War', true, 'Pirate']
  ] as Array<[string, ShipRole, boolean, Colors]>)(
    'uses the "%s" description path (role %s; privateer %s; colors %s)',
    async (path, role, privateer, colors) => {
      await whisperGeneratedShip(colors, role, privateer, 'Sloop', ship, captain, recipients)
      expect(localizeSpy).toHaveBeenCalledWith(`${MODULE_ID}.message.description.${path}`, expect.any(Object))
    }
  )

  it('sends the description with the right contezt', async () => {
    await whisperGeneratedShip('British', 'Merchantman', false, 'Sloop', ship, captain, recipients)
    expect(localizeSpy).toHaveBeenCalledWith(`${MODULE_ID}.message.description.Merchant`, {
      captain: `@UUID[${captain.uuid}]{${captain.name}}`,
      class: 'sloop',
      colors: 'British',
      navy: `${MODULE_ID}.navies.British`
    })
  })

  it('sends the content with the right context', async () => {
    await whisperGeneratedShip('British', 'Merchantman', false, 'Sloop', ship, captain, recipients)
    expect(localizeSpy).toHaveBeenCalledWith(`${MODULE_ID}.message.content`, {
      alt: 'British',
      src: 'modules/revolutionary-piratenames/images/british.webp',
      name: `@UUID[${ship.uuid}]{${ship.name}}`,
      description: `${MODULE_ID}.message.description.Merchant`
    })
  })

  it('whispers the composed message to the given recipients', async () => {
    await whisperGeneratedShip('British', 'Merchantman', false, 'Sloop', ship, captain, recipients)
    expect(createSpy).toHaveBeenCalledWith({
      speaker: { alias: `${MODULE_ID}.message.speaker` },
      whisper: recipients,
      flavor: `${MODULE_ID}.message.flavor`,
      content: `${MODULE_ID}.message.content`
    })
  })
})
