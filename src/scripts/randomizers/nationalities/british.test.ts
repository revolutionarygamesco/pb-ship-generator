import { describe, it, expect } from 'vitest'
import { type Nationality } from '../../types/enums/nationality.ts'
import selectRandomBritishNationality from './british.ts'

describe('selectRandomBritishNationality', () => {
  it('returns English, Welsh, Scottish, or Irish', () => {
    const valid: Nationality[] = ['English', 'Welsh', 'Scottish', 'Irish']
    const actual = selectRandomBritishNationality()
    expect(valid).toContain(actual)
  })
})
