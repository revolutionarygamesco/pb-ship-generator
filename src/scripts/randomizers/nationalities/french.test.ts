import { describe, it, expect } from 'vitest'
import { type Nationality } from '../../types/enums/nationality.ts'
import selectRandomFrenchNationality from './french.ts'

describe('selectRandomFrenchNationality', () => {
  it('returns English, Welsh, Scottish, or Irish', () => {
    const valid: Nationality[] = ['French', 'Irish', 'Spanish', 'Dutch']
    const actual = selectRandomFrenchNationality()
    expect(valid).toContain(actual)
  })
})
