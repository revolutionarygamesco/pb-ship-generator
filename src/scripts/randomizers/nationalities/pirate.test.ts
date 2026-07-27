import { describe, it, expect } from 'vitest'
import { isNationality } from '../../types/enums/nationality.ts'
import selectRandomPirateNationality from './british.ts'

describe('selectRandomPirateNationality', () => {
  it('returns a nationality', () => {
    const actual = selectRandomPirateNationality()
    expect(isNationality(actual)).toBe(true)
  })
})
