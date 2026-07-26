import { selectRandomBetween } from '@revolutionarygamesco/common'

export const ranges: Array<[string, number, number]> = [
  ['barely worth fighting', 1, 3],
  ['a weak human', 4, 6],
  ['an average human', 7, 9],
  ['a tough human or animal', 10, 12],
  ['a challenge to new PCs', 13, 15],
  ['a serious threat to new PCs', 16, 19],
  ['a low level boss', 20, 24],
  ['a regional boss', 25, 29],
  ['huge or legendary', 30, 39]
]

export const selectCharacterHP = (
  label: string = 'an average human'
): number => {
  const found = ranges.find(([l]) => l === label)
  const [_, min, max] = found || ranges[2]
  return selectRandomBetween(min, max)
}

const setCharacterHP = (
  actor: Partial<foundry.documents.Actor>,
  label: string = 'an average human'
): void => {
  const hp = selectCharacterHP(label)

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.hp = { max: hp, value: hp }
}

export default setCharacterHP
