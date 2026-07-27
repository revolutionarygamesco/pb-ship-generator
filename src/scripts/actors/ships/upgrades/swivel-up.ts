import { MODULE_ID } from '../../../settings.ts'

const upgradeSwivels = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.weapons?.smallArms) throw new Error('Actor must have small arms before they can be upgraded.')
  const warning = game.i18n.localize([MODULE_ID, 'upgrades', 'swivels'].join('.'))
  actor.system.weapons.smallArms.warning = warning
}

export default upgradeSwivels
