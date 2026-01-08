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
    sovereign
  }

  const flavor = isLegendary(details)
    ? localize(`${MODULE_ID}.captains.${details.use.toLowerCase()}.legendary`, data)
    : localize(`${MODULE_ID}.captains.${details.use.toLowerCase()}.${details.captain.xp.toLowerCase()}`, data)

  const desc = `<p><em>${flavor}</em></p>${captain.system?.description}`
  await captain.update({ 'system.description': desc })
}

export default describeCaptain
