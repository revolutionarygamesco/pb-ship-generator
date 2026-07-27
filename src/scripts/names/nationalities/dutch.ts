import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomDutchNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 50, item: 'Dutch' },
    { n: 6, item: 'Spanish' },
    { n: 6, item: 'Portuguese' },
    { n: 6, item: 'French' },
    { n: 6, item: 'English' },
    { n: 3, item: 'Welsh' },
    { n: 2, item: 'Scottish' },
    { n: 1, item: 'Irish' }
  ]))
}

export default selectRandomDutchNationality
