import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeDeckMagician from './magician.ts'

describe('randomizeDeckMagician', () => {
  it('might return a deck sorcerer', () => {
    const valid = [null, getFeatureUUID('0KDL3PjlyVOFQUxG')]
    const { sorcerer } = randomizeDeckMagician()
    expect(valid).toContain(sorcerer)
  })

  it('might return a deck priest', () => {
    const valid = [null, getFeatureUUID('oh2VItoo8q4i49GX')]
    const { priest } = randomizeDeckMagician()
    expect(valid).toContain(priest)
  })
})
