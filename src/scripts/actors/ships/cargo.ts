const setCargoCapacity = (
  actor: Partial<foundry.documents.Actor>,
  value: number
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.cargo = { max: value, value: 0 }
}

export default setCargoCapacity
