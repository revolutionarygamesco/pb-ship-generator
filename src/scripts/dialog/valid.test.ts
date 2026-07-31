import { describe, it, expect } from 'vitest'
import { type Colors } from '../types/enums/colors.ts'
import getValidOptions from './valid.ts'

describe('getValidOptions', () => {
  const allRoles: string[] = ['random', 'merchant', 'privateer', 'naval']
  const coreClasses: string[] = ['Random', 'Sloop', 'Brigantine', 'Frigate']

  it('returns all three roles for random', () => {
    const { roles } = getValidOptions('random')
    expect(roles).toEqual(allRoles)
  })

  it.each([
    'Spanish',
    'British',
    'French'
  ] as Colors[])('returns all three roles for %s', (colors) => {
    const { roles } = getValidOptions(colors)
    expect(roles).toEqual(allRoles)
  })

  it('returns only random and merchant for Dutch', () => {
    const { roles } = getValidOptions('Dutch')
    expect(roles).toEqual(['random', 'merchant'])
  })

  it('returns only random and privateer for Pirate', () => {
    const { roles } = getValidOptions('Pirate')
    expect(roles).toEqual(['random', 'privateer'])
  })

  it.each([
    ['Spanish', 'merchantmen', 'merchant'],
    ['British', 'merchantmen', 'merchant'],
    ['French', 'merchantmen', 'merchant'],
    ['Spanish', 'privateers', 'privateer'],
    ['British', 'privateers', 'privateer'],
    ['French', 'privateers', 'privateer']
  ] as Array<[Colors, string, string]>)('returns sloop, brigantine, and frigate for %s %s', (colors, _desc, role) => {
    const { shipClasses } = getValidOptions(colors, role)
    expect(shipClasses).toEqual(coreClasses)
  })

  it('returns sloop, brigantine, and frigate for random', () => {
    const { shipClasses } = getValidOptions('random')
    expect(shipClasses).toEqual(coreClasses)
  })

  it.each([
    'Spanish',
    'British',
    'French',
  ] as Colors[])('returns sloop, brigantine, frigate, and man-of-war for ships of the %s navy', (colors) => {
    const { shipClasses } = getValidOptions(colors, 'naval')
    expect(shipClasses).toEqual([...coreClasses, 'Man-of-War'])
  })

  it('returns sloop, brigantine, and frigate for pirate ships', () => {
    const { shipClasses } = getValidOptions('Pirate', 'privateer')
    expect(shipClasses).toEqual(coreClasses)
  })

  it('returns sloop, brigantine, frigate, and fluyt for Dutch ships', () => {
    const { shipClasses } = getValidOptions('Dutch', 'privateer')
    expect(shipClasses).toEqual([...coreClasses, 'Fluyt'])
  })
})
