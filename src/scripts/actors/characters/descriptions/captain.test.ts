import { beforeEach, describe, it, expect } from 'vitest'
import { type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { type PersonalNameData } from '../../../names/person.ts'
import { type Colors } from '../../../types/enums/colors.ts'
import { type ShipRole } from '../../../types/enums/role.ts'
import getCaptainDescription, { type CaptainExperience } from './captain.ts'

describe('getCaptainDescription', () => {
  let name: Partial<PersonalNameData>
  let ship: Linkable

  beforeEach(() => {
    name = { forms: { nationality: 'English', mister: 'Mr. Smith', captain: 'Captain Smith', full: 'John Smith', personal: 'John' } }
    ship = { uuid: `Actor.${generateID()}`, name: 'Hispaniola' }
  })

  it.each([
    ['a legendary British navy', 'British', 'Man-of-War', false, 'legendary', 'naval.legendary'],
    ['an experienced British navy', 'British', 'Man-of-War', false, 'high', 'naval.high'],
    ['an average British navy', 'British', 'Man-of-War', false, 'medium', 'naval.medium'],
    ['an inexperienced British navy', 'British', 'Man-of-War', false, 'low', 'naval.low'],
    ['a legendary British merchant', 'British', 'Merchantman', false, 'legendary', 'merchant.legendary'],
    ['an experienced British merchant', 'British', 'Merchantman', false, 'high', 'merchant.high'],
    ['an average British merchant', 'British', 'Merchantman', false, 'medium', 'merchant.medium'],
    ['an inexperienced British merchant', 'British', 'Merchantman', false, 'low', 'merchant.low'],
    ['a legendary British privateer', 'British', 'Man-of-War', true, 'legendary', 'privateer.legendary'],
    ['an experienced British privateer', 'British', 'Man-of-War', true, 'high', 'privateer.high'],
    ['an average British privateer', 'British', 'Man-of-War', true, 'medium', 'privateer.medium'],
    ['an inexperienced British privateer', 'British', 'Man-of-War', true, 'low', 'privateer.low'],
    ['a legendary French navy', 'French', 'Man-of-War', false, 'legendary', 'naval.legendary'],
    ['an experienced French navy', 'French', 'Man-of-War', false, 'high', 'naval.high'],
    ['an average French navy', 'French', 'Man-of-War', false, 'medium', 'naval.medium'],
    ['an inexperienced French navy', 'French', 'Man-of-War', false, 'low', 'naval.low'],
    ['a legendary French merchant', 'French', 'Merchantman', false, 'legendary', 'merchant.legendary'],
    ['an experienced French merchant', 'French', 'Merchantman', false, 'high', 'merchant.high'],
    ['an average French merchant', 'French', 'Merchantman', false, 'medium', 'merchant.medium'],
    ['an inexperienced French merchant', 'French', 'Merchantman', false, 'low', 'merchant.low'],
    ['a legendary French privateer', 'French', 'Man-of-War', true, 'legendary', 'privateer.legendary'],
    ['an experienced French privateer', 'French', 'Man-of-War', true, 'high', 'privateer.high'],
    ['an average French privateer', 'French', 'Man-of-War', true, 'medium', 'privateer.medium'],
    ['an inexperienced French privateer', 'French', 'Man-of-War', true, 'low', 'privateer.low'],
    ['a legendary Spanish navy', 'Spanish', 'Man-of-War', false, 'legendary', 'naval.legendary'],
    ['an experienced Spanish navy', 'Spanish', 'Man-of-War', false, 'high', 'naval.high'],
    ['an average Spanish navy', 'Spanish', 'Man-of-War', false, 'medium', 'naval.medium'],
    ['an inexperienced Spanish navy', 'Spanish', 'Man-of-War', false, 'low', 'naval.low'],
    ['a legendary Spanish merchant', 'Spanish', 'Merchantman', false, 'legendary', 'merchant.legendary'],
    ['an experienced Spanish merchant', 'Spanish', 'Merchantman', false, 'high', 'merchant.high'],
    ['an average Spanish merchant', 'Spanish', 'Merchantman', false, 'medium', 'merchant.medium'],
    ['an inexperienced Spanish merchant', 'Spanish', 'Merchantman', false, 'low', 'merchant.low'],
    ['a legendary Spanish privateer', 'Spanish', 'Man-of-War', true, 'legendary', 'privateer.legendary'],
    ['an experienced Spanish privateer', 'Spanish', 'Man-of-War', true, 'high', 'privateer.high'],
    ['an average Spanish privateer', 'Spanish', 'Man-of-War', true, 'medium', 'privateer.medium'],
    ['an inexperienced Spanish privateer', 'Spanish', 'Man-of-War', true, 'low', 'privateer.low'],
    ['a legendary Dutch navy', 'Dutch', 'Man-of-War', false, 'legendary', 'dutch.legendary'],
    ['an experienced Dutch navy', 'Dutch', 'Man-of-War', false, 'high', 'dutch.high'],
    ['an average Dutch navy', 'Dutch', 'Man-of-War', false, 'medium', 'dutch.medium'],
    ['an inexperienced Dutch navy', 'Dutch', 'Man-of-War', false, 'low', 'dutch.low'],
    ['a legendary Dutch merchant', 'Dutch', 'Merchantman', false, 'legendary', 'dutch.legendary'],
    ['an experienced Dutch merchant', 'Dutch', 'Merchantman', false, 'high', 'dutch.high'],
    ['an average Dutch merchant', 'Dutch', 'Merchantman', false, 'medium', 'dutch.medium'],
    ['an inexperienced Dutch merchant', 'Dutch', 'Merchantman', false, 'low', 'dutch.low'],
    ['a legendary Dutch privateer', 'Dutch', 'Man-of-War', true, 'legendary', 'privateer.legendary'],
    ['an experienced Dutch privateer', 'Dutch', 'Man-of-War', true, 'high', 'privateer.high'],
    ['an average Dutch privateer', 'Dutch', 'Man-of-War', true, 'medium', 'privateer.medium'],
    ['an inexperienced Dutch privateer', 'Dutch', 'Man-of-War', true, 'low', 'privateer.low'],
  ] as Array<[string, Colors, ShipRole, boolean, CaptainExperience, string]>)('describes %s', (_desc, colors, role, privateer, experience, expected) => {
    const actual = getCaptainDescription({ colors, role, privateer, experience, name, ship })
    expect(actual).toBe(`revolutionary-pbshipgen.crew.specialty.captain.description.${expected}`)
  })
})
