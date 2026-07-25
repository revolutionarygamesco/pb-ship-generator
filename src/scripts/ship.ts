import { selectRandomBetween, shuffleArray } from '@revolutionarygamesco/common'
import upgradeDie from './upgrade.ts'
import fileActor from './file.ts'
import describeCaptain from './describe.ts'
import { isPremium } from './premium.ts'
import shipStats from './ship.stats.ts'

const baseShip = { type: 'vehicle', img: 'systems/pirateborg/icons/misc/ship.png' }

const shantyIDs = [
  'Compendium.pirateborg.ships-mystic-shanties.Item.EqhO6liqxQIjj4fx',
  'Compendium.pirateborg.ships-mystic-shanties.Item.GsLWJKY8b0mX75Ak',
  'Compendium.pirateborg.ships-mystic-shanties.Item.6GtPUU2uRHWitZNf',
  'Compendium.pirateborg.ships-mystic-shanties.Item.5sGIaD4NrgbDmBhF',
  'Compendium.pirateborg.ships-mystic-shanties.Item.almpFrxdxUPaflde',
  'Compendium.pirateborg.ships-mystic-shanties.Item.OanvNBBhECR1Smf2',
  'Compendium.pirateborg.ships-mystic-shanties.Item.Hvwq3xmyx0ZYQ4p7',
  'Compendium.pirateborg.ships-mystic-shanties.Item.zECCg4TTGgZKkiu1',
  'Compendium.pirateborg.ships-mystic-shanties.Item.zECCg4TTGgZKkiu1',
  'Compendium.pirateborg.ships-mystic-shanties.Item.3CRnf7GzD9B12qhv',
  'Compendium.pirateborg.ships-mystic-shanties.Item.Ww0BTi6vlINYTVO9',
  'Compendium.pirateborg.ships-mystic-shanties.Item.M6rg2aULaFFomBSE'
]

const calculateCrewSize = (range: [number, number], min: number, max: number): number => {
  const window = max - min
  const lower = Math.floor(range[0] * window) + min
  const upper = Math.floor(range[1] * window) + min
  return selectRandomBetween(lower, upper)
}

const getCrewSize = (desc: string, min: number, max: number): number => {
  switch (desc) {
    case 'Skeleton': return calculateCrewSize([0, 0.1], min, max)
    case 'Small': return calculateCrewSize([0.1, 0.5], min, max)
    case 'Large': return calculateCrewSize([0.8, 1], min, max)
    case 'Overloaded': return calculateCrewSize([1, 2], min, max)
    default: return calculateCrewSize([0.5, 0.8], min, max)
  }
}

const generateShip = async (
  details: ShipDetails,
  captain: foundry.documents.Actor
): Promise<foundry.documents.Actor> => {
  const key = details.type in shipStats ? details.type : 'Sloop'
  const { stats, img, token } = shipStats[key]
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  if (!ship) throw new Error('Could not create ship.')

  const update: Record<string, any> = {
    'system.attributes.hp.max': stats.hp,
    'system.attributes.hp.value': stats.hp,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': stats.hull,
    'system.attributes.hull.value': stats.hull,
    'system.abilities.agility.value': stats.agility,
    'system.attributes.speed.max': stats.speed,
    'system.attributes.speed.value': stats.speed,
    'system.attributes.speed.min': 0,
    'system.attributes.shanties.max': details.shanties,
    'system.attributes.shanties.value': details.shanties,
    'system.attributes.shanties.min': 0,
    'system.abilities.skill.value': stats.skill,
    'system.weapons.broadsides.die': `d${stats.broadsides.die}`,
    'system.weapons.broadsides.quantity': stats.broadsides.quantity,
    'system.weapons.smallArms.die': `d${stats.small.die}`,
    'system.weapons.smallArms.quantity': stats.small.quantity,
    'system.weapons.rams.die': `d${stats.ram.die}`,
    'system.attributes.crew.min': stats.crew.min,
    'system.attributes.crew.max': stats.crew.max,
    'system.attributes.crew.value': getCrewSize(details.crewSize, stats.crew.min, stats.crew.max),
    'system.attributes.cargo.max': stats.cargo,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = img
    update['prototypeToken.texture.src'] = token
  }

  await ship.update(update)

  // Superior Firepower: Naval ships increase attack dice by one size (p. 112)
  if (details.use === 'Naval') {
    await ship.update({
      'system.weapons.broadsides.die': upgradeDie(ship.system?.weapons?.broadsides?.die ?? 'd4'),
      'system.weapons.smallArms.die': upgradeDie(ship.system?.weapons?.smallArms?.die ?? 'd4'),
      'system.weapons.ram.die': upgradeDie(ship.system?.weapons?.ram?.die ?? 'd4')
    })
  }

  const items = await Promise.all(details.specialty.map(uuid => foundry.utils.fromUuid(uuid))) as foundry.documents.Item[]
  await ship.createEmbeddedDocuments('Item', items)

  const shuffled = shuffleArray(shantyIDs).slice(0, details.shanties)
  const shanties = await Promise.all(shuffled.map(uuid => foundry.utils.fromUuid(uuid))) as foundry.documents.Item[]
  await ship.createEmbeddedDocuments('Item', shanties)

  // Apply upgrades
  const upgrades: Record<string, any> = {
    'system.crews': [captain.id],
    'system.captain': captain.id
  }

  for (const upgrade of details.upgrades) {
    switch (upgrade) {
      case 'upgrade-swivels': upgrades['system.weapons.smallArms.warning'] = 'Upgraded Swivels: Small arms deal +2 damage.'; break
      case 'extra-swivels': upgrades['system.weapons.smallArms.quantity'] = (ship.system?.weapons?.smallArms?.quantity ?? 1) + 1; break
      case 'upgrade-cannons': upgrades['system.weapons.broadsides.warning'] = 'Upgraded Cannons: Broadsides deal +2 damage.'; break
      case 'extra-cannons': upgrades['system.weapons.broadsides.quantity'] = (ship.system?.weapons?.broadsides?.quantity ?? 1) + 1; break
      case 'armored': upgrades['system.attributes.hull.value'] = Math.min((ship.system?.attributes?.hull?.value ?? 0) + 1, (ship.system?.attributes?.hull?.max ?? 3)); break
      case 'ram': upgrades['system.weapons.ram.die'] = `2${ship.system?.weapons?.ram?.die ?? 'd4'}`; break
      case 'sails':
        const speed = ship.system?.attributes?.speed?.value ?? 4
        const agility = ship.system?.abilities?.agility?.value ?? 0
        upgrades['system.attributes.speed.value'] = speed + 1
        upgrades['system.attributes.speed.max'] = speed + 1
        upgrades['system.abilities.agility.value'] = agility + 1
        break;
    }
  }

  await ship.update(upgrades)
  await describeCaptain(captain, ship, details)
  await fileActor(ship, details)

  return ship
}

export default generateShip
