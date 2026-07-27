const armorHull = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.attributes?.hull) throw new Error('Actor must have hull before it can be upgraded.')
  const value = Math.min(actor.system.attributes.hull.max + 1, 3)
  actor.system.attributes.hull = { max: value, value, min: 0 }
}

export default armorHull
