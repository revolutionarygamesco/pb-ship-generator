import findPBItem from './find-pb-item.ts'

const findSeaShanties = async (
  titles: string[]
): Promise<foundry.documents.Item[]> => {
  const shanties: foundry.documents.Item[] = []

  for (const title of titles) {
    const found = await findPBItem<foundry.documents.Item>('ships-mystic-shanties', title)
    if (found) shanties.push(found)
  }

  return shanties
}

export default findSeaShanties
