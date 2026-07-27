import { type Colors } from '../types/enums/colors.ts'
import { type ShipRole } from '../types/enums/role.ts'

const nameShip = async (
  colors: Colors,
  role: ShipRole,
  privateer: boolean = false
): Promise<Record<string, string>> => {
  const module = game.modules.get('revolutionary-piratenames')
  if (!module) throw new Error('Could not load Pirate Names module.')
  return await module.api.generateShipName({ colors, role, privateer })
}

export default nameShip
