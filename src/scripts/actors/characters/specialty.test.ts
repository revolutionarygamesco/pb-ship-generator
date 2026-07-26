import { beforeEach, describe, it, expect } from 'vitest'
import addSpecialty, { specialties } from './specialty.ts'

describe('addSpecialty', () => {
  let features: string[]

  beforeEach(() => {
    features = []
  })

  it('defaults to nothing', () => {
    addSpecialty(features)
    expect(features).toEqual([])
  })

  it.each(specialties)('adds %s', (specialty, expected) => {
    addSpecialty(features, specialty)
    expect(features).toEqual([...expected])
  })
})
