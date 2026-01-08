import { specialty } from '../ids.ts'

const isLegendary = (details: ShipDetails) => {
  return details.specialty.includes(specialty.captain)
}

export default isLegendary
