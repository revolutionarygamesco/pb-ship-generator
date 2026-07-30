import '@revolutionarygamesco/common-foundryvtt/systems/pirateborg'
import { scopeLocalizer, registerAPI } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings'

import generateShip from './ship.ts'
import openGenerateShipDialog from './dialog.ts'

registerAPI(MODULE_ID, {
  generateShip,
  openGenerateShipDialog
})

Hooks.once('ready', async () => {
  const t = scopeLocalizer(`${MODULE_ID}.folders`)
  const rootFolder = t('root')
  const found = game.folders.find(folder => folder.name === rootFolder && folder.type === 'Actor')
  if (found) return

  const nations = ['spanish', 'british', 'french']
  const root = await foundry.documents.Folder.create({ name: t('root'), type: 'Actor' })

  for await (const nation of nations) {
    const nationRoot = await foundry.documents.Folder.create({ name: t([nation, 'root']), type: 'Actor', folder: root })
    await foundry.documents.Folder.create({ name: t([nation, 'privateers']), type: 'Actor', folder: nationRoot })
    await foundry.documents.Folder.create({ name: t([nation, 'navy']), type: 'Actor', folder: nationRoot })
    await foundry.documents.Folder.create({ name: t([nation, 'merchant']), type: 'Actor', folder: nationRoot })
  }

  await foundry.documents.Folder.create({ name: t('dutch'), type: 'Actor', folder: root })
  await foundry.documents.Folder.create({ name: t('pirate'), type: 'Actor', folder: root })
})
