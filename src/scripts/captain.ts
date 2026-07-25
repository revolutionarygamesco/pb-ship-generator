import { selectRandomBetween, chance } from '@revolutionarygamesco/common'
import { drawGuarded, roll } from '@revolutionarygamesco/common-foundryvtt'
import { tables } from './ids.ts'
import isLegendary from './utilities/legendary.ts'

export const isCulture = (candidate: unknown): candidate is Culture => {
  if (typeof candidate !== 'string') return false
  const cultures = ['Spanish', 'English', 'Scottish', 'Welsh', 'Irish', 'French', 'Dutch']
  return cultures.includes(candidate)
}

export const generateCaptainHP = (
  xp: string,
  legendary: boolean = false
): number => {
  const ranges: Record<string, [number, number]> = {
    Low: [4, 10],
    Medium: [4, 12],
    High: [8, 12]
  }
  const index = xp in ranges ? xp : 'Medium'
  const [min, max] = ranges[index]
  return legendary
    ? selectRandomBetween(min, max) + selectRandomBetween(1, 12)
    : selectRandomBetween(min, max)
}

export const generateCaptainMorale = (
  xp: string,
  legendary: boolean = false
): number => {
  const ranges: Record<string, [number, number]>  = {
    Low: [2, 8],
    Medium: [6, 9],
    High: [7, 10]
  }
  const index = xp in ranges ? xp : 'Medium'
  const [min, max] = ranges[index]
  return legendary
    ? selectRandomBetween(min, max) + 1
    : selectRandomBetween(min, max)
}

export const getWeapon = (xp: string): {
  description: string,
  formula: string
} => {
  const prefersRapier = chance(1, 3)
  if (prefersRapier && xp === 'High') {
    return { description: 'Finely-crafted rapier', formula: 'd8' }
  } else if (prefersRapier) {
    return { description: 'Rapier', formula: 'd6' }
  } else if (xp === 'High') {
    return { description: 'Officer’s cutlass', formula: 'd8' }
  } else {
    return { description: 'Cutlass', formula: 'd6' }
  }
}

const chooseCulture = async (details: ShipDetails): Promise<Culture> => {
  if (details.use === 'Naval') return details.captain.culture
  const reroll = details.pirate || chance(1, 100)
  const englishToCeltic = details.nationality === 'British' && chance(1, 3)
  if (!reroll && !englishToCeltic) return details.captain.culture

  const table = details.pirate
    ? tables.cultures.pirate
    : englishToCeltic ? tables.cultures.celtic : tables.cultures.legit
  return drawGuarded(table, isCulture, details.nationality === 'British' ? 'English' : details.nationality)
}

const shantiesExpr: Record<string, string> = {
  'Low': 'd2-1',
  'Medium': 'd2',
  'High': 'd4',
}

const generateCaptain = async (
  details: ShipDetails
): Promise<{ captain: foundry.documents.Actor, shanties: number }> => {
  const { xp } = details.captain
  const legendary = isLegendary(details)
  const culture = await chooseCulture(details)

  const expr = legendary ? 'd6' : xp in shantiesExpr ? shantiesExpr[xp] : 'd2 - 1'
  const shanties = roll(expr)

  const namer = game.modules.get('revolutionary-piratenames')
  const name = namer
    ? `Captain ${await namer.api.generateName(culture, 'Masculine')}`
    : 'Captain'

  const captain = await foundry.documents.Actor.create({ name, type: 'creature', img: 'systems/pirateborg/icons/misc/captain.png' })
  if (!captain) throw new Error('Could not create captain')

  const hp = generateCaptainHP(xp, legendary)
  const morale = generateCaptainMorale(xp, legendary)
  const weapon = getWeapon(xp)

  const descriptions = [
    `<p><strong>HP</strong> ${hp}</p>`,
    `<p><strong>Morale</strong> ${morale}</p>`,
    '<p><strong>No Armor</strong></p>',
    `<p><strong>${weapon.description}</strong> ${weapon.formula}</p>`,
    '<p><strong>Flintlock</strong> 2d4 (reload 2)'
  ]

  if (legendary) descriptions.push(`<p><strong>Legendary Captain</strong>: Take an extra crew action each round in naval combat, even if it has already been taken.</p>`)
  if (xp === 'High') descriptions.push(`<p><strong>Experienced Leader</strong>: Nearby allies are +2 DR to attack or defend against.</p>`)

  await captain.update({
    'system.attributes.hp.max': hp,
    'system.attributes.hp.value': hp,
    'system.attributes.morale': morale,
    'system.attributes.speed.max': 6,
    'system.attributes.speed.min': 0,
    'system.attributes.speed.value': 6,
    'system.attributes.armor.formula': '0',
    'system.attributes.armor.description': 'No armor',
    'system.attributes.attack.formula': weapon.formula,
    'system.attributes.attack.description': weapon.description,
    'system.description': descriptions.join('')
  })

  return { captain, shanties }
}

export default generateCaptain
