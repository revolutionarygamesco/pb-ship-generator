import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Nationality } from '../../types/enums/nationality.ts'

const selectRandomSpanishNationality = (): Nationality => {
  return selectRandomElement(stockArray<Nationality>([
    { n: 92, item: 'Spanish' },
    { n: 5, item: 'French' },
    { n: 3, item: 'Portuguese' },
    { n: 1, item: 'Irish' }
  ]))
}

export default selectRandomSpanishNationality
