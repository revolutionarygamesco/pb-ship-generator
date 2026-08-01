import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeDrunkenness from './drunk.ts'

describe('randomizeDrunkenness', () => {
  it('might return a drunk crew', () => {
    const valid = [null, getFeatureUUID('P89ELFOoYxzjuQSh')]
    const actual = randomizeDrunkenness('Pirate')
    expect(valid).toContain(actual)
  })
})
