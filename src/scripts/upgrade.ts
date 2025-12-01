const upgradeDie = (orig: string): string => {
  const dice = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']
  const max = dice.length - 1
  const index = Math.min(dice.indexOf(orig) + 1, max)
  return dice[index]
}

export default upgradeDie
