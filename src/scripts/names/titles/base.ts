import { type Nationality } from '../../types/enums/nationality.ts'

export interface GenderedTitle {
  m: string
  f: string
}

export interface Titles {
  [key: string]: string | GenderedTitle
}

const createTitles = (nationality: Nationality): Titles => {
  const titles: Titles = {}

  switch (nationality) {
    case 'Spanish':
      titles.mister = { m: 'Señor', f: 'Señora' }
      break
    case 'Portuguese':
      titles.mister = { m: 'Senhor', f: 'Senhora' }
      break
    case 'French':
      titles.mister = { m: 'Monsieur', f: 'Madame' }
      break
    default:
      titles.mister = { m: 'Mr.', f: 'Mrs.' }
      break
  }

  return titles
}

export default createTitles
