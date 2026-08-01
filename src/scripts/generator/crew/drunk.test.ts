import { beforeEach, describe, it, expect, vi } from 'vitest'
import { createParams } from './params.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import * as randomizeDrunkenness from '../../randomizers/crew/drunk.ts'
import generateDrunks from './drunk.ts'

describe('generateDrunks', () => {
  const featureId = `Item.${generateID()}`
  const params = createParams()

  beforeEach(() => {
    params.features = []
    params.crews = []
  })

  it('does nothing if randomizer comes back null', async () => {
    vi.spyOn(randomizeDrunkenness, 'default').mockReturnValue(null)
    await generateDrunks(params)
    expect(params.features).toEqual([])
    expect(params.crews).toEqual([])
  })

  it('can make a crew drunk', async () => {
    vi.spyOn(randomizeDrunkenness, 'default').mockReturnValue(featureId)
    await generateDrunks(params)
    expect(params.features).toEqual([featureId])
    expect(params.crews).toEqual([])
  })
})
