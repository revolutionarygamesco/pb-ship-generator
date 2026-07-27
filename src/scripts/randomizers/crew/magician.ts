import { selectRandomBetween } from '@revolutionarygamesco/common'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

const randomizeMagician = (): string | null => {
  const r = selectRandomBetween(1, 20)
  if (r === 1) return getFeatureUUID('0KDL3PjlyVOFQUxG')
  if (r === 20) return getFeatureUUID('oh2VItoo8q4i49GX')
  return null
}

export default randomizeMagician
