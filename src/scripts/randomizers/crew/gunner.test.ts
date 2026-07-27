import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeMasterGunner from './gunner.ts'

describe('randomizeMasterGunner', () => {
  it('might return a master gunner', () => {
    const valid = [null, getFeatureUUID('rRwYfX3SR1rBh4jO')]
    const actual = randomizeMasterGunner('Man-of-War')
    expect(valid).toContain(actual)
  })
})
