import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomFrenchNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 97, item: 'French' },
    { n: 1, item: 'Spanish' },
    { n: 1, item: 'Irish' },
    { n: 1, item: 'Dutch' }
  ]))
}

export default selectRandomFrenchNationality
