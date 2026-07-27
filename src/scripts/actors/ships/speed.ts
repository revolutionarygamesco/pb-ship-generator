const setShipSpeed = (
  actor: Partial<foundry.documents.Actor>,
  value: number,
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.speed = { value, max: value, min: 0 }
}

export default setShipSpeed
