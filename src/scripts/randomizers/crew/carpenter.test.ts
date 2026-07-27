import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeMasterCarpenter from './carpenter.ts'

describe('randomizeMasterCarpenter', () => {
  it('might return a master carpenter', () => {
    const valid = [null, getFeatureUUID('usyDHqr0Lg4jXWtN')]
    const actual = randomizeMasterCarpenter()
    expect(valid).toContain(actual)
  })
})
