import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeDrunkenness from '../../randomizers/crew/drunk.ts'

const generateDrunks = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, privateer, role, features } = params
  const feature = randomizeDrunkenness(colors, role, privateer)
  if (!feature) return
  features.push(feature)
}

export default generateDrunks
