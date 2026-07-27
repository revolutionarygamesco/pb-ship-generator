const setShipCrewSkill = (
  actor: Partial<foundry.documents.Actor>,
  value: number
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.abilities) actor.system.abilities = {}
  actor.system.abilities.skill = { value }
}

export default setShipCrewSkill
