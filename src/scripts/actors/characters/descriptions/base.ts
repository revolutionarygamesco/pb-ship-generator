import { makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import { type SpecialtyCrew } from '../specialty.ts'
import { type PersonalNameData } from '../../../names/person.ts'

const getDescription = (
  role: SpecialtyCrew,
  name: Partial<PersonalNameData>,
  ship: Linkable
): string => {
  const context = { ...name.forms, ship: makeLink(ship) }
  return game.i18n.localize([MODULE_ID, 'crew', 'specialty', role, 'description'].join('.'), context)
}

export default getDescription
