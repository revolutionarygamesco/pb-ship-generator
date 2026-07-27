import { selectRandomElement, stockArray, selectRandomBetween, shuffleArray } from '@revolutionarygamesco/common'
import { type CaptainExperience } from '../actors/characters/descriptions/captain.ts'
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

const selectRandomThreatProfile = (): ThreatProfile => {
  const { experience, shanties, upgrades: n } = selectRandomElement(stockArray<ThreatBand>([
    { n: 1, item: { experience: 'legendary', upgrades: selectRandomBetween(0, 3), shanties: selectRandomBetween(0, 5) } },
    { n: 10, item: { experience: 'high', upgrades: selectRandomBetween(0, 2), shanties: selectRandomBetween(0, 4) } },
    { n: 50, item: { experience: 'medium', upgrades: selectRandomBetween(0, 1), shanties: selectRandomBetween(0, 3) } },
    { n: 50, item: { experience: 'low', upgrades: 0, shanties: selectRandomBetween(0, 2) } }
  ]))

  const upgrades = shuffleArray<ShipUpgrade>([...shipUpgrades]).slice(0, n)
  return { experience, upgrades, shanties }
}

export default selectRandomThreatProfile
