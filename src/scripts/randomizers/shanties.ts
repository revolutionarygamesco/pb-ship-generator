import { shuffleArray } from '@revolutionarygamesco/common'
import findPBItem from '../utilities/find-pb-item.ts'

const shanties: string[] = [
  'A Drop of Nelson\'s Blood',
  'All For Me Grog',
  'Blow the Man Down',
  'Captain Kidd',
  'Dead Horse',
  'Down Among the Dead Men',
  'Drunken Sailor',
  'Fifteen Men on a Dead Man\'s Chest',
  'Fire Down Below',
  'Fish in the Sea',
  'Leave Her Johnny',
  'Spanish Ladies'
]

const addShanties = async (
  actor: foundry.documents.Actor,
  num: number
): Promise<void> => {
  const selection = shuffleArray(shanties).slice(0, num)
  const list: foundry.documents.Item[] = []

  for (const name of selection) {
    const shanty = await findPBItem<foundry.documents.Item>('ships-mystic-shanties', name)
    if (!shanty) continue
    list.push(shanty)
  }

  await actor.createEmbeddedDocuments('Item', list)
}

export default addShanties
