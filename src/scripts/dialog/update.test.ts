// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { colors } from '../types/enums/colors.ts'
import { shipClasses } from '../types/enums/class.ts'
import initUpdateOptions, { updateOptions } from './update.ts'

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

const expectRoles = (
  html: HTMLElement,
  expected: {
    randomRole: boolean,
    privateer: boolean,
    naval: boolean,
    merchant: boolean,
  }
)=> {
  const { randomRole, privateer, naval, merchant } = getOptions(html)
  expect(randomRole?.disabled).toBe(!expected.randomRole)
  expect(merchant?.disabled).toBe(!expected.merchant)
  expect(privateer?.disabled).toBe(!expected.privateer)
  expect(naval?.disabled).toBe(!expected.naval)
}

const expectShips = (
  html: HTMLElement,
  expected: {
    randomClass: boolean,
    sloop: boolean,
    brigantine: boolean,
    frigate: boolean,
    fluyt: boolean,
    manowar: boolean
  }
) => {
  const { randomClass, sloop, brigantine, frigate, fluyt, manowar } = getOptions(html)
  expect(randomClass?.disabled).toBe(!expected.randomClass)
  expect(sloop?.disabled).toBe(!expected.sloop)
  expect(brigantine?.disabled).toBe(!expected.brigantine)
  expect(frigate?.disabled).toBe(!expected.frigate)
  expect(fluyt?.disabled).toBe(!expected.fluyt)
  expect(manowar?.disabled).toBe(!expected.manowar)
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
    expectRoles(html, {
      randomRole: true,
      merchant: true,
      naval: true,
      privateer: true
    })
  })

  it('disables privateer and naval roles for Dutch', () => {
    const html = buildDialog('Dutch')
    updateOptions(html)
    expectRoles(html, {
      randomRole: true,
      merchant: true,
      naval: false,
      privateer: false
    })
  })

  it('disables merchant and naval roles for pirates', () => {
    const html = buildDialog('Pirate')
    updateOptions(html)
    expectRoles(html, {
      randomRole: true,
      merchant: false,
      naval: false,
      privateer: true
    })
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
    expectShips(html, {
      randomClass: true,
      sloop: true,
      brigantine: true,
      frigate: true,
      fluyt: false,
      manowar: false
    })
  })

  it('enables sloops, brigs, and frigates for pirates', () => {
    const html = buildDialog('Pirates', 'random')
    updateOptions(html)
    expectShips(html, {
      randomClass: true,
      sloop: true,
      brigantine: true,
      frigate: true,
      fluyt: false,
      manowar: false
    })
  })

  it.each([
    ['a random navy', 'Random'],
    ['the Spanish Royal Armada', 'Spanish'],
    ['British', 'the British Royal Navy'],
    ['French', 'the French Royal Navy']
  ] as Array<[string, string]>)('enables sloops, brigs, frigates, and men-of-war for %s', (_desc: string, colors: string) => {
    const html = buildDialog(colors, 'naval')
    updateOptions(html)
    expectShips(html, {
      randomClass: true,
      sloop: true,
      brigantine: true,
      frigate: true,
      fluyt: false,
      manowar: true
    })
  })

  it('enables sloops, brigs, frigates, and fluyts for ships of the Dutch West India Company', () => {
    const html = buildDialog('Dutch', 'merchant')
    updateOptions(html)
    expectShips(html, {
      randomClass: true,
      sloop: true,
      brigantine: true,
      frigate: true,
      fluyt: true,
      manowar: false
    })
  })
})

describe('initUpdateOptions', () => {
  const app = {} as foundry.applications.api.DialogV2

  it('initializes update', () => {
    const html = buildDialog('Dutch')
    initUpdateOptions(app, html)
    expectRoles(html, {
      randomRole: true,
      merchant: true,
      naval: false,
      privateer: false
    })
  })

  it('updates when you choose a nation', () => {
    const html = buildDialog('Random')
    initUpdateOptions(app, html)

    const dutch = html.querySelector<HTMLInputElement>('input[name="colors"][value="Dutch"]')!
    dutch.checked = true
    dutch.dispatchEvent(new Event('change', { bubbles: true }))
    expectRoles(html, {
      randomRole: true,
      merchant: true,
      naval: false,
      privateer: false
    })
  })

  it('updates when you choose a role', () => {
    const html = buildDialog('British', 'merchant')
    initUpdateOptions(app, html)

    const roleSelector = html.querySelector<HTMLSelectElement>('select[name="role"]')!
    roleSelector.value = 'naval'
    roleSelector.dispatchEvent(new Event('change', { bubbles: true }))
    expectShips(html, {
      randomClass: true,
      sloop: true,
      brigantine: true,
      frigate: true,
      fluyt: false,
      manowar: true
    })
  })
})
