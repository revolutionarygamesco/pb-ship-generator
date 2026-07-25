import { shuffleArray, parseIntOr } from '@revolutionarygamesco/common'
import { drawStr, rollTable } from '@revolutionarygamesco/common-foundryvtt'
import { tables } from './ids.ts'
import createShipDetails from './details.ts'
import generateCaptain from './captain.ts'
import fileActor from './file.ts'

const rollShip = async (
  details?: Partial<ShipDetails>
): Promise<{ details: ShipDetails, captain: foundry.documents.Actor }> => {
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
    d.type = await drawStr(typeTable, 'Sloop')
  }

  // Check for upgrades & captain experience
  if (martial) {
    const level = await drawStr(tables.upgrades.martial,'0')
    const n = parseIntOr(level, 0)
    const upgrades = shuffleArray(['upgrade-swivels', 'extra-swivels', 'upgrade-cannons', 'extra-cannons', 'armored', 'ram', 'sails'])
    d.upgrades = [...d.upgrades, ...upgrades.slice(0, n - d.upgrades.length)]
  } else {
    const upgraded = await drawStr(tables.upgrades.commercial,'No Upgrades')
    if (upgraded === 'Improved Sails') d.upgrades.push('sails')

    const drawn = await rollTable(tables.captain)
    if (drawn && drawn.results[0].name) d.captain.xp = drawn.results[0].name
    if (drawn && drawn.results.length > 1 && drawn.results[1].documentUuid) d.specialty.push(drawn.results[1].documentUuid)
  }

  // Check for crew size
  const crewSize = await rollTable(tables.crew.size, { displayChat: false })
  d.crewSize = crewSize && crewSize.results[0].name ? crewSize.results[0].name : 'Medium'

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
    if (check && check.results[0].documentUuid) d.specialty.push(check.results[0].documentUuid)
  }

  const { captain, shanties } = await generateCaptain(d)
  d.shanties = shanties
  await fileActor(captain, d)

  return { details: d, captain }
}

export default rollShip
