type Culture = 'Spanish' | 'English' | 'Scottish' | 'Welsh' | 'Irish' | 'French' | 'Dutch'
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
type Use = 'Merchant' | 'Naval' | 'Privateer'

interface ShipDetails {
  nationality: Nationality
  use: Use
  pirate: boolean
  upgrades: string[]
  specialty: string[]
  name: string
  type: string
  crewSize: string
  shanties: number
  captain: {
    culture: Culture,
    xp: string
  }
}
