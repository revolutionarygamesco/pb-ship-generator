import { beforeEach, describe, it, expect } from 'vitest'
import addSpecialty, { crewSpecialties } from './specialty.ts'

describe('addSpecialty', () => {
  let features: string[]

  beforeEach(() => {
    features = []
  })

  it.each(crewSpecialties)('adds %s', (specialty) => {
    addSpecialty(features, specialty)
    const options = ['a', 'b', 'c', 'd']
      .map(opt => `revolutionary-pbshipgen.crew.specialty.${specialty}.options.${opt}`)
    expect(features).toHaveLength(2)
    expect(features[0]).toBe(`revolutionary-pbshipgen.crew.specialty.${specialty}.core`)
    expect(options).toContain(features[1])
  })

  it('can limit options', () => {
    addSpecialty(features, 'priest', ['a'])
    expect(features).toEqual([
      'revolutionary-pbshipgen.crew.specialty.priest.core',
      'revolutionary-pbshipgen.crew.specialty.priest.options.a'
    ])
  })

  it('doesn’t add a second feature if you eliminate everything', () => {
    addSpecialty(features, 'priest', [])
    expect(features).toEqual(['revolutionary-pbshipgen.crew.specialty.priest.core'])
  })
})
