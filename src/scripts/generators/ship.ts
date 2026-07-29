import { chance } from '@revolutionarygamesco/common'
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

import createBrigantine from '../actors/ships/classes/brigantine.ts'
import createFluyt from '../actors/ships/classes/fluyt.ts'
import createFrigate from '../actors/ships/classes/frigate.ts'
import createManOfWar from '../actors/ships/classes/manowar.ts'
import createSloop from '../actors/ships/classes/sloop.ts'

import randomizeQuartermaster from '../randomizers/crew/quartermaster.ts'
import randomizeBosun from '../randomizers/crew/bosun.ts'
import randomizeMasterGunner from '../randomizers/crew/gunner.ts'
import createQuartermaster from '../actors/characters/archetypes/quartermaster.ts'
import createBosun from '../actors/characters/archetypes/bosun.ts'
import createMasterGunner from '../actors/characters/archetypes/gunner.ts'

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

  const specialtyCrewFeatures = await Promise.all(specialtyCrew.map(uuid => foundry.utils.fromUuid(uuid))) as foundry.documents.Item[]
  await actor.createEmbeddedDocuments('Item', specialtyCrewFeatures)

  await actor.update({
    'system.crews': crews,
  })

  return actor
}

export default generateShip
