import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { selectRandomShipClass, type ShipClass } from '../../types/enums/class.ts'

const selectRandomNavalShipClass = (): ShipClass => {
  return selectRandomElement(stockArray<ShipClass | null>([
    { n: 5, item: null },
    { n: 2, item: 'Frigate' },
    { n: 1, item: 'Man-of-War' }
  ])) ?? selectRandomShipClass()
}

export default selectRandomNavalShipClass
