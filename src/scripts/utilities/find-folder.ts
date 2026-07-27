import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { type Colors } from '../types/enums/colors.ts'
import { type ShipRole } from '../types/enums/role.ts'
import { MODULE_ID } from '../settings.ts'

const checkFolder = (
  path: string[],
  folder?: foundry.documents.Folder | null
): boolean => {
  if (path.length === 0) return true
  if (folder?.name === path[0]) return checkFolder(path.slice(1), folder.folder)
  return false
}

const findFolder = (
  path: string
): foundry.documents.Folder | undefined => {
  const elements = path.split('/').toReversed()
  if (elements.length < 1) return undefined

  const matches = game.folders.filter(folder => checkFolder(elements, folder))
  return matches.length > 0 ? matches[0] : undefined
}

const findCategoryFolder = (
  colors: Colors,
  role: ShipRole,
  privateer: boolean = false
): foundry.documents.Folder | undefined => {
  const t = scopeLocalizer(`${MODULE_ID}.folders`)
  const root = t('root')
  if (colors === 'Pirate') return findFolder([root, t('pirate')].join('/'))
  if (colors === 'Dutch') return findFolder([root, t('dutch')].join('/'))

  const nation = colors.toLowerCase()
  if (privateer) return findFolder([root, t(`${nation}.root`), t(`${nation}.privateer`)].join('/'))
  return role === 'Man-of-War'
    ? findFolder([root, t(`${nation}.root`), t(`${nation}.navy`)].join('/'))
    : findFolder([root, t(`${nation}.root`), t(`${nation}.merchant`)].join('/'))
}

export default findCategoryFolder
