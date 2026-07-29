import { makeEnum } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import getRollTableUUID from '../../utilities/get-rolltable-uuid.ts'

export const nationalities = ['Akan', 'Bantu', 'Dutch',
  'English', 'Fon', 'French', 'Igbo', 'Irish', 'Kalinago', 'Mandinka',
  'Miskito', 'Portuguese', 'Scottish', 'Spanish', 'Taíno', 'Welsh', 'Yoruba'] as const
export type Nationality = typeof nationalities[number]
export const { guard: isNationality } = makeEnum(nationalities)

export const selectRandomNationality = async (
  scope: 'person' | 'pirate' = 'person'
): Promise<Nationality> => {
  const id = scope === 'pirate' ? 'S3jEhiwdL6Pry0nK' : 'NLyKzSrJYnYaU6TJ'
  return await drawGuarded(getRollTableUUID(id, 'NAMES'), isNationality, 'Spanish')
}

export const indefiniteNationality = (
  nationality: Nationality
): string => {
  const dict: Record<Nationality, string> = {
    Akan: 'an Akan',
    Bantu: 'a Bantu',
    Dutch: 'a Dutch',
    English: 'an English',
    Fon: 'a Fon',
    French: 'a French',
    Igbo: 'an Igbo',
    Irish: 'an Irish',
    Kalinago: 'a Kalinago',
    Mandinka: 'a Mandinka',
    Miskito: 'a Miskito',
    Portuguese: 'a Portuguese',
    Scottish: 'a Scottish',
    Spanish: 'a Spanish',
    Taíno: 'a Taíno',
    Welsh: 'a Welsh',
    Yoruba: 'a Yoruba'
  }

  return dict[nationality]
}
