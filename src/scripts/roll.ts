import { tables } from './ids.ts'
import createShipDetails from './details.ts'
import rollTable from './roll-table.ts'
import shuffleArray from './randomizers/shuffle.ts'
import generateCaptain from './captain.ts'
import fileActor from './file.ts'

const parseNumberUpgrades = (str: string | undefined): number => {
  const sub = str ? str.substring(0, 1) : '0'
  const parsed = parseInt(sub)
  return isNaN(parsed) ? 0 : parsed
}

const rollShip = async (
  details?: Partial<ShipDetails>
): Promise<{ details: ShipDetails, captain: Actor }> => {
  const d = createShipDetails(details)
  const martial = d.use === 'Naval' || d.use === 'Privateer' || d.pirate

  // Name the ship
  const namer = game.modules.get('revolutionary-piratenames')
  if (namer && d.pirate) {
    d.name = await namer.api.generatePirateShipName()
  } else if (namer) {
    const result = await namer.api.generateShipName({ colors: d.nationality, martial })
    d.name = typeof result === 'string'
      ? result
      : `${result.religious} (${result.secular})`
  }

  // Check for ship type
  if (!d.type || d.type === 'Random') {
    const typeTable = d.type === 'Naval'
      ? tables.types.naval
      : d.nationality === 'Dutch'
        ? tables.types.dutch
        : tables.types.base
    const type = await rollTable(typeTable, { displayChat: false })
    d.type = type && type[0].name ? type[0].name : 'Sloop'
  }

  // Check for upgrades & captain experience
  if (martial) {
    const level = await rollTable(tables.upgrades.martial, { displayChat: false })
    const n = level ? parseNumberUpgrades(level[0].name) : 0
    if (level && level.length > 1 && level[1].name) d.captain.xp = level[1].name
    if (level && level.length > 2 && level[2].document) d.specialty.push(level[2].document)

    const upgrades = shuffleArray(['upgrade-swivels', 'extra-swivels', 'upgrade-cannons', 'extra-cannons', 'armored', 'ram', 'sails'])
    d.upgrades = [...d.upgrades, ...upgrades.slice(0, n - d.upgrades.length)]
  } else {
    const upgraded = await rollTable(tables.upgrades.commercial, { displayChat: false })
    if (upgraded && upgraded[0].name === 'Improved Sails') d.upgrades.push('sails')

    const drawn = await rollTable(tables.captain, { displayChat: false })
    if (drawn && drawn[0].name) d.captain.xp = drawn[0].name
    if (drawn && drawn.length > 1 && drawn[1].document) d.specialty.push(drawn[1].document)
  }

  // Check for crew size
  const crewSize = await rollTable(tables.crew.size, { displayChat: false })
  d.crewSize = crewSize && crewSize[0].name ? crewSize[0].name : 'Medium'

  // Check for specialty crew
  const gunner = martial || d.nationality === 'Dutch'
    ? tables.crew.special.gunner.martial
    : tables.crew.special.gunner.commercial
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

  const captain = await generateCaptain(d)
  await fileActor(captain, d)

  return { details: d, captain }
}

export default rollShip
