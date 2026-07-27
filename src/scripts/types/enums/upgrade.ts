import { makeEnum } from '@revolutionarygamesco/common'

export const shipUpgrades = ['upgrade-swivels', 'extra-swivels',
  'upgrade-cannons', 'extra-cannons', 'armored-hull', 'ram-upgrade',
  'improved-sails'] as const
export type ShipUpgrade = typeof shipUpgrades[number]
export const { guard: isShipUpgrade, randomizer: selectRandomShipUpgrade } = makeEnum(shipUpgrades)
