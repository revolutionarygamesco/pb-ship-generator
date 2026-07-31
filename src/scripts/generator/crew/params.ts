import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import { type ShipClass } from '../../types/enums/class.ts'
import { type CaptainExperience } from '../../actors/characters/descriptions/captain.ts'

export interface SpecialtyCrewGenerationParams {
  colors: Colors
  privateer: boolean
  role: ShipRole
  experience: CaptainExperience
  ship: foundry.documents.Actor
  shipClass: ShipClass
  folder: foundry.documents.Folder | undefined
  isNaval: boolean,
  features: string[]
  crews: string[]
}

export const createParams = (
  overrides?: Partial<SpecialtyCrewGenerationParams>
): SpecialtyCrewGenerationParams => {
  return {
    colors: 'British',
    privateer: false,
    role: 'Merchantman',
    experience: 'medium',
    ship: { uuid: `Actor.${generateID()}` } as unknown as foundry.documents.Actor,
    shipClass: 'Sloop',
    folder: { id: generateID() } as unknown as foundry.documents.Folder,
    isNaval: false,
    features: [],
    crews: [],
    ...overrides
  }
}
