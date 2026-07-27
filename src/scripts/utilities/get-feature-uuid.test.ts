import { describe, it, expect } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import getFeatureUUID from './get-feature-uuid.ts'

describe('getFeatureUUID', () => {
  it('gets the features compendium UUID for a given ID', () => {
    const id = generateID()
    const actual = getFeatureUUID(id)
    expect(actual).toBe(`Compendium.revolutionary-pbshipgen.features.Item.${id}`)
  })
})
