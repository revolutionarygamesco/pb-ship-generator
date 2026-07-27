import { retryUntil } from '@revolutionarygamesco/common'
import { type Colors } from '../types/enums/colors.ts'
import { type ShipRole } from '../types/enums/role.ts'
import findCategoryFolder from '../utilities/find-folder.ts'
import getShipActorName from './selectors/ship-actor.ts'

const nameShip = async (
  colors: Colors,
  role: ShipRole,
  privateer: boolean = false
): Promise<Record<string, string>> => {
  const module = game.modules.get('revolutionary-piratenames')
  if (!module) throw new Error('Could not load Pirate Names module.')

  const category = findCategoryFolder(colors, role, privateer)
  if (!category) throw new Error('Could not load ship category folder.')

  const names = await retryUntil(async (): Promise<Record<string, string>> => {
    return module.api.generateShipName({ colors, role, privateer })
  }, (names: Record<string, string>) => {
    const name = getShipActorName(colors, names)
    return category.children.every(child => child.folder.name !== name)
  }, { fallback: {} })

  if (Object.keys(names).length < 1) throw new Error('Could not find an available name.')
  return names
}

export default nameShip
