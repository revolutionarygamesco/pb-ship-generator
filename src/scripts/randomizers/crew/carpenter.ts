import { chance } from '@revolutionarygamesco/common'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

const randomizeMasterCarpenter = (): string | null => {
  return chance(1, 4)
    ? getFeatureUUID('usyDHqr0Lg4jXWtN')
    : null
}

export default randomizeMasterCarpenter
