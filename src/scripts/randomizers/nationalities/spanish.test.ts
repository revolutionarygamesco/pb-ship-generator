import { describe, it, expect } from 'vitest'
import { type Nationality } from '../../types/enums/nationality.ts'
import selectRandomSpanishNationality from './spanish.ts'

describe('selectRandomSpanishNationality', () => {
  it('returns Spanish, Portuguese, French, or Irish', () => {
    const valid: Nationality[] = ['Spanish', 'Portuguese', 'French', 'Irish']
    const actual = selectRandomSpanishNationality()
    expect(valid).toContain(actual)
  })
})
