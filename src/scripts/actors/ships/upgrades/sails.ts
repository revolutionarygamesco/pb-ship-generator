const improveSails = (
  actor: Partial<foundry.documents.Actor>
): void => {
  if (!actor.system?.attributes?.speed) throw new Error('Actor must have speed before it can be upgraded.')
  if (!actor.system?.abilities?.agility) throw new Error('Actor must have agility before it can be upgraded.')

  const speed = actor.system.attributes.speed.max + 1
  const agility = actor.system.abilities.agility.value + 1

  actor.system.attributes.speed = { max: speed, value: speed, min: 0 }
  actor.system.abilities.agility = { value: agility }
}

export default improveSails
