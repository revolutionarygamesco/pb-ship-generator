import { type Colors } from '../../types/enums/colors.ts'
import { type ShipRole } from '../../types/enums/role.ts'
import { type ShipClass } from '../../types/enums/class.ts'

export interface GenerateShipParams {
  colors: Colors
  role: ShipRole
  privateer: boolean
  shipClass: ShipClass
}

export const createGenerateShipParams = (
  overrides?: Partial<GenerateShipParams>
): GenerateShipParams => {
  return {
    colors: 'British',
    role: 'Merchantman',
    privateer: false,
    shipClass: 'Sloop',
    ...overrides
  }
}
