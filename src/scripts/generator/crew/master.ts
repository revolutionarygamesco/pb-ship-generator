import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeMaster from '../../randomizers/crew/master.ts'
import createMaster from '../../actors/characters/archetypes/master.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

const generateMaster = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, ship, folder, isNaval, features, crews } = params
  const feature = randomizeMaster()
  if (!feature) return

  const { actor, names } = await createMaster(colors, ship, folder, isNaval)
  const { id } = await createActor(actor, names)
  features.push(feature)
  crews.push(id!)
}

export default generateMaster
