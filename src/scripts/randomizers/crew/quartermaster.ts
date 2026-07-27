import { chance } from '@revolutionarygamesco/common'
import { type CaptainExperience } from '../../actors/characters/descriptions/captain.ts'
import { type Colors } from '../../types/enums/colors.ts'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'

const randomizeQuartermaster = (
  colors: Colors,
  captain: CaptainExperience
): string | null => {
  if (colors !== 'Pirate') return null

  const chances: Record<CaptainExperience, number> = {
    legendary: 4,
    high: 3,
    medium: 2,
    low: 1
  }

  return chance(chances[captain], 10)
    ? getFeatureUUID('Z3pAMBnBvSWRxFUm')
    : null
}

export default randomizeQuartermaster
