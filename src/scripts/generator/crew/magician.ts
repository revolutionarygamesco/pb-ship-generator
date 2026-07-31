import { type SpecialtyCrewGenerationParams } from './params.ts'
import randomizeMagician from '../../randomizers/crew/magician.ts'
import createDeckSorcerer from '../../actors/characters/archetypes/sorcerer.ts'
import createDeckPriest from '../../actors/characters/archetypes/priest.ts'
import createActor from '../../actors/characters/archetypes/actor.ts'

const generateMagician = async (
  params: SpecialtyCrewGenerationParams
): Promise<void> => {
  const { colors, ship, folder, isNaval, features, crews } = params
  const { priest, sorcerer } = randomizeMagician()
  if (!priest && !sorcerer) return

  const { actor, names } = priest
    ? await createDeckPriest(colors, ship, folder, isNaval)
    : await createDeckSorcerer(colors, ship, folder, isNaval)

  const { id } = await createActor(actor, names)
  features.push((priest ?? sorcerer)!)
  crews.push(id!)
}

export default generateMagician
