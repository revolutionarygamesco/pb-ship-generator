import { MODULE_NAMES } from './settings.ts'

const rollTable = async (
  id: string,
  options: RollTableOptions
): Promise<RollTableResult[]> => {
  const fn = game.modules.get(MODULE_NAMES)?.api.rollTable
  if (!fn) return []
  return await fn(id, options)
}

export default rollTable
