import upgradeDie from '../../../utilities/upgrade.ts'

const addNavalFirepower = (
  actor: Partial<foundry.documents.Actor>
): void => {
  const hasBroadsides = actor.system?.weapons?.broadsides
  const hasSmallArms = actor.system?.weapons?.smallArms
  const hasRam = actor.system?.weapons?.ram
  if (!hasBroadsides || !hasSmallArms || !hasRam) throw new Error('Actor must have all weapons before they can be upgraded.')

  actor.system!.weapons!.broadsides!.die = upgradeDie(actor.system!.weapons!.broadsides!.die)
  actor.system!.weapons!.smallArms!.die = upgradeDie(actor.system!.weapons!.smallArms!.die)
  actor.system!.weapons!.ram!.die = upgradeDie(actor.system!.weapons!.ram!.die)
}

export default addNavalFirepower
