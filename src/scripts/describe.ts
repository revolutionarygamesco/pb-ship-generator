import { MODULE_ID } from './settings.ts'
import { linkActor } from './utilities/link.ts'
import { localize } from './wrapper.ts'
import isLegendary from './utilities/legendary.ts'

const describeCaptain = async (
  captain: Actor,
  ship: Actor,
  details: ShipDetails
): Promise<void> => {
  const sovereigns = ['Spanish', 'British', 'French']
  const sovereign = sovereigns.includes(details.nationality)
    ? localize(`${MODULE_ID}.sovereigns.${details.nationality}`)
    : localize(`${MODULE_ID}.sovereigns.British`)

  const data = {
    name: captain.name,
    type: details.type.toLowerCase(),
    ship: linkActor(ship),
    nation: details.captain.culture,
    navy: localize(`${MODULE_ID}.navies.${details.nationality}`),
    sovereign
  }

  const level = isLegendary(details) ? 'legendary' : details.captain.xp.toLowerCase()
  const kind = details.pirate ? 'pirate' : details.use.toLowerCase()
  const flavor = localize(`${MODULE_ID}.captains.${kind}.${level}`, data)

  const desc = `<p><em>${flavor}</em></p>${captain.system?.description}`
  await captain.update({ 'system.description': desc })
}

export default describeCaptain
