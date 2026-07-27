const upgradeRam = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.weapons?.ram?.quantity) throw new Error('Actor must have ram before it can be upgraded.')
  actor.system.weapons.ram.quantity = actor.system.weapons.ram.quantity * 2
}

export default upgradeRam
