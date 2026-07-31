import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeGunner from '../../randomizers/crew/gunner.ts'
import createGunner from '../../actors/characters/archetypes/gunner.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

const generateGunner = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, ship, role, folder, isNaval, features, crews } = params
  const feature = randomizeGunner(role)
  if (!feature) return

  const { actor, names } = await createGunner(colors, ship, folder, isNaval)
  const { id } = await createActor(actor, names)
  features.push(feature)
  crews.push(id!)
}

export default generateGunner
