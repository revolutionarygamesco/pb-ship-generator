import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeCarpenter from '../../randomizers/crew/carpenter.ts'
import createCarpenter from '../../actors/characters/archetypes/carpenter.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

const generateCarpenter = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, ship, folder, isNaval, features, crews } = params
  const feature = randomizeCarpenter()
  if (!feature) return

  const { actor, names } = await createCarpenter(colors, ship, folder, isNaval)
  const { id } = await createActor(actor, names)
  features.push(feature)
  crews.push(id!)
}

export default generateCarpenter
