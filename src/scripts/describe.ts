import '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'
import { makeLink } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import isLegendary from './utilities/legendary.ts'

const describeCaptain = async (
  captain: foundry.documents.Actor,
  ship: foundry.documents.Actor,
  details: ShipDetails
): Promise<void> => {
  const t = game.i18n.localize
  const sovereigns = ['Spanish', 'British', 'French']
  const sovereign = sovereigns.includes(details.nationality)
    ? t(`${MODULE_ID}.sovereigns.${details.nationality}`)
    : t(`${MODULE_ID}.sovereigns.British`)

  const data = {
    name: captain.name,
    type: details.type.toLowerCase(),
    ship: makeLink(ship),
    nation: details.captain.culture,
    navy: t(`${MODULE_ID}.navies.${details.nationality}`),
    sovereign
  }

  const level = isLegendary(details) ? 'legendary' : details.captain.xp.toLowerCase()
  const kind = details.pirate ? 'pirate' : details.nationality === 'Dutch' ? 'dutch' : details.use.toLowerCase()
  const flavor = t(`${MODULE_ID}.captains.${kind}.${level}`, data)

  const desc = `<p><em>${flavor}</em></p>${captain.system?.description}`
  await captain.update({ 'system.description': desc })
}

export default describeCaptain
