import { type PirateBorgSystem } from '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'

const setSmallArms = (
  actor: Partial<foundry.documents.Actor>,
  die: PirateBorgSystem.Die,
  quantity: number,
  warning?: string
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.weapons) actor.system.weapons = {}
  actor.system.weapons.smallArms = { die, quantity }
  if (warning) actor.system.weapons.smallArms.warning = warning
}

export default setSmallArms
