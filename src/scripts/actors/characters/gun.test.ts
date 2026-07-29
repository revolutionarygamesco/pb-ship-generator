import { beforeEach, describe, it, expect } from 'vitest'
import addGun from './gun.ts'

describe('addGun', () => {
  let features: string[]

  beforeEach(() => {
    features = []
  })

  it.each([
    ['flintlock pistol', 'flintlock'],
    ['blunderbuss', 'blunderbuss'],
    ['musket', 'musket'],
    ['buccaneer’s musket', 'musket-fine']
  ] as Array<[string, string]>)('adds a %s', (_desc, id) => {
    addGun(features, id)
    expect(features).toHaveLength(1)
    expect(features[0].startsWith(`<p><strong>revolutionary-pbshipgen.crew.weapons.${id}.name:</strong> `))
  })
})
