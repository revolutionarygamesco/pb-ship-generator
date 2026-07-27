import { beforeEach, describe, it, expect } from 'vitest'
import { type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { type SpecialtyCrew } from '../specialty.ts'
import { type PersonalNameData } from '../../../names/person.ts'
import getDescription from './base.ts'

describe('getDescription', () => {
  let name: Partial<PersonalNameData>
  let ship: Linkable

  beforeEach(() => {
    name = { forms: { nationality: 'English', mister: 'Mr. Smith', full: 'John Smith', personal: 'John' } }
    ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' }
  })

  it.each([
    ['Veteran Quartermaster', 'quartermaster'],
    ['Strict Bosun', 'bosun'],
    ['Master Gunner', 'gunner'],
    ['Master of Sails', 'master'],
    ['Deck Sorcerer', 'sorcerer'],
    ['Master Carpenter', 'carpenter']
  ] as Array<[string, SpecialtyCrew]>)('describes a %s', (_desc, tag) => {
    const actual = getDescription(tag, name, ship)
    expect(actual).toBe(`revolutionary-pbshipgen.crew.specialty.${tag}.description`)
  })
})
