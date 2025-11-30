import { tables } from './ids.ts'
import createShipDetails from './details.ts'
import rollTable from './roll-table.ts'
import shuffleArray from './randomizers/shuffle.ts'

const parseNumberUpgrades = (str: string | undefined): number => {
  const sub = str ? str.substring(0, 1) : '0'
  const parsed = parseInt(sub)
  return isNaN(parsed) ? 0 : parsed
}

const rollShip = async (
  details?: Partial<ShipDetails>
): Promise<{details: ShipDetails, captain: string }> => {
  const d = createShipDetails(details)
  let captain = 'Medium'

  // Name the ship
  const namer = game.modules.get('revolutionary-piratenames')
  if (namer) {
    const result = await namer.api.generateShipName({ nation: d.nationality, naval: d.naval })
    d.name = typeof result === 'string'
      ? result
      : `${result.religious} (${result.secular})`
  }

  // Check for ship type
  const typeTable = d.naval
    ? tables.types.naval
    : d.nationality === 'Dutch'
      ? tables.types.dutch
      : tables.types.base
  const type = await rollTable(typeTable, { displayChat: false })
  d.type = type && type[0].name ? type[0].name : 'Sloop'

  // Check for upgrades & captain experience
  if (d.naval || d.pirate) {
    const level = await rollTable(tables.upgrades.naval, { displayChat: false })
    const n = level ? parseNumberUpgrades(level[0].name) : 0
    if (level && level.length > 1 && level[1].name) captain = level[1].name
    if (level && level.length > 2 && level[2].document) d.specialty.push(level[2].document)

    const upgrades = shuffleArray(['upgrade-swivels', 'extra-swivels', 'upgrade-cannons', 'extra-cannons', 'armored', 'ram', 'sails'])
    d.upgrades = [...d.upgrades, ...upgrades.slice(0, n - d.upgrades.length)]
  } else {
    const upgraded = await rollTable(tables.upgrades.merchant, { displayChat: false })
    if (upgraded && upgraded[0].name === 'Improved sails') d.upgrades.push('sails')

    const xp = await rollTable(tables.captain, { displayChat: false })
    if (xp && xp[0].name) captain = xp[0].name
    if (xp && xp.length > 1 && xp[1].document) d.specialty.push(xp[1].document)
  }

  // Check for crew size
  const crewSize = await rollTable(tables.crew.size, { displayChat: false })
  d.crewSize = crewSize && crewSize[0].name ? crewSize[0].name : 'Medium'

  // Check for specialty crew
  const gunner = d.naval || d.pirate
    ? tables.crew.special.gunner.naval
    : tables.crew.special.gunner.merchant
  const drunk = d.pirate
    ? tables.crew.drunk.pirate
    : tables.crew.drunk.legit
  const special: string[] = [
    tables.crew.special.bosun,
    tables.crew.special.carpenter,
    tables.crew.special.magic,
    tables.crew.special.master,
    gunner,
    drunk
  ]
  if (d.pirate) special.push(tables.crew.special.quartermaster)

  for await (const table of special) {
    const check = await rollTable(table, { displayChat: false })
    if (check && check[0].document) d.specialty.push(check[0].document)
  }

  return { details: d, captain }
}

export default rollShip
