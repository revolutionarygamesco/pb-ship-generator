import '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'
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
  const rootFolder = game.i18n.localize(`${MODULE_ID}.folders.root`)
  const found = game.folders.find(folder => folder.name === rootFolder && folder.type === 'Actor')
  if (found) return

  const createFolder = async (path: string, parent?: foundry.documents.Folder): Promise<foundry.documents.Folder> => {
    const folder = await foundry.documents.Folder.create({
      name: game.i18n.localize(`${MODULE_ID}.folders.${path}`),
      type: 'Actor',
      folder: parent
    })
    if (!folder) throw new Error('Could not create folder')
    return folder
  }

  const nations = ['spanish', 'british', 'french']
  const root = await createFolder('root')

  const captains = await createFolder('captains.root', root)
  await createFolder('captains.nation.pirates', captains)
  await createFolder('captains.nation.dutch', captains)
  for await (const nation of nations) {
    const path = `captains.nation.${nation}`
    const root = await createFolder(`${path}.root`, captains)
    await createFolder(`${path}.merchant`, root)
    await createFolder(`${path}.privateer`, root)
    await createFolder(`${path}.naval`, root)
  }

  const ships = await createFolder('ships.root', root)
  await createFolder('ships.nation.pirates', ships)
  await createFolder('ships.nation.dutch', ships)
  for await (const nation of nations) {
    const path = `ships.nation.${nation}`
    const root = await createFolder(`${path}.root`, ships)
    await createFolder(`${path}.merchant`, root)
    await createFolder(`${path}.privateer`, root)
    await createFolder(`${path}.naval`, root)
  }
})
