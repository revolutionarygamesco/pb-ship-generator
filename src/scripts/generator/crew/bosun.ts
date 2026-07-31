import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeBosun from '../../randomizers/crew/bosun.ts'
import createBosun from '../../actors/characters/archetypes/bosun.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

const generateBosun = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, ship, folder, isNaval, features, crews } = params
  const feature = randomizeBosun()
  if (!feature) return

  const { actor, names } = await createBosun(colors, ship, folder, isNaval)
  const { id } = await createActor(actor, names)
  features.push(feature)
  crews.push(id!)
}

export default generateBosun
