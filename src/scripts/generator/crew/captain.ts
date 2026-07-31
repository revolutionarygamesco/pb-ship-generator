import { type SpecialtyCrewGenerationParams } from './params.ts'
import createCaptain from '../../actors/characters/archetypes/captain.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'

const generateCaptain = async (
  params: SpecialtyCrewGenerationParams
): Promise<foundry.documents.Actor> => {
  const { colors, privateer, experience, ship, shipClass, folder, isNaval, features, crews } = params

  const { actor: base, names } = await createCaptain(colors, privateer, experience, ship, shipClass, folder, isNaval)
  const actor = await createActor(base, names)
  if (experience === 'legendary') features.push(getFeatureUUID('dmlGTnZhfEgWUYDm'))
  crews.push(actor.id!)
  return actor
}

export default generateCaptain
