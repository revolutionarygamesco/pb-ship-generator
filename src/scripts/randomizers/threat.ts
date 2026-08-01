import { selectRandomElement, stockArray, selectRandomBetween, shuffleArray } from '@revolutionarygamesco/common'
import { type CaptainExperience } from '../actors/characters/descriptions/captain.ts'
import { type ShipClass } from '../types/enums/class.ts'
import { shipUpgrades, type ShipUpgrade } from '../types/enums/upgrade.ts'

export interface ThreatProfile {
  experience: CaptainExperience
  upgrades: ShipUpgrade[]
  shanties: number
}

interface ThreatBand {
  experience: CaptainExperience
  upgrades: number
  shanties: number
}

const chances: Record<ShipClass, Record<CaptainExperience, number>> = {
  Sloop: { legendary: 1, high: 4, medium: 8, low: 16 },
  Brigantine: { legendary: 1, high: 4, medium: 8, low: 8 },
  Frigate: { legendary: 1, high: 4, medium: 8, low: 4 },
  Fluyt: { legendary: 1, high: 4, medium: 8, low: 4 },
  'Man-of-War': { legendary: 1, high: 4, medium: 8, low: 0 }
}

const selectRandomThreatProfile = (
  shipClass: ShipClass = 'Sloop'
): ThreatProfile => {
  const { experience, shanties, upgrades: n } = selectRandomElement(stockArray<ThreatBand>([
    { n: chances[shipClass].legendary, item: { experience: 'legendary', upgrades: selectRandomBetween(0, 3), shanties: selectRandomBetween(0, 5) } },
    { n: chances[shipClass].high, item: { experience: 'high', upgrades: selectRandomBetween(0, 2), shanties: selectRandomBetween(0, 4) } },
    { n: chances[shipClass].medium, item: { experience: 'medium', upgrades: selectRandomBetween(0, 1), shanties: selectRandomBetween(0, 3) } },
    { n: chances[shipClass].low, item: { experience: 'low', upgrades: 0, shanties: selectRandomBetween(0, 2) } }
  ]))

  const upgrades = shuffleArray<ShipUpgrade>([...shipUpgrades]).slice(0, n)
  return { experience, upgrades, shanties }
}

export default selectRandomThreatProfile
