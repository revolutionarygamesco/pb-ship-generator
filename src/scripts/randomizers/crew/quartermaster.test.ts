import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeQuartermaster from './quartermaster.ts'

describe('randomizeQuartermaster', () => {
  it('never assigns a veteran quartermaster to non-pirate ships', () => {
    const actual = randomizeQuartermaster('British', 'legendary')
    expect(actual).toBe(null)
  })

  it('might return a veteran quartermaster for a pirate ship', () => {
    const valid = [null, getFeatureUUID('Z3pAMBnBvSWRxFUm')]
    const actual = randomizeQuartermaster('Pirate', 'legendary')
    expect(valid).toContain(actual)
  })
})
