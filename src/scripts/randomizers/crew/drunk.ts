import { chance } from '@revolutionarygamesco/common'
import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

const randomizeDrunkenness = (
  colors: Colors,
  role: ShipRole = 'Merchantman',
  privateer: boolean = false
): string | null => {
  let chances = 15
  if (role === 'Man-of-War' && privateer) chances = 35
  if (role === 'Man-of-War' && !privateer) chances = 15
  if (colors === 'Pirate') chances = 60

  return chance(chances, 100)
    ? getFeatureUUID('P89ELFOoYxzjuQSh')
    : null
}

export default randomizeDrunkenness
