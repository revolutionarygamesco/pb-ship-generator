import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomBritishNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 12, item: 'English' },
    { n: 3, item: 'Welsh' },
    { n: 2, item: 'Scottish' },
    { n: 1, item: 'Irish' }
  ]))
}

export default selectRandomBritishNationality
