import { MODULE_ID } from '../../../settings.ts'

const upgradeCannons = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.weapons?.broadsides) throw new Error('Actor must have broadsides before they can be upgraded.')
  const warning = game.i18n.localize([MODULE_ID, 'upgrades', 'cannons'].join('.'))
  actor.system.weapons.broadsides.warning = warning
}

export default upgradeCannons
