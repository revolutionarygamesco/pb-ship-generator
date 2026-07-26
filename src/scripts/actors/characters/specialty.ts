import { selectRandomElement, makeEnum } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'

export const crewSpecialties = ['captain', 'quartermaster', 'bosun', 'gunner',
  'master', 'sorcerer', 'priest', 'carpenter'] as const
export type SpecialtyCrew = typeof crewSpecialties[number]
const { guard: isSpecialtyCrew, randomizer: selectRandomCrewSpecialty } = makeEnum(crewSpecialties)

const addSpeciality = (
  features: string[],
  specialty: SpecialtyCrew
): void => {
  const t = scopeLocalizer([MODULE_ID, 'crew', 'specialty', specialty].join('.'))
  features.push(t('core'))
  const option = selectRandomElement(['a', 'b', 'c', 'd'])
  features.push(t(['options', option]))
}

export default addSpeciality
export { isSpecialtyCrew, selectRandomCrewSpecialty }
