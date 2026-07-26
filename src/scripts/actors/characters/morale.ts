export const ranges: Array<[string, number]> = [
  ['easily scared, likely to flee', 2],
  ['bottom of the food chain', 3],
  ['runs when danger is sensed', 4],
  ['fearful, but willing to fight', 5],
  ['untrained, average human', 6],
  ['combat experience', 7],
  ['military training', 8],
  ['a brave leader', 9],
  ['unwise in their courage', 10],
  ['insane, heroic, or both', 11]
]

export const selectMorale = (
  label: string = 'untrained, average human'
): number => {
  const found = ranges.find(([l]) => l === label)
  const [_, value] = found || ranges[4]
  return value
}

const setMorale = (
  actor: Partial<foundry.documents.Actor>,
  label: string = 'untrained, average human'
): void => {
  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.morale = selectMorale(label)
}

export default setMorale
