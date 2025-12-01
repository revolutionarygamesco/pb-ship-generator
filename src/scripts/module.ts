import { MODULE_ID } from './settings'

import { localize } from './wrapper.ts'

import rollTable from './roll-table.ts'
import rollShip from './roll.ts'
import generateCaptain from './captain.ts'

Hooks.once('init', async () => {
  const generator = game.modules.get(MODULE_ID)
  if (!generator) return

  generator.api = {
    rollTable,
    rollShip,
    generateCaptain
  }
})

Hooks.once('ready', async () => {
  const rootFolder = localize(`${MODULE_ID}.folders.root`)
  const found = game.folders.find(folder => folder.name === rootFolder && folder.type === 'Actor')
  if (found) return

  const createFolder = async (path: string, parent?: Folder): Promise<Folder> => {
    return await foundry.documents.Folder.create({
      name: localize(`${MODULE_ID}.folders.${path}`),
      type: 'Actor',
      folder: parent
    })
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
    await createFolder(`${path}.naval`, root)
  }

  const ships = await createFolder('ships.root', root)
  await createFolder('ships.nation.pirates', ships)
  await createFolder('ships.nation.dutch', ships)
  for await (const nation of nations) {
    const path = `ships.nation.${nation}`
    const root = await createFolder(`${path}.root`, ships)
    await createFolder(`${path}.merchant`, root)
    await createFolder(`${path}.naval`, root)
  }
})
