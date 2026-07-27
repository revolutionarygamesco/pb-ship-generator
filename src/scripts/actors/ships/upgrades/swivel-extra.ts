const addExtraSwivels = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.weapons?.smallArms?.quantity) throw new Error('Actor must have small arms before they can be upgraded.')
  actor.system.weapons.smallArms.quantity = actor.system.weapons.smallArms.quantity + 1
}

export default addExtraSwivels
