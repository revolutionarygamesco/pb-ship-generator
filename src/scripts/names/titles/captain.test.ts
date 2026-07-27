import { describe, it, expect } from 'vitest'
import createCaptainTitles from './captain.ts'

describe('createCaptainTitles', () => {
  it('adds captain to the titles object', () => {
    const titles = createCaptainTitles('English')
    expect(titles.captain).toBe('Captain')
  })
})
