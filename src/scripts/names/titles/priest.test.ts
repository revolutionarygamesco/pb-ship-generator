import { describe, it, expect } from 'vitest'
import { type Nationality} from '../../types/enums/nationality.ts'
import { type GenderedTitle } from './base.ts'
import createPriestTitles from './priest.ts'

describe('createPriestTitles', () => {
  it.each([
    ['Father', 'Spanish', 'Father'],
    ['Father', 'Portuguese', 'Father'],
    ['Father', 'French', 'Father'],
    ['Reverend', 'English', 'Reverend'],
    ['Reverend', 'Dutch', 'Reverend'],
    ['Okomfo', 'Akan', 'Okomfo'],
    ['Tata/Mama', 'Bantu', { m: 'Tata', f: 'Mama' }],
    ['Houngan/Manbo', 'Fon', { m: 'Houngan', f: 'Manbo'}],
    ['Dibịa', 'Igbo', 'Dibịa'],
    ['Imam', 'Mandinka', 'Imam'],
    ['Awo', 'Yoruba', 'Awo']
  ] as Array<[string, Nationality, string | GenderedTitle]>)('returns %s for %s priests', (_desc, nationality, expected) => {
    const actual = createPriestTitles(nationality)
    expect(actual.priest).toEqual(expected)
  })

  it.each([
    'Kalinago',
    'Taíno',
    'Miskito',
  ] as Nationality[])('returns nothing for %s (no cultural analogue)', (nationality: Nationality) => {
    const actual = createPriestTitles(nationality)
    expect(actual.priest).not.toBeDefined()
  })

  it('can return strange titles for cultists', () => {
    const actual = createPriestTitles('English', true)
    expect(actual.priest).toBeDefined()
    expect(actual.priest).not.toBe('Reverend')
  })
})
