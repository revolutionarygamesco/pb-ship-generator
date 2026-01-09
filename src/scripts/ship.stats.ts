import { icons, tokens } from './premium.ts'

const premiumRoot = 'modules/pirate-borg-premium/'

interface ShipWeaponsStats {
  die: number
  quantity: number
}

interface ShipStats {
  hp: number
  hull: number
  agility: number
  speed: number
  skill: number
  broadsides: ShipWeaponsStats
  small: ShipWeaponsStats
  ram: ShipWeaponsStats
  crew: { min: number; max: number }
  cargo: number
}

const brigantine: ShipStats = {
  hp: 40,
  hull: 2,
  agility: 1,
  speed: 4,
  skill: 0,
  broadsides: { die: 8, quantity: 1 },
  small: { die: 4, quantity: 1 },
  ram: { die: 6, quantity: 1 },
  crew: { min: 15, max: 30 },
  cargo: 3
}

const fluyt: ShipStats = {
  hp: 50,
  hull: 2,
  agility: 1,
  speed: 3,
  skill: 0,
  broadsides: { die: 10, quantity: 1 },
  small: { die: 6, quantity: 1 },
  ram: { die: 6, quantity: 1 },
  crew: { min: 10, max: 40 },
  cargo: 5
}

const frigate: ShipStats = {
  hp: 60,
  hull: 2,
  agility: 0,
  speed: 4,
  skill: 1,
  broadsides: { die: 8, quantity: 2 },
  small: { die: 6, quantity: 1 },
  ram: { die: 6, quantity: 1 },
  crew: { min: 24, max: 48 },
  cargo: 4
}

const manowar: ShipStats = {
  hp: 75,
  hull: 3,
  agility: -2,
  speed: 3,
  skill: 2,
  broadsides: { die: 8, quantity: 3 },
  small: { die: 8, quantity: 1 },
  ram: { die: 8, quantity: 1 },
  crew: { min: 50, max: 150 },
  cargo: 4
}

const sloop: ShipStats = {
  hp: 30,
  hull: 1,
  agility: 2,
  speed: 5,
  skill: -1,
  broadsides: { die: 6, quantity: 1 },
  small: { die: 4, quantity: 1 },
  ram: { die: 4, quantity: 1 },
  crew: { min: 3, max: 10 },
  cargo: 2
}

const data: Record<string, { stats: ShipStats, img: string, token: string }> = {
  'Sloop': { stats: sloop, img: premiumRoot + icons.sloop, token: premiumRoot + tokens.sloop },
  'Brigantine': { stats: brigantine, img: premiumRoot + icons.brigantine, token: premiumRoot + tokens.brigantine },
  'Frigate': { stats: frigate, img: premiumRoot + icons.frigate, token: premiumRoot + tokens.frigate },
  'Fluyt': { stats: fluyt, img: premiumRoot + icons.fluyt, token: premiumRoot + tokens.brigantine },
  'Man-of-War': { stats: manowar, img: premiumRoot + icons.manowar, token: premiumRoot + tokens.manowar },
}

export default data
