import { selectRandomElement, makeEnum } from '@revolutionarygamesco/common'
import { getPronouns, scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'

export const crewSpecialties = ['captain', 'quartermaster', 'bosun', 'gunner',
  'master', 'sorcerer', 'priest', 'carpenter'] as const
export type SpecialtyCrew = typeof crewSpecialties[number]
const { guard: isSpecialtyCrew, randomizer: selectRandomCrewSpecialty } = makeEnum(crewSpecialties)

const validOptions = ['a', 'b', 'c', 'd']

const addSpeciality = (
  features: string[],
  specialty: SpecialtyCrew,
  options: string[] = validOptions,
  gender: 'Feminine' | 'Masculine' = 'Masculine',
  includeCore: boolean = true
): void => {
  const t = scopeLocalizer([MODULE_ID, 'crew', 'specialty', specialty].join('.'))
  const pronouns = getPronouns(MODULE_ID, gender)
  if (includeCore) features.push(t('core', pronouns))

  const o = options.filter(opt => validOptions.includes(opt))
  if (o.length < 1) return
  const option = selectRandomElement(o)
  features.push(t(['options', option], pronouns))
}

export default addSpeciality
export { isSpecialtyCrew, selectRandomCrewSpecialty }
