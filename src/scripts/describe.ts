import { specialty } from './ids.ts'

const isLegendary = (details: ShipDetails) => {
  return details.specialty.includes(specialty.captain)
}

const getPirateFlavor = (
  captain: Actor,
  details: ShipDetails,
  xp: string
): string => {
  if (isLegendary(details)) return `${captain.name} is the notorious captain of the pirate ${details.type.toLowerCase()}, the ${details.name}.`
  switch (xp) {
    case 'High': return `${captain.name} is the seasoned captain of the pirate ${details.type.toLowerCase()}, the ${details.name}.`
    case 'Low': return `${captain.name} is the inexperienced captain of the pirate ${details.type.toLowerCase()}, the ${details.name}.`
    default: return `${captain.name} is the captain of the pirate ${details.type.toLowerCase()}, the ${details.name}.`
  }
}

const getNavalFlavor = (
  captain: Actor,
  details: ShipDetails,
  xp: string
): string => {
  if (isLegendary(details)) return `${captain.name} is a legendary captain of the ${details.nationality} navy.`
  switch (xp) {
    case 'High': return `${captain.name} is a decorated and respected captain of the ${details.nationality} navy.`
    case 'Low': return `${captain.name} is an inexperienced captain in the ${details.nationality} navy.`
    default: return `${captain.name} is a captain in the ${details.nationality} navy.`
  }
}

const getMerchantFlavor = (
  captain: Actor,
  details: ShipDetails,
  xp: string
): string => {
  if (isLegendary(details)) return `${captain.name} is a legend among ${details.nationality} traders and merchants for his ability to outrun pirates and bring his cargo to port.`
  switch (xp) {
    case 'High': return `${captain.name} is a respected ${details.nationality} captain.`
    case 'Low': return `${captain.name} has earned enough confidence from ${details.nationality} investors to secure a captaincy, but not yet the confidence of his crew.`
    default: return `${captain.name} is a ${details.nationality} captain.`
  }
}

const getFlavor = (
  captain: Actor,
  details: ShipDetails,
  xp: string
): string => {
  if (details.pirate) return getPirateFlavor(captain, details, xp)
  if (details.naval) return getNavalFlavor(captain, details, xp)
  return getMerchantFlavor(captain, details, xp)
}

const describeCaptain = async (
  captain: Actor,
  details: ShipDetails,
  xp: string
): Promise<void> => {
  const flavor = getFlavor(captain, details, xp)
  const desc = `<p><em>${flavor}</em></p>${captain.system?.description}`
  await captain.update({ 'system.description': desc })
}

export default describeCaptain
