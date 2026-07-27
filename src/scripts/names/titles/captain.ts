import { type Nationality } from '../../types/enums/nationality.ts'
import createTitles, { type Titles } from './base.ts'

const createCaptainTitles = (nationality: Nationality): Titles => {
  const titles = createTitles(nationality)
  titles.captain = 'Captain'
  return titles
}

export default createCaptainTitles
