import { beforeEach, describe, it, expect } from 'vitest'
import arm, { arms } from './arm.ts'

describe('arm', () => {
  let actor: Partial<foundry.documents.Actor>
  let features: string[]
  const tests: Array<[string, string]> = Array.from(arms.keys())
    .map(key => {
      return [key, arms.get(key)!.formula]
    })

  beforeEach(() => {
    actor = {}
    features = []
  })

  it('defaults to fisticuffs', () => {
    arm(actor, features)
    expect(actor.system?.attributes?.attack?.formula).toBe('d2')
    expect(actor.system?.attributes?.attack?.description).toBe('revolutionary-pbshipgen.crew.weapons.fisticuffs.name')
    expect(features).toEqual(['<p><strong>revolutionary-pbshipgen.crew.weapons.fisticuffs.name:</strong> d2</p>'])
  })

  it.each(tests)('can arm a character with %s', (id, formula) => {
    arm(actor, features, id)
    expect(actor.system?.attributes?.attack?.formula).toBe(formula)
    expect(actor.system?.attributes?.attack?.description).toBe(`revolutionary-pbshipgen.crew.weapons.${id}.name`)
    expect(features).toHaveLength(1)
    expect(features[0].startsWith(`<p><strong>revolutionary-pbshipgen.crew.weapons.${id}.name:</strong> ${formula}`))
  })

  it('can arm a character with a custom weapon', () => {
    arm(actor, features, { name: 'Necro-Blast', formula: 'd8', special: 'pew pew' })
    expect(actor.system?.attributes?.attack?.formula).toBe('d8')
    expect(actor.system?.attributes?.attack?.description).toBe('Necro-Blast')
    expect(features).toEqual(['<p><strong>Necro-Blast:</strong> d8, pew pew.</p>'])
  })
})
