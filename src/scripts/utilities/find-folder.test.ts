import { describe, expect, it } from 'vitest'
import { mockFolders } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import findCategoryFolder from './find-folder.ts'

const root = `${MODULE_ID}.folders.root`

describe('findCategoryFolder', () => {
  it('finds the pirate folder', () => {
    const path = `${root}/${MODULE_ID}.folders.pirate`
    const { folders } = mockFolders([path])
    expect(findCategoryFolder('Pirate', 'Merchantman')).toBe(folders.get(path))
  })

  it('finds the Dutch folder', () => {
    const path = `${root}/${MODULE_ID}.folders.dutch`
    const { folders } = mockFolders([path])
    expect(findCategoryFolder('Dutch', 'Merchantman')).toBe(folders.get(path))
  })

  it('finds a nation’s merchant folder', () => {
    const path = `${root}/${MODULE_ID}.folders.british.root/${MODULE_ID}.folders.british.merchant`
    const { folders } = mockFolders([path])
    expect(findCategoryFolder('British', 'Merchantman')).toBe(folders.get(path))
  })

  it('finds a nation’s privateer folder', () => {
    const path = `${root}/${MODULE_ID}.folders.british.root/${MODULE_ID}.folders.british.privateer`
    const { folders } = mockFolders([path])
    expect(findCategoryFolder('British', 'Man-of-War', true)).toBe(folders.get(path))
  })

  it('finds a nation’s navy folder', () => {
    const path = `${root}/${MODULE_ID}.folders.british.root/${MODULE_ID}.folders.british.navy`
    const { folders } = mockFolders([path])
    expect(findCategoryFolder('British', 'Man-of-War', false)).toBe(folders.get(path))
  })

  it('returns undefined if the folder does not exist', () => {
    mockFolders([])
    expect(findCategoryFolder('British', 'Merchantman')).toBeUndefined()
  })
})
