import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeDeckMagician from './magician.ts'

describe('randomizeDeckMagician', () => {
  it('might return a deck sorcerer or a deck priest', () => {
    const valid = [null, getFeatureUUID('oh2VItoo8q4i49GX'), getFeatureUUID('0KDL3PjlyVOFQUxG')]
    const actual = randomizeDeckMagician()
    expect(valid).toContain(actual)
  })
})
