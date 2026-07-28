import { type ShipUpgrade } from '../../../types/enums/upgrade.ts'

import addExtraCannons from './cannon-extra.ts'
import upgradeCannons from './cannon-up.ts'
import addExtraSwivels from './swivel-extra.ts'
import upgradeSwivels from './swivel-up.ts'
import upgradeRam from './ram.ts'
import armorHull from './hull.ts'
import improveSails from './sails.ts'

const dict: Record<ShipUpgrade, (actor: Partial<foundry.documents.Actor>) => void > = {
  'extra-cannons': addExtraCannons,
  'upgrade-cannons': upgradeCannons,
  'extra-swivels': addExtraSwivels,
  'upgrade-swivels': upgradeSwivels,
  'ram-upgrade': upgradeRam,
  'armored-hull': armorHull,
  'improved-sails': improveSails
}

const applyUpgrades = (
  actor: Partial<foundry.documents.Actor>,
  upgrades: ShipUpgrade[]
): void => {
  for (const upgrade of upgrades) {
    dict[upgrade](actor)
  }
}

export default applyUpgrades
