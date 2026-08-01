import { type GenerateShipParams } from './params.ts'
import { type ShipClass } from '../../types/enums/class.ts'
import { type ShipUpgrade } from '../../types/enums/upgrade.ts'
import nameShip from '../../names/ship.ts'
import getShipActorName from '../../names/selectors/ship-actor.ts'
import applyUpgrades from '../../actors/ships/upgrades/apply.ts'
import addNavalFirepower from '../../actors/ships/upgrades/naval.ts'
import createFolder from './folder.ts'

import createBrigantine from '../../actors/ships/classes/brigantine.ts'
import createFluyt from '../../actors/ships/classes/fluyt.ts'
import createFrigate from '../../actors/ships/classes/frigate.ts'
import createManOfWar from '../../actors/ships/classes/manowar.ts'
import createSloop from '../../actors/ships/classes/sloop.ts'

const shipBaseCreators: Record<ShipClass, (name: string) => Partial<foundry.documents.Actor>> = {
  Brigantine: createBrigantine,
  Fluyt: createFluyt,
  Frigate: createFrigate,
  'Man-of-War': createManOfWar,
  Sloop: createSloop
}

const createShipBase = async (
  params: GenerateShipParams,
  upgrades: ShipUpgrade[] = []
): Promise<{ ship: foundry.documents.Actor, folder: foundry.documents.Folder | undefined }> => {
  const names = await nameShip(params.colors, params.role, params.privateer)
  const name = getShipActorName(params.colors, names)
  const base = shipBaseCreators[params.shipClass](name)
  const isNaval = params.role === 'Man-of-War' && !params.privateer
  if (isNaval) addNavalFirepower(base)
  applyUpgrades(base, upgrades)

  const folder = await createFolder(params, name)
  base.folder = folder

  const ship = await foundry.documents.Actor.create(base)
  if (!ship) throw new Error('Failed to create ship')
  return { ship, folder }
}

export default createShipBase
