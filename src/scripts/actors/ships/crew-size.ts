import { selectRandomBetween } from '@revolutionarygamesco/common'

const setCrewSize = (
  actor: Partial<foundry.documents.Actor>,
  min: number,
  max: number
): void => {
  const value = selectRandomBetween(min, max)
  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.crew = { max, min, value }
}

export default setCrewSize
