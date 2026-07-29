import { scopeLocalizer, findFolder } from '@revolutionarygamesco/common-foundryvtt'
import { type Colors } from '../types/enums/colors.ts'
import { type ShipRole } from '../types/enums/role.ts'
import { MODULE_ID } from '../settings.ts'

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
  return role === 'Merchantman'
    ? findFolder([root, t(`${nation}.root`), t(`${nation}.merchant`)].join('/'))
    : privateer
      ? findFolder([root, t(`${nation}.root`), t(`${nation}.privateer`)].join('/'))
      : findFolder([root, t(`${nation}.root`), t(`${nation}.navy`)].join('/'))
}

export default findCategoryFolder
