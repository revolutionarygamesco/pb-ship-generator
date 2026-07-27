import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeSailingMaster from './master.ts'

describe('randomizeSailingMaster', () => {
  it('might return a sailing master', () => {
    const valid = [null, getFeatureUUID('LKAXQBEp2CEgXEcH')]
    const actual = randomizeSailingMaster()
    expect(valid).toContain(actual)
  })
})
