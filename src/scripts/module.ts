import { MODULE_ID } from './settings'

import rollTable from './roll-table.ts'
import rollShip from './roll.ts'

Hooks.once('init', async () => {
  const generator = game.modules.get(MODULE_ID)
  if (!generator) return

  generator.api = {
    rollTable,
    rollShip
  }
})
