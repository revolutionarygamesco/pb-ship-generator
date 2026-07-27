import '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings'

import rollShip from './roll.ts'
import generateShip from './ship.ts'
import openGenerateShipDialog from './dialog.ts'

Hooks.once('init', async () => {
  const generator = game.modules.get(MODULE_ID)
  if (!generator) return

  generator.api = {
    rollShip,
    generateShip,
    openGenerateShipDialog
  }
})

Hooks.once('ready', async () => {
  const t = scopeLocalizer(`${MODULE_ID}.folders`)
  const rootFolder = t('root')
  const found = game.folders.find(folder => folder.name === rootFolder && folder.type === 'Actor')
  if (found) return

  const createFolder = async (
    path: string,
    parent?: foundry.documents.Folder
  ): Promise<foundry.documents.Folder> => {
    const folder = await foundry.documents.Folder.create({
      name: t(path),
      type: 'Actor',
      folder: parent
    })
    if (!folder) throw new Error('Could not create folder')
    return folder
  }

  const nations = ['spanish', 'british', 'french']
  const root = await createFolder('root')

  for await (const nation of nations) {
    const nationRoot = await createFolder(`${nation}.root`, root)
    await createFolder(`${nation}.merchant`, nationRoot)
    await createFolder(`${nation}.privateers`, nationRoot)
    await createFolder(`${nation}.navy`, nationRoot)
  }

  await createFolder('dutch', root)
  await createFolder('pirate', root)
})
