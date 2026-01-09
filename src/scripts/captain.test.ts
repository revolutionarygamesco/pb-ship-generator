import {
  isCulture,
  generateCaptainHP,
  generateCaptainMorale,
  getWeapon
} from './captain.ts'

describe('Captain generation methods', () => {
  describe('isCulture', () => {
    it.each([
      [true, 'Spanish'],
      [true, 'English'],
      [true, 'Scottish'],
      [true, 'Welsh'],
      [true, 'Irish'],
      [true, 'French'],
      [true, 'Dutch'],
      [false, 'German'],
      [false, 'lol no'],
      [false, undefined],
      [false, null],
      [false, () => {
      }],
      [false, true],
      [false, false],
      [false, 42],
      [false, {}],
      [false, ['Spanish']],
      [false, {}],
      [false, { culture: 'Spanish' }]
    ] as [boolean, any][])('returns %s for %s', (expected, str) => {
      expect(isCulture(str)).toBe(expected)
    })
  })

  describe('generateCaptainHP', () => {
    it('returns 4-10 for a captain with little experience', () => {
      const actual = generateCaptainHP('Low', false)
      expect(actual).toBeGreaterThanOrEqual(4)
      expect(actual).toBeLessThanOrEqual(10)
    })

    it('returns 4-12 for a captain with average experience', () => {
      const actual = generateCaptainHP('Medium', false)
      expect(actual).toBeGreaterThanOrEqual(4)
      expect(actual).toBeLessThanOrEqual(12)
    })

    it('returns 8-12 for an experienced captain', () => {
      const actual = generateCaptainHP('High', false)
      expect(actual).toBeGreaterThanOrEqual(8)
      expect(actual).toBeLessThanOrEqual(12)
    })

    it('returns 9-24 for a legendary captain', () => {
      const actual = generateCaptainHP('High', true)
      expect(actual).toBeGreaterThanOrEqual(9)
      expect(actual).toBeLessThanOrEqual(24)
    })
  })

  describe('generateCaptainMorale', () => {
    it('returns 2-8 for a captain with little experience', () => {
      const actual = generateCaptainMorale('Low', false)
      expect(actual).toBeGreaterThanOrEqual(2)
      expect(actual).toBeLessThanOrEqual(8)
    })

    it('returns 6-9 for a captain with average experience', () => {
      const actual = generateCaptainMorale('Medium', false)
      expect(actual).toBeGreaterThanOrEqual(6)
      expect(actual).toBeLessThanOrEqual(9)
    })

    it('returns 7-10 for an experienced captain', () => {
      const actual = generateCaptainMorale('High', false)
      expect(actual).toBeGreaterThanOrEqual(8)
      expect(actual).toBeLessThanOrEqual(12)
    })

    it('returns 8-11 for a legendary captain', () => {
      const actual = generateCaptainMorale('High', true)
      expect(actual).toBeGreaterThanOrEqual(8)
      expect(actual).toBeLessThanOrEqual(11)
    })
  })

  describe('getWeapon', () => {
    it.each([
      ['an inexperienced captain', 'Low'],
      ['an average captain', 'Medium']
    ] as [string, string][])('gives %s a cutlass or rapier', (_desc, xp) => {
      const { description, formula } = getWeapon(xp)
      const expected = ['Cutlass', 'Rapier']
      expect(expected).toContain(description)
      expect(formula).toBe('d6')
    })

    it('gives an experienced captain an officer’s cutlass or a finely-crafted rapier', () => {
      const { description, formula } = getWeapon('High')
      const expected = ['Officer’s cutlass', 'Finely-crafted rapier']
      expect(expected).toContain(description)
      expect(formula).toBe('d8')
    })
  })
})
