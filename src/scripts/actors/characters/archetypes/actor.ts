import { type PersonalNameData } from '../../../names/person.ts'
import { MODULE_ID } from '../../../settings.ts'

const createActor = async (
  base: Partial<foundry.documents.Actor>,
  names: PersonalNameData[]
): Promise<foundry.documents.Actor> => {
  const created = await foundry.documents.Actor.create(base)
  if (!created) throw new Error('Failed to create actor')
  await created.setFlag(MODULE_ID, 'names', JSON.stringify(names))
  return created
}

export default createActor
