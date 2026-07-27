const setShipAgility = (
  actor: Partial<foundry.documents.Actor>,
  value: number
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.abilities) actor.system.abilities = {}
  actor.system.abilities.agility = { value }
}

export default setShipAgility
