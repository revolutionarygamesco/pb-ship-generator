import { scopeLocalizer, makeLink, whisper } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { type Colors } from './types/enums/colors.ts'
import { type ShipRole } from './types/enums/role.ts'
import { type ShipClass } from './types/enums/class.ts'

const whisperGeneratedShip = async (
  colors: Colors,
  role: ShipRole,
  privateer: boolean,
  shipClass: ShipClass,
  ship: foundry.documents.Actor,
  captain: foundry.documents.Actor,
  recipients: string[]
): Promise<void> => {
  const t = scopeLocalizer(`${MODULE_ID}.message`)
  const navy = game.i18n.localize(`${MODULE_ID}.navies.${colors}`)

  let path = role === 'Merchantman' ? 'Merchant' : privateer ? 'Privateer' : 'Naval'
  if (colors === 'Dutch') path = 'Dutch'
  if (colors === 'Pirate') path = 'Pirate'
  const description = t(['description', path], {
    captain: makeLink(captain),
    class: shipClass.toLowerCase(),
    colors,
    navy
  })

  const content = t('content', {
    alt: colors,
    src: `modules/revolutionary-piratenames/images/${colors.toLowerCase()}.webp`,
    name: makeLink(ship),
    description
  })

  const flavor = t('flavor')
  const speaker = t('speaker')
  await whisper({ flavor, content, speaker, recipients })
}

export default whisperGeneratedShip
