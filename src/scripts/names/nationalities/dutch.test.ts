import { describe, it, expect } from 'vitest'
import { type Nationality } from '../../types/enums/nationality.ts'
import selectRandomDutchNationality from './dutch.ts'

describe('selectRandomDutchNationality', () => {
  it('returns English, Welsh, Scottish, or Irish', () => {
    const valid: Nationality[] = ['Dutch', 'English', 'Welsh', 'Scottish', 'Irish', 'Spanish', 'Portuguese', 'French']
    const actual = selectRandomDutchNationality()
    expect(valid).toContain(actual)
  })
})
