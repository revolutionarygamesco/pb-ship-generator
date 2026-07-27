import { type PirateBorgSystem } from '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'

const setBroadsides = (
  actor: Partial<foundry.documents.Actor>,
  die: PirateBorgSystem.Die,
  quantity: number,
  warning?: string
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.weapons) actor.system.weapons = {}
  actor.system.weapons.broadsides = { die, quantity }
  if (warning) actor.system.weapons.broadsides.warning = warning
}

export default setBroadsides
