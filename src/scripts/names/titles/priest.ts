import { selectRandomElement } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'
import createTitles, { type Titles } from './base.ts'

const createStrangePriestTitles = (titles: Titles): Titles => {
  titles.priest = selectRandomElement<string | { m: string, f: string }>([
    { m: 'Brother', f: 'Sister' },
    { m: 'Father', f: 'Mother' },
    'Blessed',
    'Seeker',
    'Preacher'
  ])

  return titles
}

const createPriestTitles = (
  nationality: Nationality,
  strange: boolean = false
): Titles => {
  const titles = createTitles(nationality)
  if (strange) return createStrangePriestTitles(titles)

  const catholics: Nationality[] = ['Spanish', 'Portuguese', 'French', 'Irish']
  const protestants: Nationality[] = ['English', 'Dutch', 'Welsh', 'Scottish']

  if (catholics.includes(nationality)) titles.priest = 'Father'
  if (protestants.includes(nationality)) titles.priest = 'Reverend'
  if (nationality === 'Akan') titles.priest = 'Okomfo'
  if (nationality === 'Bantu') titles.priest = { m: 'Tata', f: 'Mama' }
  if (nationality === 'Fon') titles.priest = { m: 'Houngan', f: 'Manbo'}
  if (nationality === 'Igbo') titles.priest = 'Dibịa'
  if (nationality === 'Mandinka') titles.priest = 'Imam'
  if (nationality === 'Yoruba') titles.priest = 'Awo'

  return titles
}

export default createPriestTitles
