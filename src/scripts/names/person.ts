import { chance } from '@revolutionarygamesco/common'
import { type Colors } from '../types/enums/colors.ts'
import { type Nationality } from '../types/enums/nationality.ts'
import { type SpecialtyCrew } from '../actors/characters/specialty.ts'

import selectRandomBritishNationality from './nationalities/british.ts'
import selectRandomDutchNationality from './nationalities/dutch.ts'
import selectRandomFrenchNationality from './nationalities/french.ts'
import selectRandomSpanishNationality from './nationalities/spanish.ts'
import selectRandomPirateNationality from './nationalities/pirate.ts'

import createTitles, { type Titles } from './titles/base.ts'
import createCaptainTitles from './titles/captain.ts'
import createPriestTitles from './titles/priest.ts'

type Gender = 'Masculine' | 'Female'
type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Eke' | 'Oye' | 'Afor' | 'Nkwo'

interface FamilyData {
  nationality: Nationality
  size: number
  name: string
  patriarch: string
  anglicization: string
  caste: 'Foro' | 'Nyamakala' | 'Jali' | 'Jakhanke'
  full: string
  other: {
    father: string
    mother: string[]
  }
}

interface BirthContextData {
  family: FamilyData
  order: number
  twin: 1 | 2 | false
  weekday: Weekday
  special: string
}

interface PersonalNameForms {
  nationality: Nationality
  full: string
  short: string
  personal: string
  [key: string]: string
}

interface PersonalNameData {
  gender: Gender
  nationality: Nationality,
  birth: BirthContextData,
  forms: PersonalNameForms
}

const selectNationality: Record<Colors, () => Nationality> = {
  British: selectRandomBritishNationality,
  Dutch: selectRandomDutchNationality,
  French: selectRandomFrenchNationality,
  Spanish: selectRandomSpanishNationality,
  Pirate: selectRandomPirateNationality
}

const createCrewTitles: Record<SpecialtyCrew, (nationality: Nationality) => Titles> = {
  captain: createCaptainTitles,
  quartermaster: createTitles,
  bosun: createTitles,
  gunner: createTitles,
  master: createTitles,
  priest: createPriestTitles,
  sorcerer: createTitles,
  carpenter: createTitles
}

const namePerson = async (
  colors: Colors,
  role: SpecialtyCrew
): Promise<PersonalNameData[]> => {
  const module = game.modules.get('revolutionary-piratenames')
  if (!module) throw new Error('Could not load Pirate Names module.')

  const nationality = selectNationality[colors]()
  const titles = createCrewTitles[role](nationality)
  const gender = colors === 'Pirate'
    ? chance(1, 5) ? 'Feminine' : 'Masculine'
    : 'Masculine'

  return module.api.generatePersonalName({ gender, nationality }, titles)
}

export default namePerson
