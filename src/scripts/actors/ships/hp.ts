const setShipHP = (
  actor: Partial<foundry.documents.Actor>,
  value: number
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.hp = { max: value, value }
}

export default setShipHP
