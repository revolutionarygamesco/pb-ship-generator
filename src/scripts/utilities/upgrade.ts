import { type PirateBorgSystem } from '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'

const upgradeDie = (
  orig: PirateBorgSystem.Die
): PirateBorgSystem.Die => {
  const dice: PirateBorgSystem.Die[] = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20']
  const max = dice.length - 1
  const index = Math.min(dice.indexOf(orig) + 1, max)
  return dice[index]
}

export default upgradeDie
