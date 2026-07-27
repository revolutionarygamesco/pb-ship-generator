import { describe, it, expect } from 'vitest'
import getFeatureUUID from '../../utilities/get-feature-uuid.ts'
import randomizeBosun from './bosun.ts'

describe('randomizeBosun', () => {
  it('might return a strict bosun', () => {
    const valid = [null, getFeatureUUID('67OUgeWGhrTp629d')]
    const actual = randomizeBosun()
    expect(valid).toContain(actual)
  })
})
