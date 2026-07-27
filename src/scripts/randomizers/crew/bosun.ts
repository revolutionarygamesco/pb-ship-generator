import { chance } from '@revolutionarygamesco/common'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

const randomizeBosun = (): string | null => {
  return chance(1, 3)
    ? getFeatureUUID('67OUgeWGhrTp629d')
    : null
}

export default randomizeBosun
