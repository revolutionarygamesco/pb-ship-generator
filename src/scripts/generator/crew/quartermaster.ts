import { type SpecialtyCrewGenerationParams } from './params.ts'
import { type CaptainExperience } from '../../actors/characters/descriptions/captain.ts'
import randomizeQuartermaster from '../../randomizers/crew/quartermaster.ts'
import createQuartermaster from '../../actors/characters/archetypes/quartermaster.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

export interface QuartermasterParams extends SpecialtyCrewGenerationParams {
  experience: CaptainExperience
}

const generateQuartermaster = async (
  params: QuartermasterParams
): Promise<void> => {
  const { colors, experience, ship, folder, features, crews } = params
  const feature = randomizeQuartermaster(colors, experience)
  if (!feature) return

  const { actor, names } = await createQuartermaster(ship, folder)
  const { id } = await createActor(actor, names)
  features.push(feature)
  crews.push(id!)
}

export default generateQuartermaster
