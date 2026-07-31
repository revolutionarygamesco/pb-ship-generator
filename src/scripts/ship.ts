import { chance } from '@revolutionarygamesco/common'
import { makeLink } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { selectRandomColors, type Colors } from './types/enums/colors.ts'
import { selectRandomShipRole, type ShipRole } from './types/enums/role.ts'
import { selectRandomShipClass, type ShipClass } from './types/enums/class.ts'
import nameShip from './names/ship.ts'
import getShipActorName from './names/selectors/ship-actor.ts'
import findCategoryFolder from './utilities/find-folder.ts'
import selectRandomThreatProfile from './randomizers/threat.ts'
import addShanties from './randomizers/shanties.ts'
import applyUpgrades from './actors/ships/upgrades/apply.ts'
import addNavalFirepower from './actors/ships/upgrades/naval.ts'
import generateCrew from './generator/crew/all.ts'

import createBrigantine from './actors/ships/classes/brigantine.ts'
import createFluyt from './actors/ships/classes/fluyt.ts'
import createFrigate from './actors/ships/classes/frigate.ts'
import createManOfWar from './actors/ships/classes/manowar.ts'
import createSloop from './actors/ships/classes/sloop.ts'

const actorCreators: Record<ShipClass, (name: string) => Partial<foundry.documents.Actor>> = {
  Brigantine: createBrigantine,
  Fluyt: createFluyt,
  Frigate: createFrigate,
  'Man-of-War': createManOfWar,
  Sloop: createSloop
}

interface GenerateShipParams {
  colors: Colors
  role: ShipRole
  privateer: boolean
  shipClass: ShipClass
}

const generateShip = async (
  params?: Partial<GenerateShipParams>
): Promise<{ ship: foundry.documents.Actor, captain: foundry.documents.Actor }> => {
  const colors = params?.colors ?? await selectRandomColors()
  const role = params?.role ?? selectRandomShipRole()
  const privateer = params?.privateer ?? chance(2, 3)
  const shipClass = params?.shipClass ?? selectRandomShipClass()
  const names = await nameShip(colors, role, privateer)
  const name = getShipActorName(colors, names)
  const base = actorCreators[shipClass](name)
  const isNaval = role === 'Man-of-War' && !privateer

  if (isNaval) addNavalFirepower(base)

  let folder: foundry.documents.Folder | undefined
  const category = findCategoryFolder(colors, role, privateer)
  if (category) {
    folder = await foundry.documents.Folder.create({ name, type: 'Actor', folder: category })
    if (folder) base.folder = folder
  }

  const { upgrades, shanties, experience } = selectRandomThreatProfile()
  applyUpgrades(base, upgrades)

  const ship = await foundry.documents.Actor.create(base)
  if (!ship) throw new Error('Failed to create ship')
  await addShanties(ship, shanties)

  const { captain, features, crews } = await generateCrew({
    colors,
    privateer: role === 'Man-of-War' && privateer,
    role,
    experience,
    ship,
    shipClass,
    folder,
    isNaval,
    features: [],
    crews: []
  })

  let d = 'merchant'
  if (role === 'Man-of-War') d = privateer ? 'privateer' : 'navy'
  if (colors === 'Dutch') d = 'dutch'
  if (colors === 'Pirate') d = 'pirate'
  const navy = game.i18n.localize(`${MODULE_ID}.navies.${colors}`)
  const desc = game.i18n.localize([MODULE_ID, 'ships', shipClass.toLowerCase(), 'description', d].join('.'), {
    name,
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

  return { ship, captain }
}

export default generateShip
