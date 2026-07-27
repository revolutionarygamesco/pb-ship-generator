import { scopeLocalizer, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { type Colors } from '../../../types/enums/colors.ts'
import { type ShipRole } from '../../../types/enums/role.ts'
import { type PersonalNameData } from '../../../names/person.ts'
import { MODULE_ID } from '../../../settings.ts'

export type CaptainExperience = 'legendary' | 'high' | 'medium' | 'low'

export interface CaptainDescriptionParams {
  colors?: Colors
  role?: ShipRole
  privateer?: boolean
  experience?: CaptainExperience
  name: Partial<PersonalNameData>
  ship: Linkable
}

const getCaptainDescription = (
  params: CaptainDescriptionParams
): string => {
  const colors = params.colors ?? 'Spanish'
  const role = params.role ?? 'Merchantman'
  const privateer = params.privateer ?? false
  const experience = params.experience ?? 'medium'
  const name = params.name
  const ship = params.ship

  const t = scopeLocalizer(`${MODULE_ID}.crew.specialty.captain.description`)
  const context: Record<string, string> = { ...name.forms, ship: makeLink(ship) }

  if (['British', 'French', 'Spanish'].includes(colors)) {
    context.sovereign = game.i18n.localize(`${MODULE_ID}.sovereigns.${colors}`)
    context.navy = game.i18n.localize(`${MODULE_ID}.navies.${colors}`)
  }

  if (colors === 'Pirate') return t(`pirate.${experience}`, context)
  if (privateer) return t(`privateer.${experience}`, context)
  if (colors === 'Dutch') return t(`dutch.${experience}`, context)

  const category = role === 'Man-of-War' ? 'naval' : 'merchant'
  return t(`${category}.${experience}`, context)
}

export default getCaptainDescription
