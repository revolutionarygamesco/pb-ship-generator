import { makeEnum, stockArray, selectRandomElement } from '@revolutionarygamesco/common'

export const shipClasses = ['Sloop', 'Brigantine', 'Frigate', 'Fluyt', 'Man-of-War'] as const
export type ShipClass = typeof shipClasses[number]
export const { guard: isShipClass } = makeEnum(shipClasses)

export const selectRandomShipClass = (): ShipClass => {
  return selectRandomElement(stockArray<ShipClass>([
    { n: 8, item: 'Sloop' },
    { n: 7, item: 'Brigantine' },
    { n: 5, item: 'Frigate' }
  ]))
}
