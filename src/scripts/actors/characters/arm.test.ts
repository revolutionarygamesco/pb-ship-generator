import { beforeEach, describe, it, expect } from 'vitest'
import arm, { arms } from './arm.ts'

describe('arm', () => {
  let actor: Partial<foundry.documents.Actor>
  let features: string[]
  const tests: Array<[string, string, string, string]> = Array.from(arms.values())
    .map(({ name, id, formula }) => {
      return [name.toLowerCase(), name, id, formula]
    })

  beforeEach(() => {
    actor = {}
    features = []
  })

  it('defaults to fisticuffs', () => {
    arm(actor, features)
    expect(actor.system?.attributes?.attack?.formula).toBe('d2')
    expect(actor.system?.attributes?.attack?.description).toBe('Fisticuffs')
    expect(features).toEqual(['<p><strong>Fisticuffs:</strong> d2</p>'])
  })

  it.each(tests)('can arm a character with a %s', (_label, name, id, formula) => {
    arm(actor, features, id)
    expect(actor.system?.attributes?.attack?.formula).toBe(formula)
    expect(actor.system?.attributes?.attack?.description).toBe(name)
    expect(features).toHaveLength(1)
    expect(features[0].startsWith(`<p><strong>${name}:</strong> ${formula}`))
  })

  it('can arm a character with a custom weapon', () => {
    arm(actor, features, { id: 'necroblast', name: 'Necro-Blast', formula: 'd8' })
    expect(actor.system?.attributes?.attack?.formula).toBe('d8')
    expect(actor.system?.attributes?.attack?.description).toBe('Necro-Blast')
    expect(features).toEqual(['<p><strong>Necro-Blast:</strong> d8</p>'])
  })
})
