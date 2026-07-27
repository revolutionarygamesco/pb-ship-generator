import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomPirateNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 33, item: 'English' },
    { n: 30, item: 'Akan' },
    { n: 20, item: 'Yoruba' },
    { n: 20, item: 'Fon' },
    { n: 15, item: 'Bantu' },
    { n: 10, item: 'Mandinka' },
    { n: 10, item: 'Scottish' },
    { n: 8, item: 'Welsh' },
    { n: 5, item: 'Dutch' },
    { n: 5, item: 'Igbo' },
    { n: 5, item: 'Irish' },
    { n: 4, item: 'French' },
    { n: 2, item: 'Spanish' },
    { n: 2, item: 'Miskito' },
    { n: 1, item: 'Portuguese' }
  ]))
}

export default selectRandomPirateNationality
