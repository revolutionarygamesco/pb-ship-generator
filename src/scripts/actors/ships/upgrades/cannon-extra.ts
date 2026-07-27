const addExtraCannons = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.weapons?.broadsides?.quantity) throw new Error('Actor must have broadsides before they can be upgraded.')
  actor.system.weapons.broadsides.quantity = actor.system.weapons.broadsides.quantity + 1
}

export default addExtraCannons
