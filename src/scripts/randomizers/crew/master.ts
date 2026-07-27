import { chance } from '@revolutionarygamesco/common'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

const randomizeSailingMaster = (): string | null => {
  return chance(1, 3)
    ? getFeatureUUID('LKAXQBEp2CEgXEcH')
    : null
}

export default randomizeSailingMaster
