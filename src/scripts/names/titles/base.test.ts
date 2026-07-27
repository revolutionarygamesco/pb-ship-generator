import { describe, it, expect } from 'vitest'
import { type Nationality } from '../../types/enums/nationality.ts'
import createTitles, { type GenderedTitle } from './base.ts'

describe('createTitles', () => {
  it.each([
    ['Mr./Mrs.', 'English', 'mister', { m: 'Mr.', f: 'Mrs.' }],
    ['Señor/Señora', 'Spanish', 'mister', { m: 'Señor', f: 'Señora' }],
    ['Senhor/Senhora', 'Portuguese', 'mister', { m: 'Senhor', f: 'Senhora' }],
    ['Monsieur/Madame', 'French', 'mister', { m: 'Monsieur', f: 'Madame' }],
    ['Mr./Mrs.', 'Dutch', 'mister', { m: 'Mr.', f: 'Mrs.' }],
    ['Mr./Mrs.', 'Akan', 'mister', { m: 'Mr.', f: 'Mrs.' }]
  ] as Array<[string, Nationality, string, GenderedTitle]>)('returns %s for %s', (_desc, nationality, key, expected) => {
    const titles = createTitles(nationality)
    expect(titles[key]).toEqual(expected)
  })
})
