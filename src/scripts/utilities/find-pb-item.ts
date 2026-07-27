const findPBItem = async <T extends foundry.abstract.Document>(
  compendium: string,
  item: string
): Promise<T | null> => {
  const found = await game.pirateborg.api.compendium.findCompendiumItem(
    `pirateborg.${compendium}`,
    item
  )

  if (found) return found as T
  return null
}

export default findPBItem
