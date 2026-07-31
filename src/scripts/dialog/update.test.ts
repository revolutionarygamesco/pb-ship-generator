// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { colors } from '../types/enums/colors.ts'
import { shipClasses } from '../types/enums/class.ts'
import { updateOptions } from './update.ts'

const buildDialog = (
  checkedColors: string = 'Random',
  checkedRole: string = 'random'
): HTMLElement => {
  const container = document.createElement('div')
  const roles = ['random', 'merchant', 'privateer', 'naval']
  container.innerHTML = `
    <fieldset>
      ${['Random', ...colors].map(value => `
        <input type="radio" name="colors" value="${value}" ${value === checkedColors ? 'checked' : ''} />
      `).join('')}
    </fieldset>
    <select name="role">
      ${roles.map(value => `
        <option value="${value}" ${value === checkedRole ? 'selected' : ''}>${value}</option>
      `).join('')}
    </select>
    <select name="class">
      ${['Random', ...shipClasses].map(value => `
        <option value="${value}">${value}</option>
      `).join('')}
    </select>
  `
  return container
}

const getOptions = (html: HTMLElement): Record<string, HTMLOptionElement | null> => {
  const randomRole = html.querySelector<HTMLOptionElement>('select[name="role"] option[value="random"]')
  const privateer = html.querySelector<HTMLOptionElement>('select[name="role"] option[value="privateer"]')
  const naval = html.querySelector<HTMLOptionElement>('select[name="role"] option[value="naval"]')
  const merchant = html.querySelector<HTMLOptionElement>('select[name="role"] option[value="merchant"]')
  const randomClass = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Random"]')
  const sloop = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Sloop"]')
  const brigantine = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Brigantine"]')
  const frigate = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Frigate"]')
  const fluyt = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Fluyt"]')
  const manowar = html.querySelector<HTMLOptionElement>('select[name="class"] option[value="Man-of-War"]')
  return { randomRole, privateer, naval, merchant, randomClass, sloop, brigantine, frigate, fluyt, manowar }
}

describe('updateOptions', () => {
  it.each([
    'Random',
    'Spanish',
    'British',
    'French'
  ] as string[])('enables all roles for %s', (colors: string) => {
    const html = buildDialog(colors)
    updateOptions(html)
    const { randomRole, privateer, naval, merchant } = getOptions(html)

    expect(randomRole?.disabled).toBe(false)
    expect(merchant?.disabled).toBe(false)
    expect(privateer?.disabled).toBe(false)
    expect(naval?.disabled).toBe(false)
  })

  it('disables privateer and naval roles for Dutch', () => {
    const html = buildDialog('Dutch')
    updateOptions(html)
    const { randomRole, privateer, naval, merchant } = getOptions(html)

    expect(randomRole?.disabled).toBe(false)
    expect(merchant?.disabled).toBe(false)
    expect(privateer?.disabled).toBe(true)
    expect(naval?.disabled).toBe(true)
  })

  it('disables merchant and naval roles for pirates', () => {
    const html = buildDialog('Pirate')
    updateOptions(html)
    const { randomRole, privateer, naval, merchant } = getOptions(html)

    expect(randomRole?.disabled).toBe(false)
    expect(merchant?.disabled).toBe(true)
    expect(privateer?.disabled).toBe(false)
    expect(naval?.disabled).toBe(true)
  })

  it.each([
    ['Random', 'merchant'],
    ['Random', 'privateer'],
    ['Spanish', 'merchant'],
    ['Spanish', 'privateer'],
    ['British', 'merchant'],
    ['British', 'privateer'],
    ['French', 'merchant'],
    ['French', 'privateer']
  ] as Array<[string, string]>)('enables sloops, brigs, and frigates for %s %s', (colors: string, role: string) => {
    const html = buildDialog(colors, role)
    updateOptions(html)
    const { randomClass, sloop, brigantine, frigate, fluyt, manowar } = getOptions(html)

    expect(randomClass?.disabled).toBe(false)
    expect(sloop?.disabled).toBe(false)
    expect(brigantine?.disabled).toBe(false)
    expect(frigate?.disabled).toBe(false)
    expect(fluyt?.disabled).toBe(true)
    expect(manowar?.disabled).toBe(true)
  })

  it('enables sloops, brigs, and frigates for pirates', () => {
    const html = buildDialog('Pirates', 'random')
    updateOptions(html)
    const { randomClass, sloop, brigantine, frigate, fluyt, manowar } = getOptions(html)

    expect(randomClass?.disabled).toBe(false)
    expect(sloop?.disabled).toBe(false)
    expect(brigantine?.disabled).toBe(false)
    expect(frigate?.disabled).toBe(false)
    expect(fluyt?.disabled).toBe(true)
    expect(manowar?.disabled).toBe(true)
  })

  it.each([
    ['a random navy', 'Random'],
    ['the Spanish Royal Armada', 'Spanish'],
    ['British', 'the British Royal Navy'],
    ['French', 'the French Royal Navy']
  ] as Array<[string, string]>)('enables sloops, brigs, frigates, and men-of-war for %s', (_desc: string, colors: string) => {
    const html = buildDialog(colors, 'naval')
    updateOptions(html)
    const { randomClass, sloop, brigantine, frigate, fluyt, manowar } = getOptions(html)

    expect(randomClass?.disabled).toBe(false)
    expect(sloop?.disabled).toBe(false)
    expect(brigantine?.disabled).toBe(false)
    expect(frigate?.disabled).toBe(false)
    expect(fluyt?.disabled).toBe(true)
    expect(manowar?.disabled).toBe(false)
  })

  it('enables sloops, brigs, frigates, and fluyts for ships of the Dutch West India Company', () => {
    const html = buildDialog('Dutch', 'merchant')
    updateOptions(html)
    const { randomClass, sloop, brigantine, frigate, fluyt, manowar } = getOptions(html)

    expect(randomClass?.disabled).toBe(false)
    expect(sloop?.disabled).toBe(false)
    expect(brigantine?.disabled).toBe(false)
    expect(frigate?.disabled).toBe(false)
    expect(fluyt?.disabled).toBe(false)
    expect(manowar?.disabled).toBe(true)
  })
})
