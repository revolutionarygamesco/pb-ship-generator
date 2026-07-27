import { type PirateBorgSystem } from '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'

const setRamming = (
  actor: Partial<foundry.documents.Actor>,
  die: PirateBorgSystem.Die,
  quantity: number,
  warning?: string
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.weapons) actor.system.weapons = {}
  actor.system.weapons.ram = { die, quantity }
  if (warning) actor.system.weapons.ram.warning = warning
}

export default setRamming
