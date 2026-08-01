import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import type { ShipClass } from '../../types/enums/class.ts'
import { MODULE_ID } from '../../settings.ts'
import { makeLink } from '@revolutionarygamesco/common-foundryvtt'

const updateShip = async (
  ship: foundry.documents.Actor,
  captain: foundry.documents.Actor,
  colors: Colors,
  role: ShipRole,
  privateer: boolean,
  shipClass: ShipClass,
  features: string[],
  crews: string[]
): Promise<void> => {
  let tag = 'merchant'
  if (role === 'Man-of-War') tag = privateer ? 'privateer' : 'navy'
  if (colors === 'Dutch') tag = 'dutch'
  if (colors === 'Pirate') tag = 'pirate'

  const navy = game.i18n.localize(`${MODULE_ID}.navies.${colors}`)
  const path = shipClass === 'Fluyt'
    ? [MODULE_ID, 'ships', 'fluyt', 'description'].join('.')
    : shipClass === 'Man-of-War'
      ? [MODULE_ID, 'ships', 'manowar', 'description'].join('.')
      : [MODULE_ID, 'ships', shipClass.toLowerCase(), 'description', tag].join('.')
  const desc = game.i18n.localize(path,  {
    name: ship.name,
    nationality: colors,
    captain: makeLink(captain),
    navy
  })

  const specialtyCrewFeatures = await Promise.all(features.map(uuid => foundry.utils.fromUuid(uuid))) as foundry.documents.Item[]
  await ship.createEmbeddedDocuments('Item', specialtyCrewFeatures)

  await ship.update({
    'system.crews': crews,
    'system.captain': captain.id,
    'system.description': desc
  })
}

export default updateShip
