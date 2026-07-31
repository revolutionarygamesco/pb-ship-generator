import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomPirateNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 33, item: 'English' },
    { n: 10, item: 'Scottish' },
    { n: 8, item: 'Welsh' },
    { n: 6, item: 'Akan' },
    { n: 5, item: 'Irish' },
    { n: 5, item: 'Dutch' },
    { n: 4, item: 'French' },
    { n: 4, item: 'Yoruba' },
    { n: 4, item: 'Fon' },
    { n: 3, item: 'Bantu' },
    { n: 2, item: 'Mandinka' },
    { n: 2, item: 'Spanish' },
    { n: 2, item: 'Miskito' },
    { n: 1, item: 'Igbo' },
    { n: 1, item: 'Portuguese' }
  ]))
}

export default selectRandomPirateNationality
