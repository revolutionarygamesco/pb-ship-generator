import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { createGenerateShipParams } from './params.ts'
import * as findCategoryFolder from '../../utilities/find-folder.ts'
import createFolder from './folder.ts'

describe('createFolder', () => {
  const params = createGenerateShipParams()
  const name = 'Hispaniola'

  let findCategoryFolderSpy: Mock
  let createSpy: Mock

  beforeEach(() => {
    createSpy = vi.fn()
    vi.stubGlobal('foundry', { ...foundry, documents: { Folder: { create: createSpy } } })
    findCategoryFolderSpy = vi.spyOn(findCategoryFolder, 'default')
  })

  it('returns undefined if no category folder is found', async () => {
    findCategoryFolderSpy.mockReturnValue(undefined)

    const result = await createFolder(params, name)
    expect(result).toBeUndefined()
    expect(createSpy).not.toHaveBeenCalled()
  })

  it('creates a folder inside the category', async () => {
    const category = { id: generateID() } as unknown as foundry.documents.Folder
    const created = { id: generateID() } as unknown as foundry.documents.Folder
    findCategoryFolderSpy.mockReturnValue(category)
    createSpy.mockResolvedValue(created)

    const result = await createFolder(params, name)

    expect(findCategoryFolderSpy).toHaveBeenCalledWith(params.colors, params.role, params.privateer)
    expect(createSpy).toHaveBeenCalledWith({ name, type: 'Actor', folder: category })
    expect(result).toBe(created)
  })
})
