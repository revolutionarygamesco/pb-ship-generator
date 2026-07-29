import { chance } from '@revolutionarygamesco/common'
import { makeLink } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { selectRandomColors, type Colors } from '../types/enums/colors.ts'
import { selectRandomShipRole, type ShipRole } from '../types/enums/role.ts'
import { selectRandomShipClass, type ShipClass } from '../types/enums/class.ts'
import nameShip from '../names/ship.ts'
import getShipActorName from '../names/selectors/ship-actor.ts'
import findCategoryFolder from '../utilities/find-folder.ts'
import selectRandomThreatProfile from '../randomizers/threat.ts'
import addShanties from '../randomizers/shanties.ts'
import applyUpgrades from '../actors/ships/upgrades/apply.ts'
import addNavalFirepower from '../actors/ships/upgrades/naval.ts'
import getFeatureUUID from '../utilities/get-feature-uuid.ts'

import createBrigantine from '../actors/ships/classes/brigantine.ts'
import createFluyt from '../actors/ships/classes/fluyt.ts'
import createFrigate from '../actors/ships/classes/frigate.ts'
import createManOfWar from '../actors/ships/classes/manowar.ts'
import createSloop from '../actors/ships/classes/sloop.ts'

import randomizeQuartermaster from '../randomizers/crew/quartermaster.ts'
import randomizeBosun from '../randomizers/crew/bosun.ts'
import randomizeMasterGunner from '../randomizers/crew/gunner.ts'
import randomizeSailingMaster from '../randomizers/crew/master.ts'
import randomizeMasterCarpenter from '../randomizers/crew/carpenter.ts'
import randomizeMagician from '../randomizers/crew/magician.ts'

import createCaptain from '../actors/characters/archetypes/captain.ts'
import createQuartermaster from '../actors/characters/archetypes/quartermaster.ts'
import createBosun from '../actors/characters/archetypes/bosun.ts'
import createMasterGunner from '../actors/characters/archetypes/gunner.ts'
import createSailingMaster from '../actors/characters/archetypes/master.ts'
import createMasterCarpenter from '../actors/characters/archetypes/carpenter.ts'
import createDeckPriest from '../actors/characters/archetypes/priest.ts'
import createDeckSorcerer from '../actors/characters/archetypes/sorcerer.ts'

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
): Promise<foundry.documents.Actor> => {
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

  const actor = await foundry.documents.Actor.create(base)
  if (!actor) throw new Error('Failed to create ship actor')
  await addShanties(actor, shanties)

  const specialtyCrew: string[] = []
  const crews: string[] = []

  const quartermaster = randomizeQuartermaster(colors, experience)
  const bosun = randomizeBosun()
  const gunner = randomizeMasterGunner(role)
  const master = randomizeSailingMaster()
  const carpenter = randomizeMasterCarpenter()
  const { priest, sorcerer } = randomizeMagician()

  const captain = await createCaptain(
    colors,
    role === 'Man-of-War' && privateer,
    experience,
    actor,
    shipClass.toLowerCase(),
    folder,
    isNaval
  )

  if (experience === 'legendary') specialtyCrew.push(getFeatureUUID('dmlGTnZhfEgWUYDm'))
  crews.push(captain.id!)

  if (quartermaster) {
    const { id } = await createQuartermaster(actor, folder)
    specialtyCrew.push(quartermaster)
    crews.push(id!)
  }

  if (bosun) {
    const { id } = await createBosun(colors, actor, folder, isNaval)
    specialtyCrew.push(bosun)
    crews.push(id!)
  }

  if (gunner) {
    const { id } = await createMasterGunner(colors, actor, folder, isNaval)
    specialtyCrew.push(gunner)
    crews.push(id!)
  }

  if (master) {
    const { id } = await createSailingMaster(colors, actor, folder, isNaval)
    specialtyCrew.push(master)
    crews.push(id!)
  }

  if (priest) {
    const { id } = await createDeckPriest(colors, actor, folder, isNaval)
    specialtyCrew.push(priest)
    crews.push(id!)
  }

  if (sorcerer) {
    const { id } = await createDeckSorcerer(colors, actor, folder, isNaval)
    specialtyCrew.push(sorcerer)
    crews.push(id!)
  }

  if (carpenter) {
    const { id } = await createMasterCarpenter(colors, actor, folder, isNaval)
    specialtyCrew.push(carpenter)
    crews.push(id!)
  }

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

  const specialtyCrewFeatures = await Promise.all(specialtyCrew.map(uuid => foundry.utils.fromUuid(uuid))) as foundry.documents.Item[]
  await actor.createEmbeddedDocuments('Item', specialtyCrewFeatures)

  await actor.update({
    'system.crews': crews,
    'system.captain': captain.id,
    'system.description': desc
  })

  return actor
}

export default generateShip
