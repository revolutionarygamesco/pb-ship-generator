import { chance } from '@revolutionarygamesco/common'
import { selectRandomShipClass, type ShipClass } from '../../types/enums/class.ts'

const selectRandomDutchShipClass = (): ShipClass => {
  if (chance(1, 6)) return 'Fluyt'
  return selectRandomShipClass()
}

export default selectRandomDutchShipClass
