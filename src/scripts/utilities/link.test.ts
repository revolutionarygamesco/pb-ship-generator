import { linkActor } from './link.ts'

describe('linkActor', () => {
  const sailor: Actor = {
    id: 'abc',
    name: 'Sailor'
  } as Actor

  it('creates a link', () => {
    const expected = '@UUID[Actor.abc]{Sailor}'
    expect(linkActor(sailor)).toBe(expected)
  })
})
