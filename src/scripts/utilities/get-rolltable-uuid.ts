export const COMPENDIUM_PREFIX = {
  NAMES: 'Compendium.revolutionary-piratenames.rolltables.RollTable',
  SHIPGEN: 'Compendium.revolutionary-pbshipgen.rolltables.RollTable'
}

const getRollTableUUID = (
  id: string,
  compendium: 'NAMES' | 'SHIPGEN' = 'SHIPGEN'
): string => {
  return [COMPENDIUM_PREFIX[compendium], id].join('.')
}

export default getRollTableUUID
