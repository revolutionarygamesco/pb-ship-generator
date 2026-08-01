import { describe, it, expect } from 'vitest'
import { type PersonalNameData } from '../person.ts'
import getSailorActorName from './sailor-actor.ts'

describe('getSailorActorName', () => {
  it('returns the full name for most names', () => {
    const name = { nationality: 'English', forms: { full: 'John Doe' } } as unknown as PersonalNameData
    const actual = getSailorActorName([name])
    expect(actual).toBe('John Doe')
  })

  it('returns personal name if there is no full name', () => {
    const name = { nationality: 'English', forms: { personal: 'John' } } as unknown as PersonalNameData
    const actual = getSailorActorName([name])
    expect(actual).toBe('John')
  })

  it('returns the short form if there is one', () => {
    const name = { nationality: 'Spanish', forms: {
      full: 'Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso',
      short: 'Pablo Picasso'
    } } as unknown as PersonalNameData
    const actual = getSailorActorName([name])
    expect(actual).toBe('Pablo Picasso')
  })

  it('returns Irish Gaelic with anglicization for Irish names', () => {
    const irish = { nationality: 'Irish', forms: { nationality: 'Irish', full: 'Padraig Ó Ceallaigh' } } as unknown as PersonalNameData
    const english = { nationality: 'English', forms: { nationality: 'English', full: 'Patrick Kelly' } } as unknown as PersonalNameData
    const actual = getSailorActorName([irish, english])
    expect(actual).toBe('Padraig Ó Ceallaigh (Patrick Kelly)')
  })
})
