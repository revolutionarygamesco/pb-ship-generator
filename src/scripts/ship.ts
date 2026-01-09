import randomizeBetween from './randomizers/between.ts'
import upgradeDie from './upgrade.ts'
import fileActor from './file.ts'
import describeCaptain from './describe.ts'
import { isPremium, icons, tokens } from './premium.ts'
import { fromUuid } from './wrapper.ts'

const baseShip = { type: 'vehicle', img: 'systems/pirateborg/icons/misc/ship.png' }
const premiumRoot = 'modules/pirate-borg-premium/'

const calculateCrewSize = (range: [number, number], min: number, max: number): number => {
  const window = max - min
  const lower = Math.floor(range[0] * window) + min
  const upper = Math.floor(range[1] * window) + min
  return randomizeBetween(lower, upper)
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

const generateSloop = async (details: ShipDetails): Promise<Actor> => {
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  const update: Record<string, any> = {
    'system.attributes.hp.max': 30,
    'system.attributes.hp.value': 30,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': 2,
    'system.attributes.hull.value': 1,
    'system.abilities.agility.value': 2,
    'system.attributes.speed.max': 5,
    'system.attributes.speed.value': 5,
    'system.attributes.speed.min': 0,
    'system.abilities.skill.value': -1,
    'system.weapons.broadsides.die': 'd6',
    'system.weapons.broadsides.quantity': 1,
    'system.weapons.smallArms.die': 'd4',
    'system.weapons.smallArms.quantity': 1,
    'system.weapons.rams.die': 'd4',
    'system.attributes.crew.min': 3,
    'system.attributes.crew.max': 10,
    'system.attributes.crew.value': getCrewSize(details.crewSize, 3, 10),
    'system.attributes.cargo.max': 2,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = premiumRoot + icons.sloop
    update['prototypeToken.texture.src'] = premiumRoot + tokens.sloop
  }

  await ship.update(update)
  return ship
}

const generateBrigntine = async (details: ShipDetails): Promise<Actor> => {
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  const update: Record<string, any> = {
    'system.attributes.hp.max': 40,
    'system.attributes.hp.value': 40,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': 3,
    'system.attributes.hull.value': 2,
    'system.abilities.agility.value': 1,
    'system.attributes.speed.max': 4,
    'system.attributes.speed.value': 4,
    'system.attributes.speed.min': 0,
    'system.abilities.skill.value': 0,
    'system.weapons.broadsides.die': 'd8',
    'system.weapons.broadsides.quantity': 1,
    'system.weapons.smallArms.die': 'd4',
    'system.weapons.smallArms.quantity': 1,
    'system.weapons.rams.die': 'd6',
    'system.attributes.crew.min': 15,
    'system.attributes.crew.max': 30,
    'system.attributes.crew.value': getCrewSize(details.crewSize, 15, 30),
    'system.attributes.cargo.max': 3,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = premiumRoot + icons.brigantine
    update['prototypeToken.texture.src'] = premiumRoot + tokens.brigantine
  }

  await ship.update(update)
  return ship
}

const generateFluyt = async (details: ShipDetails): Promise<Actor> => {
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  const update: Record<string, any> = {
    'system.attributes.hp.max': 50,
    'system.attributes.hp.value': 50,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': 3,
    'system.attributes.hull.value': 2,
    'system.abilities.agility.value': -1,
    'system.attributes.speed.max': 4,
    'system.attributes.speed.value': 4,
    'system.attributes.speed.min': 0,
    'system.abilities.skill.value': 0,
    'system.weapons.broadsides.die': 'd10',
    'system.weapons.broadsides.quantity': 1,
    'system.weapons.smallArms.die': 'd6',
    'system.weapons.smallArms.quantity': 1,
    'system.weapons.rams.die': 'd6',
    'system.attributes.crew.min': 10,
    'system.attributes.crew.max': 40,
    'system.attributes.crew.value': getCrewSize(details.crewSize, 10, 40),
    'system.attributes.cargo.max': 5,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = premiumRoot + icons.fluyt
    update['prototypeToken.texture.src'] = premiumRoot + tokens.frigate
  }

  await ship.update(update)
  return ship
}

const generateFrigate = async (details: ShipDetails): Promise<Actor> => {
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  const update: Record<string, any> = {
    'system.attributes.hp.max': 60,
    'system.attributes.hp.value': 60,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': 3,
    'system.attributes.hull.value': 2,
    'system.abilities.agility.value': 0,
    'system.attributes.speed.max': 4,
    'system.attributes.speed.value': 4,
    'system.attributes.speed.min': 0,
    'system.abilities.skill.value': 1,
    'system.weapons.broadsides.die': 'd8',
    'system.weapons.broadsides.quantity': 2,
    'system.weapons.smallArms.die': 'd6',
    'system.weapons.smallArms.quantity': 1,
    'system.weapons.rams.die': 'd6',
    'system.attributes.crew.min': 24,
    'system.attributes.crew.max': 48,
    'system.attributes.crew.value': getCrewSize(details.crewSize, 24, 48),
    'system.attributes.cargo.max': 4,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = premiumRoot + icons.frigate
    update['prototypeToken.texture.src'] = premiumRoot + tokens.frigate
  }

  await ship.update(update)
  return ship
}

const generateManOWar = async (details: ShipDetails): Promise<Actor> => {
  const ship = await foundry.documents.Actor.create({ name: details.name, ...baseShip })
  const update: Record<string, any> = {
    'system.attributes.hp.max': 75,
    'system.attributes.hp.value': 75,
    'system.attributes.hull.min': 0,
    'system.attributes.hull.max': 3,
    'system.attributes.hull.value': 3,
    'system.abilities.agility.value': -2,
    'system.attributes.speed.max': 3,
    'system.attributes.speed.value': 3,
    'system.attributes.speed.min': 0,
    'system.abilities.skill.value': 2,
    'system.weapons.broadsides.die': 'd8',
    'system.weapons.broadsides.quantity': 3,
    'system.weapons.smallArms.die': 'd8',
    'system.weapons.smallArms.quantity': 1,
    'system.weapons.rams.die': 'd8',
    'system.attributes.crew.min': 50,
    'system.attributes.crew.max': 150,
    'system.attributes.crew.value': getCrewSize(details.crewSize, 50, 150),
    'system.attributes.cargo.max': 4,
    'system.attributes.cargo.value': 0
  }

  if (isPremium()) {
    update['img'] = premiumRoot + icons.manowar
    update['prototypeToken.texture.src'] = premiumRoot + tokens.manowar
  }

  await ship.update(update)
  return ship
}

const generateShip = async (
  details: ShipDetails,
  captain: Actor
): Promise<Actor> => {
  let ship: Actor
  switch (details.type) {
    case 'Brigantine': ship = await generateBrigntine(details); break
    case 'Fluyt': ship = await generateFluyt(details); break
    case 'Frigate': ship = await generateFrigate(details); break
    case 'Man-of-War': ship = await generateManOWar(details); break
    default: ship = await generateSloop(details); break
  }

  // Superior Firepower: Naval ships increase attack dice by one size (p. 112)
  if (details.use === 'Naval') {
    await ship.update({
      'system.weapons.broadsides.die': upgradeDie(ship.system?.weapons?.broadsides?.die ?? 'd4'),
      'system.weapons.smallArms.die': upgradeDie(ship.system?.weapons?.smallArms?.die ?? 'd4'),
      'system.weapons.rams.die': upgradeDie(ship.system?.weapons?.ram?.die ?? 'd4')
    })
  }

  const items = await Promise.all(details.specialty.map(uuid => fromUuid(uuid))) as Document[]
  await ship.createEmbeddedDocuments('Item', items)

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
      case 'armored': upgrades['system.attributes.hull.value'] = Math.min((ship.system?.attributes.hull?.value ?? 0) + 1, (ship.system?.attributes.hull?.max ?? 3)); break
      case 'ram': upgrades['system.weapons.ram.die'] = `2${ship.system?.weapons?.ram?.die ?? 'd4'}`; break
      case 'sails':
        const speed = ship.system?.attributes.speed?.value ?? 4
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
