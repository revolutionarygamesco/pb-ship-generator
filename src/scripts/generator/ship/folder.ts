import { type GenerateShipParams } from './params.ts'
import findCategoryFolder from '../../utilities/find-folder.ts'

const createFolder = async (
  params: GenerateShipParams,
  name: string
): Promise<foundry.documents.Folder | undefined> => {
  const category = findCategoryFolder(params.colors, params.role, params.privateer)
  if (category) return await foundry.documents.Folder.create({ name, type: 'Actor', folder: category })
  return undefined
}

export default createFolder
