import { beforeEach, describe, it, expect } from 'vitest'
import armor, { armors } from './armor.ts'

describe('armor', () => {
  let actor: Partial<foundry.documents.Actor>
  let features: string[]
  const tests: Array<[string, string, string, string]> = Array.from(armors.values())
    .map(({ name, id, formula }) => {
      return [name.toLowerCase(), name, id, formula]
    })

  beforeEach(() => {
    actor = {}
    features = []
  })

  it('defaults to no armor', () => {
    armor(actor, features)
    expect(actor.system?.attributes?.armor?.formula).toBe('0')
    expect(actor.system?.attributes?.armor?.description).toBe('No Armor')
    expect(features).toEqual(['<p><strong>No Armor</strong></p>'])
  })

  it.each(tests)('can equip a character with %s', (_label, name, id, formula) => {
    armor(actor, features, id)
    expect(actor.system?.attributes?.armor?.formula).toBe(formula)
    expect(actor.system?.attributes?.armor?.description).toBe(name)

    const expected = formula === '0'
      ? `<p><strong>${name}</strong></p>`
      : `<p><strong>${name}:</strong> ${formula}`
    expect(features).toHaveLength(1)
    expect(features[0].startsWith(expected))
  })

  it('can equip a character with custom armor', () => {
    armor(actor, features, { id: 'ceramic', name: 'Fairweather T-500', formula: 'd20' })
    expect(actor.system?.attributes?.armor?.formula).toBe('d20')
    expect(actor.system?.attributes?.armor?.description).toBe('Fairweather T-500')
    expect(features).toEqual(['<p><strong>Fairweather T-500:</strong> d20</p>'])
  })
})
