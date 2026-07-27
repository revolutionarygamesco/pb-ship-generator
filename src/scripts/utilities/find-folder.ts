const checkFolder = (path: string[], folder?: foundry.documents.Folder | null): boolean => {
  if (path.length === 0) return true
  if (folder?.name === path[0]) return checkFolder(path.slice(1), folder.folder)
  return false
}

const findFolder = (path: string): foundry.documents.Folder | undefined => {
  const elements = path.split('/').toReversed()
  if (elements.length < 1) return undefined

  const matches = game.folders.filter(folder => checkFolder(elements, folder))
  return matches.length > 0 ? matches[0] : undefined
}

export default findFolder
