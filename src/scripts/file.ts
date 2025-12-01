import { MODULE_ID } from './settings.ts'
import { localize } from './wrapper.ts'
import findFolder from './find-folder.ts'

const fileActor = async (
  actor: Actor,
  details: ShipDetails
): Promise<void> => {
  const isShip = actor.type === 'vehicle'
  const base = isShip
    ? `${MODULE_ID}.folders.ships`
    : `${MODULE_ID}.folders.captains`
  const path = [`${MODULE_ID}.folders.root`, `${base}.root`]

  if (details.pirate) {
    path.push(`${base}.nation.pirates`)
    const folder = findFolder(path.map(path => localize(path)).join('/'))
    if (folder) await actor.update({ folder })
    return
  }

  if (details.nationality === 'Dutch') {
    path.push(`${base}.nation.dutch`)
    const folder = findFolder(path.map(path => localize(path)).join('/'))
    if (folder) await actor.update({ folder })
    return
  }

  const national = `${base}.nation.${details.nationality.toLowerCase()}`
  path.push(`${national}.root`)

  const sub = details.naval ? 'naval' : 'merchant'
  path.push(`${national}.${sub}`)

  const folder = findFolder(path.map(path => localize(path)).join('/'))
  if (folder) await actor.update({ folder })
}

export default fileActor
