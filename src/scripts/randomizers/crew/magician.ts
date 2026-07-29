import { selectRandomBetween } from '@revolutionarygamesco/common'
import getFeatureUUID  from '../../utilities/get-feature-uuid.ts'

interface MagicianCrew {
  priest: string | null
  sorcerer: string | null
}

const randomizeMagician = (): MagicianCrew => {
  const data: MagicianCrew = { priest: null, sorcerer: null }
  const r = selectRandomBetween(1, 20)
  if (r === 1) data.sorcerer = getFeatureUUID('0KDL3PjlyVOFQUxG')
  if (r === 20) data.priest = getFeatureUUID('oh2VItoo8q4i49GX')
  return data
}

export default randomizeMagician
