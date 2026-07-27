import { describe, it, expect } from 'vitest'
import createSloop from '../classes/sloop.ts'
import improveSails from './sails.ts'

describe('improveSails', () => {
  it('throws an error if speed isn’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = { system: { attributes: { speed: { max: 5, min: 0, value: 5 } } } }
    expect(() => improveSails(actor)).toThrow()
  })

  it('throws an error if agility isn’t already established', () => {
    const actor: Partial<foundry.documents.Actor> = { system: { abilities: { agility: { value: 2 }  } } }
    expect(() => improveSails(actor)).toThrow()
  })

  it('adds +1 to speed, +1 to agility', () => {
    const actor = createSloop()
    improveSails(actor)
    expect(actor.system?.attributes?.speed?.max).toBe(6)
    expect(actor.system?.attributes?.speed?.value).toBe(6)
    expect(actor.system?.attributes?.speed?.min).toBe(0)
    expect(actor.system?.abilities?.agility?.value).toBe(3)
  })
})
