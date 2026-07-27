const setHull = (
  actor: Partial<foundry.documents.Actor>,
  value: string
): void => {
  const values = ['0', '-d2', '-d4', '-d6']
  const n = Math.max(0, values.findIndex(str => str === value))

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.hull = { max: n, min: 0, value: n }
}

export default setHull
