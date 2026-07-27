import { chance } from '@revolutionarygamesco/common'
import { type ShipRole } from '../../types/enums/role.ts'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'

const randomizeMasterGunner = (
  role: ShipRole
): string | null => {
  const chances = role === 'Man-of-War' ? 6 : 1
  return chance(chances, 10)
    ? getFeatureUUID('rRwYfX3SR1rBh4jO')
    : null
}

export default randomizeMasterGunner
